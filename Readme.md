# ThreatDetector

## Abstract
ThreatDetector is a lightweight and efficient vulnerability scanning tool designed to analyze PHP projects. It scans for potential security issues and provides detailed reports to developers. This tool ensures that your PHP applications are secure and maintain high-quality standards.

---

## Features
- Scans all PHP files in the specified directory.
- Detects vulnerabilities and displays them in the terminal.
- Generates an HTML report for detailed insights.
- Easy to configure for different project directories.

---

## Prerequisites
- Node.js must be installed on your system.

---

## Setup Instructions

### Step 1: Extract the Files
1. Extract the `ThreatDetector` folder to your desired location.
2. Make sure the `ThreatDetector` folder and your PHP project folder (e.g., `sample_files`) are in the same parent directory.

### Step 2: Configuration
1. Open the `config.js` file inside the `ThreatDetector` directory.
2. Find this line:
   ```javascript
   DEFAULT_PROJECT_PATH_TO_SCAN: "../sample_files/"
