# FahrPro  FahrGewerbe Replace Script
$files = Get-ChildItem -Path . -Recurse -Include *.tsx,*.ts,*.json,*.md,*.txt -Exclude node_modules,*.lock | Where-Object { !$_.PSIsContainer }
$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -match "FahrPro|fahrpro") {
        $newContent = $content -replace "FahrPro", "FahrGewerbe" -replace "fahrpro", "fahrgewerbe"
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        $count++
        Write-Host " $($file.Name)" -ForegroundColor Green
    }
}
Write-Host "`n $count Dateien aktualisiert!" -ForegroundColor Green
