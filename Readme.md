```markdown
# ThreatDetector Tool

ThreatDetector is a powerful tool for scanning vulnerabilities in PHP projects. Follow the instructions below to set it up and run effectively.

---

## Features
- Automatically scans all PHP files in the specified folder.
- Displays detected vulnerabilities in the terminal.
- Generates detailed HTML reports for better analysis.

---

## Prerequisites
- Ensure you have **Node.js** installed on your system.

---

## Setup Instructions

### Step 1: Extract the Files
- Extract the `ThreatDetector` folder to your desired location.
- Ensure that the `ThreatDetector` folder and your PHP project folder (e.g., `sample_files`) are in the same parent directory.

### Step 2: Configure the Tool
1. Open the `config.js` file located inside the `ThreatDetector` directory.
2. Look for the following line:
   ```javascript
   DEFAULT_PROJECT_PATH_TO_SCAN: "../sample_files/"
   ```
3. Replace `sample_files` with the name of the folder containing the PHP files you want to scan.  
   **Example**: If your folder name is `my_php_project`, update it as:
   ```javascript
   DEFAULT_PROJECT_PATH_TO_SCAN: "../my_php_project/"
   ```
4. **Note**: Folder names are case-sensitive.

---

## How to Run the Tool

1. Open your terminal and navigate to the `ThreatDetector` directory:
   ```bash
   cd path/to/ThreatDetector
   ```
2. Run the following command:
   ```bash
   node main.js
   ```
3. The terminal will display all detected vulnerabilities in your PHP files.

---

## Viewing Reports

1. After running the tool, open the `index.html` file located in the `ThreatDetector` directory.
2. This file provides a detailed report of all the vulnerabilities detected during the scan.

---

## Additional Information
- The tool scans all PHP files in the specified folder.
- Reports are designed to be developer-friendly for easy debugging.

---

## Example Usage

### Folder Structure
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

### Command to Run
```bash
node main.js
```

---

## License
This project is licensed under [MIT License](LICENSE).

---

Feel free to contribute and raise issues if you encounter any problems! 🚀
```
