```markdown
# **ThreatDetector**

## **Abstract**
**ThreatDetector** is a lightweight and efficient vulnerability scanning tool designed to analyze PHP projects. It scans for potential security vulnerabilities in PHP files and provides a detailed report for developers. This tool is ideal for securing your applications and ensuring robust code quality.

---

## **Features**
- Scans all PHP files in the specified directory.
- Detects potential vulnerabilities and displays them in the terminal.
- Generates an HTML report for detailed insights.
- Simple configuration for different project directories.

---

## **Prerequisites**
- **Node.js** must be installed on your system.

---

## **Setup Instructions**

### **Step 1: Extract the Files**
- Extract the `ThreatDetector` folder to your desired location.
- Ensure that the `ThreatDetector` folder and your PHP project folder (e.g., `sample_files`) are in the same parent directory.

### **Step 2: Configuration**
1. Open the `config.js` file located in the `ThreatDetector` directory.
2. Locate the following line:
   ```javascript
   DEFAULT_PROJECT_PATH_TO_SCAN: "../sample_files/"
   ```
3. Replace `sample_files` with the folder name of your PHP project.
   - **Example**: If your project folder is named `my_php_project`, update it to:
     ```javascript
     DEFAULT_PROJECT_PATH_TO_SCAN: "../my_php_project/"
     ```
4. **Note**: Folder names are case-sensitive.

---

## **How to Run**

1. Open a terminal and navigate to the `ThreatDetector` directory:
   ```bash
   cd path/to/ThreatDetector
   ```
2. Run the tool using the following command:
   ```bash
   node main.js
   ```
3. The terminal will display a list of detected vulnerabilities.

---

## **Viewing Reports**

- Open the `index.html` file located in the `ThreatDetector` directory.
- This file provides a detailed HTML report of all detected vulnerabilities for easier debugging.

---

## **Folder Structure Example**
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

## **Example Command**
```bash
node main.js
```

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---

## **Contributions**
Feel free to contribute to this project by submitting pull requests or reporting issues. Let's make ThreatDetector better together! 🚀
``` 
