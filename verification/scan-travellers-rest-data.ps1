param(
  [Parameter(Mandatory = $true)]
  [string]$GamePath,

  [string]$OutputCsv = ""
)

$ErrorActionPreference = "Stop"

$allowedExtensions = @(
  ".json",
  ".csv",
  ".tsv",
  ".xml",
  ".txt",
  ".yaml",
  ".yml",
  ".bytes"
)

$reportColumns = @(
  "File Path",
  "Relative Path",
  "File Type",
  "Plain Text",
  "Matched Keywords",
  "Possible Data",
  "Suitable For Verification CSV",
  "Size KB"
)

$keywords = @(
  "recipe",
  "recipes",
  "ingredient",
  "ingredients",
  "drink",
  "drinks",
  "crop",
  "crops",
  "fish",
  "station",
  "stations",
  "item",
  "items",
  "localization",
  "lang",
  "en"
)

function Read-FilePrefixBytes {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [int]$MaxBytes = 65536
  )

  $stream = [System.IO.File]::Open($Path, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
  try {
    $length = [Math]::Min($MaxBytes, [int]$stream.Length)
    $buffer = New-Object byte[] $length
    [void]$stream.Read($buffer, 0, $length)
    return $buffer
  }
  finally {
    $stream.Dispose()
  }
}

function Test-PlainTextBytes {
  param(
    [byte[]]$Bytes
  )

  if ($Bytes.Length -eq 0) {
    return $true
  }

  $nullCount = 0
  $controlCount = 0

  foreach ($byte in $Bytes) {
    if ($byte -eq 0) {
      $nullCount += 1
      continue
    }

    $isWhitespace = $byte -eq 9 -or $byte -eq 10 -or $byte -eq 13
    $isControl = $byte -lt 32 -and -not $isWhitespace

    if ($isControl) {
      $controlCount += 1
    }
  }

  $nullRatio = $nullCount / [double]$Bytes.Length
  $controlRatio = $controlCount / [double]$Bytes.Length

  return ($nullRatio -lt 0.05 -and $controlRatio -lt 0.02)
}

function Convert-BytesToText {
  param(
    [byte[]]$Bytes
  )

  if ($Bytes.Length -ge 3 -and $Bytes[0] -eq 0xEF -and $Bytes[1] -eq 0xBB -and $Bytes[2] -eq 0xBF) {
    return [System.Text.Encoding]::UTF8.GetString($Bytes)
  }

  if ($Bytes.Length -ge 2 -and $Bytes[0] -eq 0xFF -and $Bytes[1] -eq 0xFE) {
    return [System.Text.Encoding]::Unicode.GetString($Bytes)
  }

  if ($Bytes.Length -ge 2 -and $Bytes[0] -eq 0xFE -and $Bytes[1] -eq 0xFF) {
    return [System.Text.Encoding]::BigEndianUnicode.GetString($Bytes)
  }

  return [System.Text.Encoding]::UTF8.GetString($Bytes)
}

function Get-PossibleDataTypes {
  param(
    [string[]]$MatchedKeywords
  )

  $types = New-Object System.Collections.Generic.List[string]

  if ($MatchedKeywords -contains "recipe" -or $MatchedKeywords -contains "recipes") { $types.Add("Recipes") }
  if ($MatchedKeywords -contains "ingredient" -or $MatchedKeywords -contains "ingredients") { $types.Add("Ingredients") }
  if ($MatchedKeywords -contains "drink" -or $MatchedKeywords -contains "drinks") { $types.Add("Drinks") }
  if ($MatchedKeywords -contains "crop" -or $MatchedKeywords -contains "crops") { $types.Add("Crops") }
  if ($MatchedKeywords -contains "fish") { $types.Add("Fish") }
  if ($MatchedKeywords -contains "station" -or $MatchedKeywords -contains "stations") { $types.Add("Stations") }
  if ($MatchedKeywords -contains "item" -or $MatchedKeywords -contains "items") { $types.Add("Items") }
  if ($MatchedKeywords -contains "localization" -or $MatchedKeywords -contains "lang" -or $MatchedKeywords -contains "en") { $types.Add("Localization") }

  if ($types.Count -eq 0) {
    return "Unknown"
  }

  return ($types | Select-Object -Unique) -join "; "
}

