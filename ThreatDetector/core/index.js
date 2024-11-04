const fs = require('fs');
const path = require("path");
const colors = require('colors');
const execSync = require('child_process').execSync;

// Variables
const config = require("../config.js");

String.prototype.replaceAll = function(search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

module.exports = function() {
	this.config = config; // exporting config file to outside.May be config would be comming from somewhere else.
	
	this.replaceAll = function(text, search, replacement) {
		return text.replace(new RegExp(search, 'g'), replacement);
	};
	//1-
	this.createFile = function(content, filePath = null){
		if(!filePath)filePath = config.HTML_REPORT_FILE_NAME_AND_PATH;
		
		fs.writeFileSync(filePath, content, function (err) {
			if(config.IS_DEBUG_MODE_ENABLED){
				if (err) console.log(err);
				console.log(filePath + ' Saved!');
			}
		});
	}
	
	this.appendToFile = function(content, filePath = null){
		if(!filePath)filePath = config.HTML_REPORT_FILE_NAME_AND_PATH;
		
		fs.appendFileSync(filePath, content, function (err) {
			if(config.IS_DEBUG_MODE_ENABLED){
				if (err) console.log(err);
				console.log(filePath + ' Saved!');
			}
		});
	}
	
	this.initReport = function(){
		this.createFile("");

		var start_code='<!DOCTYPE html>\
		<html lang="en">\
		<head>\
		  <meta charset="utf-8">\
		  <meta content="width=device-width, initial-scale=1.0" name="viewport">\
		  <title>ThreatDetector-Report</title>\
		  <meta content="" name="description">\
		  <meta content="" name="keywords">\
		  <!-- Favicons -->\
		  <link href="assets/img/favicon.png" rel="icon">\
		  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">\
		  <!-- Google Fonts -->\
		  <link href="https://fonts.gstatic.com" rel="preconnect">\
		  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">\
		  <!-- Vendor CSS Files -->\
		  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">\
		  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">\
		  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">\
		  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet">\
		  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">\
		  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">\
		  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet">\
		  <!-- Template Main CSS File -->\
		  <link href="assets/css/style.css" rel="stylesheet">\
		</head>\
		<body>\
		  <!-- ======= Header ======= -->\
		  <header id="header" class="header fixed-top d-flex align-items-center">\
			<div class="d-flex align-items-center justify-content-between">\
			  <a href="index.html" class="logo d-flex align-items-center">\
				<img src="assets/img/logo.png" alt="">\
				<span class="d-none d-lg-block">ThreatDetector</span>\
			  </a>\
			  <i class="bi bi-list toggle-sidebar-btn"></i>\
			</div><!-- End Logo -->\
			  </ul>\
			</nav><!-- End Icons Navigation -->\
		  </header><!-- End Header -->\
		  <!-- ======= Sidebar ======= -->\
		  <aside id="sidebar" class="sidebar">\
			<ul class="sidebar-nav" id="sidebar-nav">\
			  <li class="nav-item">\
				<a class="nav-link " href="index.html">\
				  <i class="bi bi-grid"></i>\
				  <span>Dashboard</span>\
				</a>\
			  </li><!-- End Dashboard Nav -->\
			  <li class="nav-item">\
				<a class="nav-link " href="Report.html">\
				<i class="bi bi-exclamation-triangle"></i>\
				  <span>Security Vulnerabilities Found</span>\
				</a>\
			  </li><!-- End Components Nav -->\
			  <li class="nav-item">\
				<a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">\
				<i class="bx bx-shield-quarter"></i><span>Preventions</span><i class="bi bi-chevron-down ms-auto"></i>\
				</a>\
				<ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">\
				  <li>\
				  <a href="php_injection_prevention.pdf">\
				  <i class="bi bi-circle"></i><span>Injection</span>\
				</a>\
			  </li>\
			  <li>\
				<a href="php_broken_authentication_prevention.pdf">\
				  <i class="bi bi-circle"></i><span>Broken Authentication</span>\
				</a>\
			  </li>\
			  <li>\
				<a href="php_cross_site_request_forgery_prevention.pdf">\
				  <i class="bi bi-circle"></i><span>Cross-Site Request Forgery Vulnerabilities</span>\
				</a>\
			  </li>\
			  <li>\
				<a href="php_security_misconfiguration_prevention.pdf">\
				  <i class="bi bi-circle"></i><span>Security Misconfiguration Vulnerabilities</span>\
				</a>\
			  </li>\
			  <li>\
				<a href="php_cross_site_scripting_prevention.pdf">\
				  <i class="bi bi-circle"></i><span>Cross-Site Scripting</span>\
				</a>\
			  </li>\
			  <li>\
				<a href="php_other_web_security_suggestions.pdf">\
					  <i class="bi bi-circle"></i><span>Web Security Suggetions</span>\
					</a>\
				  </li>\
				</ul>\
			  </li><!-- End Icons Nav -->\
			</ul>\
		  </aside><!-- End Sidebar-->\
		  <main id="main" class="main">\
			<div class="pagetitle">\
			  <h1>Report</h1>\
			  <nav>\
				<ol class="breadcrumb">\
				  <li class="breadcrumb-item"><a href="index.html">Home</a></li>\
				  <li class="breadcrumb-item active">Report</li>\
				</ol>\
			  </nav>\
			</div><!-- End Page Title -->\
			<section class="section dashboard">\
			  <div class="row">\
				<!-- Left side columns -->\
				<div class="col-lg-8">\
				  <div class="row">\
				  </div>\
				</div><!-- End Left side columns -->\
				<!-- F.A.Q Group 1 -->\
				<div class="card">\
				  <div class="card-body">\
					<h8 class="card-title" <span style="font-size: 50px ;"></span>Detailed Report of Vulnerabilities</h8></br>\
					<div class="accordion accordion-flush" id="faq-group-1">\
					  <div class="accordion-item">\
';
		this.appendToFile(start_code);
	}
	//-1
	this.println = function(message, font1 = null, font2 = null, font3 = null){
		if(font1){
			message = message + "";
			if(font2){
				if(font3){
					console.log(message[font1][font2][font3]);
				}
				else {
					console.log(message[font1][font2]);
				}
			}
			else {
				console.log(message[font1]);
			}
		}
		else {
			console.log(message);
		}
	}
	
	this.getDateAndTime = function(){
		const DATE = new Date();  //creating DATE object.
		
		var month = DATE.getMonth()+1; if(month < 10)month = "0"+month;
		var day = DATE.getDate(); if(day < 10)day = "0"+day;
		var hours = DATE.getHours(); if(hours < 10)hours = "0"+hours;
		var minutes = DATE.getMinutes(); if(minutes < 10)minutes = "0"+minutes;
		var seconds = DATE.getSeconds(); if(seconds < 10)seconds = "0"+seconds;
		
		//return DATE.getFullYear() + "/" + month + "/" + day + " - " + hours + ":" + minutes + ":" + seconds;
		return hours  + ":"+ minutes+ ":" +seconds + " - " + day + "/" + month + "/" + DATE.getFullYear();
	}
	
	this.showSpace = function(){
		this.println("");
		this.println("-----------------------------------------------------------");
		this.println("");
		//1-
		this.appendToFile("<br/>");
		this.appendToFile("<hr/>");
		this.appendToFile("<br/>");
		//-1
	}
	
	this.getAllFilesPaths = (dirPath, arrayOfFiles, traverse = true, listOnlySpecificExtensions = false, extensions = [], ignoreFilesOrFolders = []) => {
	  try {
		  files = fs.readdirSync(dirPath);
		 
		  arrayOfFiles = arrayOfFiles || []
		 
		  files.forEach((file) => {
			if(file == config.THIS_PROJECT_FOLDER_NAME)return; // ignore this project's folder
			
			for(var i = 0; i < ignoreFilesOrFolders.length; i++){
				if(file == ignoreFilesOrFolders[i])return;
			}
			
			if (fs.statSync(dirPath + "/" + file).isDirectory()) {
				if(traverse){
					arrayOfFiles = this.getAllFilesPaths(dirPath + "/" + file, arrayOfFiles, traverse, listOnlySpecificExtensions, extensions, ignoreFilesOrFolders);
				}
				else {
					arrayOfFiles.push(path.join(__dirname, dirPath, "/", file + "/").replace("\\"+config.THIS_PROJECT_FOLDER_NAME, "").replace("/"+config.THIS_PROJECT_FOLDER_NAME, ""));
				}
			} 
			else {
				if(listOnlySpecificExtensions){
					var fileExtension = "nothing";
					try {
						fileExtension = file.split('.').pop().toLowerCase();
					}
					catch(e){
						return;
					}
					
					for(var i = 0; i < extensions.length; i++){
						if(fileExtension == extensions[i].toLowerCase()){
							arrayOfFiles.push(path.join(__dirname, dirPath, "/", file).replace("\\"+config.THIS_PROJECT_FOLDER_NAME, "").replace("/"+config.THIS_PROJECT_FOLDER_NAME, ""));
						}
					}
				}
				else {
					arrayOfFiles.push(path.join(__dirname, dirPath, "/", file).replace("\\"+config.THIS_PROJECT_FOLDER_NAME, "").replace("/"+config.THIS_PROJECT_FOLDER_NAME, ""));
				}
			}
		  })
	  }
	  catch(e){
		console.log(e);
	  }
	  //1-
	  if(config.IS_DEBUG_MODE_ENABLED){
		console.dir(arrayOfFiles, {'maxArrayLength': null});
	  }
	  //-1
	  return arrayOfFiles;
	}
	
	this.findLineInFile = function(lineToFind, inFile, returnLinesNumberArray = false, isCaseSensitive = false, isSpaceSensitive = false, verbose = false, message = "", message2 = "", writeToFile = false, filePath = null, checkIfIncompleteCodeLine = false, ignoreLineIfIncompleteCodeLineDetected = false, notifyOnlyIfIncompleteCodeLineDetected = false, checkIfMultipleCodeLinesInOneLine = false, notifyOnlyIfMultipleCodeLinesInOneLineDetected = false){
		var wordsFoundInLineNumber = [];
		
		try {
			var lines = fs.readFileSync(inFile, 'utf-8').split('\n').filter(Boolean);
			
			var wordsToFindInLine = lineToFind.split(" ");
			var wordsFoundInLine = [];

			for(var i = 0; i < lines.length; i++){
				for(var j = 0; j < wordsToFindInLine.length; j++){
					wordsFoundInLine[j] = false;
				
					if(isCaseSensitive){
						if(isSpaceSensitive){
							if(lines[i].includes(wordsToFindInLine[j])){
								lines[i] = lines[i].replace(wordsToFindInLine[j], ""); // to make sure it doesn't find duplicate result
								wordsFoundInLine[j] = true;
							}
						}
						else {
							if(lines[i].replaceAll(" ", "").includes(wordsToFindInLine[j].replaceAll(" ", ""))){
								lines[i] = lines[i].replaceAll(" ", "").replace(wordsToFindInLine[j].replaceAll(" ", ""), ""); // to make sure it doesn't find duplicate result
								wordsFoundInLine[j] = true;
							}
						}
					}
					else {
						if(isSpaceSensitive){
							if(lines[i].toLowerCase().includes(wordsToFindInLine[j].toLowerCase())){
								lines[i] = lines[i].toLowerCase().replace(wordsToFindInLine[j].toLowerCase(), ""); // to make sure it doesn't find duplicate result
								wordsFoundInLine[j] = true;
							}
						}
						else {
							if(lines[i].toLowerCase().replaceAll(" ", "").includes(wordsToFindInLine[j].toLowerCase().replaceAll(" ", ""))){
								lines[i] = lines[i].toLowerCase().replaceAll(" ", "").replace(wordsToFindInLine[j].toLowerCase().replaceAll(" ", ""), ""); // to make sure it doesn't find duplicate result
								wordsFoundInLine[j] = true;
							}
						}
					}
				}
				
				var allWordsFoundInLine = true;
				for(var j = 0; j < wordsFoundInLine.length; j++){
					if(wordsFoundInLine[j] == false){
						allWordsFoundInLine = false;
						break;
					}
				}
				
				if(allWordsFoundInLine){
					//1-
					if(config.IS_DEBUG_MODE_ENABLED || verbose){
						if(verbose){
							this.println(inFile + " " + message + " (Found in line number: " + (i+1) + ")" + " " + message2, "violet", "bold");
						}
						else {
							console.log(inFile + " " + lineToFind + " (Found in line number: " + (i+1) + ")", "violet", "bold");
						
					}
					}
					//-1
					var extraNotifications = "";
					if(checkIfIncompleteCodeLine && !lines[i].includes(";")){
						if(ignoreLineIfIncompleteCodeLineDetected){
							continue;
						}
						
						extraNotifications = ", Note: Unfinished command detected in this line.";
					}
					if(checkIfIncompleteCodeLine && notifyOnlyIfIncompleteCodeLineDetected && lines[i].includes(";")){
						continue;
					}
					
					if(checkIfMultipleCodeLinesInOneLine && lines[i].includes(";") && (lines[i].split(";").length - 1) > 1){
						extraNotifications = ", Note: Multiple commands detected in this line.";
					}
					if(checkIfMultipleCodeLinesInOneLine && notifyOnlyIfMultipleCodeLinesInOneLineDetected && lines[i].includes(";") && (lines[i].split(";").length - 1) <= 1){
						continue;
					}
					//1-
					if(writeToFile){
						this.appendToFile("<span style='color:orange; '>" + inFile + " " + message + "</span><br/>"+ 
						"<span style='color:indigo;'>" + " (Found in line number: " + (i+1) + ")" + " " + message2 + extraNotifications + "</span><br/><br/>", filePath);
					}
					//-1	
					wordsFoundInLineNumber.push(i+1);
				}
			}
		} 
		catch(e){
			//1-
			if(config.IS_DEBUG_MODE_ENABLED){
				console.log(inFile + " File not found, or something else happened!");
				console.log(e);
			}
			//-1
		}
		//1-
		if(wordsFoundInLineNumber.length == 0){
			if(config.IS_DEBUG_MODE_ENABLED){
				console.log(lineToFind + " (Line not found in file " + inFile + ")");
			}
		}
		//-1
		if(returnLinesNumberArray){
			return wordsFoundInLineNumber;
		}
		else {
			return wordsFoundInLineNumber.length;
		}
	}
	
	this.findLinesInFile = function(linesToFind = [], inFile, returnLinesNumberArray = false, isCaseSensitive = false, isSpaceSensitive = false, verbose = false, message = "", message2 = "", writeToFile = false, filePath = null, checkIfIncompleteCodeLine = false, ignoreLineIfIncompleteCodeLineDetected = false, notifyOnlyIfIncompleteCodeLineDetected = false, checkIfMultipleCodeLinesInOneLine = false, notifyOnlyIfMultipleCodeLinesInOneLineDetected = false){
		var numberOfLinesFound = 0; 
		var linesNumberArray = [];
		
		for(var i = 0; i < linesToFind.length; i++){
			var result = this.findLineInFile(linesToFind[i], inFile, returnLinesNumberArray, isCaseSensitive, isSpaceSensitive, verbose, message, message2, writeToFile, filePath, checkIfIncompleteCodeLine, ignoreLineIfIncompleteCodeLineDetected, notifyOnlyIfIncompleteCodeLineDetected, checkIfMultipleCodeLinesInOneLine, notifyOnlyIfMultipleCodeLinesInOneLineDetected);
			if(returnLinesNumberArray){
				linesNumberArray.concat(result);
			}
			else {
				numberOfLinesFound = numberOfLinesFound + result;
			}
		}
		
		if(returnLinesNumberArray){
			return linesNumberArray;
		}
		else {
			return numberOfLinesFound;
		}
	}
	
	this.showResults = function(num_vulnerabilities_found, securitCheckName, pdfName, however = false){
		if(num_vulnerabilities_found == -1){
			this.println("Number of " + securitCheckName + "s Found in the project is: All Project", "pink", "bold");
			//1-
			this.appendToFile("Number of " + securitCheckName + "s Found in the project is: <span style='color:blue'>All Project Vulnerable");
			var code_append='</div>\
                  </div>';
				  this.appendToFile(code_append);
			//-1
		}
		else {
			this.println("Number of " + securitCheckName + "s Found in the project is: " + num_vulnerabilities_found, "cyan", "bold");
			//1-
						this.appendToFile("<span style='color:black; font-weight:bold'>Number of " + securitCheckName + "s Found in the project is: <span style='color:blue'>" + num_vulnerabilities_found + "</span></span><br/>");

						var code_append='</div>\
                  </div>';
				  this.appendToFile(code_append);

			//-1
		}
		
		if(num_vulnerabilities_found > 0 || num_vulnerabilities_found == -1)
		{
			this.appendToFile("<span style='color:blue; font-weight:bold'><a href='"+__dirname+"\\"+pdfName+"' target='_blank'>To learn about how to fix your code and secure it against " + securitCheckName + "s, Click here</a></span><br/>");
		}
		else {
			if(however){
				//1-
					this.appendToFile("<span style='color:blue; font-weight:bold'><a href='"+__dirname+"\\"+pdfName+"' target='_blank'>Well done!, No vulnerability found about " + securitCheckName + " in your code. However, there are some other " + securitCheckName + " Vulnerabilities and Notifications which cannot be detected programmatically by this toolkit and needs to get your attention about it verbosly, Click Here to read more</a></span><br/>");

				//-1
				this.println("Well done!, No vulnerabilities found about " + securitCheckName + " in your code.", "cyan", "bold");
			}
			else {
				//1-
					this.appendToFile("<span style='color:blue; font-weight:bold'>Well done!, No vulnerabilities found about " + securitCheckName + " in your code.</span><br/>");

				//-1
				this.println("Well done!, No vulnerabilities found about " + securitCheckName + " in your code.", "cyan", "bold");
			}
		}
	}
	
	this.isValid = function(str){
		if(str != "" && str != null && str != undefined){
			return true;
		}
		
		return false;
	}
	
	this.isFileExists = function(filePath){
		try { 
			if (fs.existsSync(filePath)) {
				//1-
				if(config.IS_DEBUG_MODE_ENABLED){
					console.log(filePath + " file exists!");
				}
				//-1
				return true;
			}
			else {
				//1-
				if(config.IS_DEBUG_MODE_ENABLED){
					console.log(filePath + " file does not exist!");
				}
				//-1
				return false;
			}
		}
		catch(e){
			//1-
			if(config.IS_DEBUG_MODE_ENABLED){
				console.log(filePath + " file does not exist!");
				console.log(e);
			}
			//-1
			return false;
		}
	}
	
	this.isUpperCaseCharExists = function(str){
		for(var i = 0; i < str.length; i++){
			var character = str.charAt(i);
			if(isNaN(character)){ // if number ignore
				var upCharacter = character.toUpperCase();
				var lowCharacter = character.toLowerCase();
				
				if(upCharacter != lowCharacter){ // if special char ignore
					if(character == upCharacter){
						return true;
					}
				}
			}
		}
		
		return false;
	}
	
	this.runShellCmd = function(cmd){
		var output = execSync(cmd).toString().trim();
		//1-
		if(config.IS_DEBUG_MODE_ENABLED){
			console.log(output); 
		}
		//-1
		return output;
	}
}