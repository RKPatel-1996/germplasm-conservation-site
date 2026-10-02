Set-StrictMode -Version Latest

function Resolve-AIPath {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    if ([System.IO.Path]::IsPathRooted($Path)) {
        return [System.IO.Path]::GetFullPath($Path)
    }

    return [System.IO.Path]::GetFullPath(
        (Join-Path (Get-Location) $Path)
    )
}

function Get-AIText {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    $FullPath = Resolve-AIPath $Path

    if (-not [System.IO.File]::Exists($FullPath)) {
        throw "File not found: $FullPath"
    }

    return [System.IO.File]::ReadAllText($FullPath)
}

function Set-AIText {
    param(
        [Parameter(Mandatory)]
        [string]$Path,

        [Parameter(Mandatory)]
        [AllowEmptyString()]
        [string]$Text
    )

    $FullPath = Resolve-AIPath $Path
    $Directory = Split-Path $FullPath -Parent

    if (-not [System.IO.Directory]::Exists($Directory)) {
        [System.IO.Directory]::CreateDirectory($Directory) | Out-Null
    }

    # Stable UTF-8 without BOM and stable LF newlines.
    $Text = $Text -replace "`r`n", "`n"
    $Text = $Text -replace "`r", "`n"

    # Remove trailing horizontal whitespace before every line ending.
    $Text = [regex]::Replace($Text, '[ \t]+(?=\n|$)', '')

    $Utf8 = [System.Text.UTF8Encoding]::new($false)

    [System.IO.File]::WriteAllText(
        $FullPath,
        $Text,
        $Utf8
    )
}

function Assert-AIContains {
    param(
        [Parameter(Mandatory)]
        [string]$Text,

        [Parameter(Mandatory)]
        [string]$Value,

        [string]$Label = 'required text'
    )

    if (-not $Text.Contains($Value)) {
        throw "Missing $Label."
    }
}

function Assert-AIRegexCount {
    param(
        [Parameter(Mandatory)]
        [string]$Text,

        [Parameter(Mandatory)]
        [string]$Pattern,

        [Parameter(Mandatory)]
        [int]$Expected,

        [string]$Label = 'regex',

        [System.Text.RegularExpressions.RegexOptions]$Options =
            [System.Text.RegularExpressions.RegexOptions]::Multiline
    )

    $Regex = [regex]::new($Pattern, $Options)
    $Actual = $Regex.Matches($Text).Count

    if ($Actual -ne $Expected) {
        throw "$Label expected $Expected match(es), found $Actual."
    }

    return $Actual
}

function Replace-AIRegex {
    param(
        [Parameter(Mandatory)]
        [string]$Text,

        [Parameter(Mandatory)]
        [string]$Pattern,

        [Parameter(Mandatory)]
        [AllowEmptyString()]
        [string]$Replacement,

        [int]$Expected = 1,

        [string]$Label = 'replacement',

        [System.Text.RegularExpressions.RegexOptions]$Options =
            [System.Text.RegularExpressions.RegexOptions]::Multiline
    )

    $Regex = [regex]::new($Pattern, $Options)
    $Actual = $Regex.Matches($Text).Count

    if ($Actual -ne $Expected) {
        throw "$Label expected $Expected match(es), found $Actual."
    }

    return $Regex.Replace($Text, $Replacement)
}

function Insert-AIBeforeLastRegex {
    param(
        [Parameter(Mandatory)]
        [string]$Text,

        [Parameter(Mandatory)]
        [string]$Pattern,

        [Parameter(Mandatory)]
        [AllowEmptyString()]
        [string]$Insertion,

        [int]$ExpectedMatches = 1,

        [string]$Label = 'insertion target',

        [System.Text.RegularExpressions.RegexOptions]$Options =
            [System.Text.RegularExpressions.RegexOptions]::Multiline
    )

    $Regex = [regex]::new($Pattern, $Options)
    $Matches = $Regex.Matches($Text)

    if ($Matches.Count -ne $ExpectedMatches) {
        throw "$Label expected $ExpectedMatches match(es), found $($Matches.Count)."
    }

    if ($Matches.Count -eq 0) {
        throw "$Label was not found."
    }

    $Target = $Matches[$Matches.Count - 1]

    return $Text.Insert(
        $Target.Index,
        $Insertion
    )
}