function Test-KeywordMatch {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Text,

    [Parameter(Mandatory = $true)]
    [string]$Keyword
  )

  $escapedKeyword = [System.Text.RegularExpressions.Regex]::Escape($Keyword.ToLowerInvariant())
  $pattern = "(^|[^a-z0-9_])$escapedKeyword([^a-z0-9_]|$)"

  return [System.Text.RegularExpressions.Regex]::IsMatch($Text, $pattern)
}

if (-not (Test-Path -LiteralPath $GamePath -PathType Container)) {
  throw "GamePath does not exist or is not a directory: $GamePath"
}

$resolvedGamePath = (Resolve-Path -LiteralPath $GamePath).Path

Write-Host "Scanning read-only data candidates under: $resolvedGamePath"
Write-Host "Allowed extensions: $($allowedExtensions -join ', ')"
Write-Host "No files will be modified."
Write-Host ""

$results = New-Object System.Collections.Generic.List[object]

$files = Get-ChildItem -LiteralPath $resolvedGamePath -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $allowedExtensions -contains $_.Extension.ToLowerInvariant() }

foreach ($file in $files) {
  try {
    $prefixBytes = Read-FilePrefixBytes -Path $file.FullName
    $isPlainText = Test-PlainTextBytes -Bytes $prefixBytes
    $contentText = ""

    if ($isPlainText) {
      $contentText = Convert-BytesToText -Bytes $prefixBytes
    }

    $relativePath = $file.FullName.Substring($resolvedGamePath.Length).TrimStart("\", "/")
    $haystack = ($relativePath + "`n" + $contentText).ToLowerInvariant()
    $matched = @()

    foreach ($keyword in $keywords) {
      if (Test-KeywordMatch -Text $haystack -Keyword $keyword) {
        $matched += $keyword
      }
    }

    if ($matched.Count -eq 0) {
      continue
    }

    $possibleData = Get-PossibleDataTypes -MatchedKeywords $matched
    $plainTextLabel = "No"

    if ($isPlainText) {
      $plainTextLabel = "Yes"
    }

    $csvSuitability = "No"

    if ($isPlainText -and $possibleData -ne "Unknown") {
      $csvSuitability = "Yes - review manually for verification fields"
    }
    elseif ($isPlainText) {
      $csvSuitability = "Maybe - readable, but data type is unclear"
    }

    $results.Add([PSCustomObject]@{
      "File Path" = $file.FullName
      "Relative Path" = $relativePath
      "File Type" = $file.Extension.ToLowerInvariant()
      "Plain Text" = $plainTextLabel
      "Matched Keywords" = (($matched | Select-Object -Unique) -join "; ")
      "Possible Data" = $possibleData
      "Suitable For Verification CSV" = $csvSuitability
      "Size KB" = [Math]::Round($file.Length / 1KB, 2)
    })
  }
  catch {
    $results.Add([PSCustomObject]@{
      "File Path" = $file.FullName
      "Relative Path" = $file.FullName
      "File Type" = $file.Extension.ToLowerInvariant()
      "Plain Text" = "Unreadable"
      "Matched Keywords" = ""
      "Possible Data" = "Unreadable"
      "Suitable For Verification CSV" = "No"
      "Size KB" = [Math]::Round($file.Length / 1KB, 2)
    })
  }
}

$orderedResults = @(
  $results |
    Sort-Object "Suitable For Verification CSV", "Possible Data", "Relative Path" -Descending
)

if ($orderedResults.Count -eq 0) {
  Write-Host "No matching readable candidate files were found."
}
else {
  $orderedResults | Format-Table -AutoSize
}

Write-Host ""
Write-Host "Total matching candidate files: $($orderedResults.Count)"

if ($OutputCsv -ne "") {
  $outputDirectory = Split-Path -Parent $OutputCsv

  if ($outputDirectory -ne "" -and -not (Test-Path -LiteralPath $outputDirectory -PathType Container)) {
    New-Item -ItemType Directory -Path $outputDirectory | Out-Null
  }

  if ($orderedResults.Count -eq 0) {
    ($reportColumns -join ",") | Set-Content -LiteralPath $OutputCsv -Encoding UTF8
  }
  else {
    $orderedResults | Export-Csv -LiteralPath $OutputCsv -NoTypeInformation -Encoding UTF8
  }

  Write-Host "Report written to: $OutputCsv"
}
