```markdown
# ThreatDetector Tool Usage Guide

Follow these steps to run the ThreatDetector tool:

---

## 1. Setup
- Extract the folder. Ensure the `ThreatDetector` directory and the `sample_files` folder (or any PHP project folder) are in the same parent directory.

---

## 2. Configuration
- Open the **config file** inside the `ThreatDetector` directory.
- Locate this line:
  ```javascript
  DEFAULT_PROJECT_PATH_TO_SCAN: "../sample_files/"
  ```
- Replace `sample_files` with the name of the PHP project folder you want to test.  
  **Note**: Folder names are case-sensitive.

> The tool will scan all PHP files located in the `sample_files` folder or any folder you provide.

---

## 3. Running the Tool
- Navigate to the `ThreatDetector` directory in your terminal.
- Run the following command:
  ```bash
  node main.js
  ```
- The terminal will display all detected vulnerabilities.

---

## 4. Viewing Detailed Reports
- Open the `index.html` file in the `ThreatDetector` directory for detailed information about the vulnerabilities.

---

## 5. Additional Information
- The HTML file provides an in-depth report of the vulnerabilities scanned.

---

Enjoy using the ThreatDetector tool! 🎉
```
