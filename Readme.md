It seems you're seeing a Markdown file rendered in a way you don't want. Here's the updated content in a **plain Markdown style**, without unnecessary bold formatting, to make it look simpler and professional for your README file:

```markdown
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
   ```
3. Replace `sample_files` with the folder name of your PHP project.
   - Example: If your folder is named `my_php_project`, update it as:
     ```javascript
     DEFAULT_PROJECT_PATH_TO_SCAN: "../my_php_project/"
     ```
4. Folder names are case-sensitive.

---

## How to Run
1. Open your terminal and navigate to the `ThreatDetector` directory:
   ```bash
   cd path/to/ThreatDetector
   ```
2. Run the tool:
   ```bash
   node main.js
   ```
3. The terminal will display all vulnerabilities detected in your PHP files.

---

## Viewing Reports
- Open the `index.html` file in the `ThreatDetector` directory to view a detailed HTML report of the vulnerabilities.

---

## Example Folder Structure
```
parent_directory/
├── ThreatDetector/
│   ├── config.js
│   ├── main.js
│   ├── index.html
│   └── ...
├── sample_files/
│   ├── file1.php
│   ├── file2.php
│   └── ...
```

---

## Example Command
```bash
node main.js
```

---

## License
This project is licensed under the MIT License.

---

## Contributions
Feel free to contribute by submitting pull requests or reporting issues. Your feedback is valuable! 🚀
```
