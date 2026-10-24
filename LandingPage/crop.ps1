Add-Type -AssemblyName System.Drawing
$filePath = "d:\Projects\Mitti_LandingPage\Mitti Desktop Landing Page.png"
$src = [System.Drawing.Image]::FromFile($filePath)
Write-Host "Image size: $($src.Width) x $($src.Height)"

$cropX = [int]($src.Width * 0.42)
$cropY = [int]($src.Height * 0.02)
$cropW = [int]($src.Width * 0.58)
$cropH = [int]($src.Height * 0.17)

$bmp = New-Object System.Drawing.Bitmap($cropW, $cropH)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$destRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$outPath = "d:\Projects\Mitti_LandingPage\LandingPage\hero_crop.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$src.Dispose()
$bmp.Dispose()
$g.Dispose()
Write-Host "Saved crop to $outPath"