function Assert-AIBranch {
    param(
        [Parameter(Mandatory)]
        [string]$Expected
    )

    $Branch = (git branch --show-current).Trim()

    if ($LASTEXITCODE -ne 0) {
        throw 'Unable to determine Git branch.'
    }

    if ($Branch -ne $Expected) {
        throw "Wrong branch. Expected '$Expected', found '$Branch'."
    }
}

function Assert-AIWorkingTreeClean {
    $Status = @(git status --porcelain)

    if ($LASTEXITCODE -ne 0) {
        throw 'Unable to read Git working tree.'
    }

    if ($Status.Count -gt 0) {
        throw 'Git working tree is not clean.'
    }
}

function Invoke-AINativeCheck {
    param(
        [Parameter(Mandatory)]
        [string]$Label,

        [Parameter(Mandatory)]
        [scriptblock]$Command
    )

    Write-Output "`n=== $Label ==="

    & $Command

    if ($LASTEXITCODE -ne 0) {
        throw "$Label failed with exit code $LASTEXITCODE."
    }
}

function Invoke-AIPatchTransaction {
    param(
        [Parameter(Mandatory)]
        [string[]]$Files,

        [Parameter(Mandatory)]
        [scriptblock]$Patch,

        [Parameter(Mandatory)]
        [scriptblock]$Verify
    )

    $Snapshots = @{}

    foreach ($Path in $Files) {
        $FullPath = Resolve-AIPath $Path
        $Exists = [System.IO.File]::Exists($FullPath)

        $Bytes = $null

        if ($Exists) {
            $Bytes = [System.IO.File]::ReadAllBytes($FullPath)
        }

        $Snapshots[$FullPath] = [pscustomobject]@{
            Exists = $Exists
            Bytes  = $Bytes
        }
    }

    try {
        Write-Output "`n=== PATCH ==="
        & $Patch

        Write-Output "`n=== VERIFY PATCH ==="
        & $Verify
    }
    catch {
        Write-Warning 'Patch failed. Restoring original files.'

        foreach ($Entry in $Snapshots.GetEnumerator()) {
            $FullPath = $Entry.Key
            $Snapshot = $Entry.Value

            if ($Snapshot.Exists) {
                [System.IO.File]::WriteAllBytes(
                    $FullPath,
                    $Snapshot.Bytes
                )
            }
            elseif ([System.IO.File]::Exists($FullPath)) {
                Remove-Item -Force $FullPath
            }
        }

        throw
    }
}

function Assert-AINoControlCharacters {
    param(
        [Parameter(Mandatory)]
        [string]$Path
    )

    $Text = Get-AIText $Path

    for ($Code = 0; $Code -lt 32; $Code++) {
        if ($Code -in @(9, 10)) {
            continue
        }

        if ($Text.Contains([string][char]$Code)) {
            throw "Control character 0x$('{0:X2}' -f $Code) found in $Path."
        }
    }
}

function Complete-AIPatch {
    param(
        [Parameter(Mandatory)]
        [string[]]$Files,

        [Parameter(Mandatory)]
        [string]$CommitMessage
    )

    Write-Output "`n=== STAGE ==="

    git add -- $Files

    if ($LASTEXITCODE -ne 0) {
        throw 'git add failed.'
    }

    git diff --cached --quiet

    if ($LASTEXITCODE -eq 0) {
        throw 'No staged changes to commit.'
    }

    if ($LASTEXITCODE -ne 1) {
        throw 'Unable to inspect staged changes.'
    }

    Write-Output "`n=== COMMIT ==="

    git commit -m $CommitMessage

    if ($LASTEXITCODE -ne 0) {
        throw 'git commit failed.'
    }

    Write-Output "`n=== FINAL GIT STATE ==="

    git status --short --branch

    if ($LASTEXITCODE -ne 0) {
        throw 'git status failed.'
    }
}