# PowerShell Script to Automate React Project Creation

# --- Configuration ---
# Set the base directory where your React projects will be created.
$baseDir = "D:\react_apps"

# --- Script Execution ---

# 1. Prompt the user for the application name.
$appName = Read-Host -Prompt "Enter the name for your new React app (e.g., my-awesome-react-app)"

# Validate that an app name was entered.
if ([string]::IsNullOrWhiteSpace($appName)) {
    Write-Host "Error: App name cannot be empty." -ForegroundColor Red
    # Pause to allow the user to read the error before the script exits.
    Start-Sleep -Seconds 5
    exit
}

# 2. Check if the base directory exists. If not, create it.
if (-not (Test-Path -Path $baseDir)) {
    Write-Host "Base directory not found. Creating it at: $baseDir" -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $baseDir
}

# 3. Navigate to the base directory.
try {
    Set-Location -Path $baseDir
    Write-Host "Changed directory to $baseDir" -ForegroundColor Green
}
catch {
    Write-Host "Error: Could not navigate to directory '$baseDir'. Please check the path and permissions." -ForegroundColor Red
    Start-Sleep -Seconds 5
    exit
}

# 4. Execute the 'npx create-react-app' command.
Write-Host "Creating React app '$appName'. This may take a moment..." -ForegroundColor Cyan
# Using npx to ensure create-react-app is used without global installation
# npx create-react-app $appName
#npx create-vite@latest $appName --template react-ts
npx --yes create-vite@latest $appName --template react-ts

# Add a delay to ensure all files are created before moving to the next step.
# You can increase this value if you have a slower machine.
Start-Sleep -Seconds 10 # React app creation can take a bit longer

$appPath = Join-Path -Path $baseDir -ChildPath $appName

# 5. Navigate into the new app directory.
if (Test-Path -Path $appPath) {
    Set-Location -Path $appPath
    Write-Host "Changed directory to $appPath" -ForegroundColor Green
}
else {
    Write-Host "Error: App directory '$appPath' was not created successfully." -ForegroundColor Red
    Start-Sleep -Seconds 5
    exit
}

# 6. Install dependencies (create-react-app does this by default, but this is a good placeholder if you need more later)
# Write-Host "Running 'npm install'..." -ForegroundColor Cyan
# npm install # create-react-app handles initial npm install

# Add a short delay.
Start-Sleep -Seconds 3

# 7. Open the project in Visual Studio Code.
Write-Host "Opening project in Visual Studio Code..." -ForegroundColor Green
code .

# 8. Open a new Command Prompt terminal in the project directory.
Write-Host "Opening new CMD terminal in the project folder..." -ForegroundColor Green
Start-Process cmd -WorkingDirectory $appPath
Start-Process cmd -WorkingDirectory $appPath

Write-Host "Script finished successfully! You can now run 'npm start' in your VS Code terminal to launch the app." -ForegroundColor Green
