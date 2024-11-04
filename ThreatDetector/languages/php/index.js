const Math = require("mathjs");
const coreLib = require("../../core");


const core = new coreLib();

module.exports = function() {
	// Methods
	var a
	var b
	var c
	var d
	var e
	function checkForInjections(){
		core.println("<-- Checking for Injection Vulnerabilities -->", "green", "bold");
		//1-
		//core.appendToFile("<span style='color:green; font-weight:bold';'font-size: 30px'><-- Checking for Injection Vulnerabilities --></span><br/>");
		var ab='<div class="accordion-item">\
		  <h2 class="accordion-header">\
			<button class="accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">';
		core.appendToFile(ab);	
		core.appendToFile("<span style='font-size: 30px; color:green ; font-weight:bold'>Checking for Injection Vulnerabilities</span><br/>")
		var a1='</button>\
		</h2>\
		<div id="faqsOne-1" class="accordion-collapse collapse" data-bs-parent="#faq-group-1">\
		  <div class="accordion-body">';
		core.appendToFile(a1);  
		//-1
		var num_vulnerabilities_found = 0;
		
		var files = core.getAllFilesPaths(core.config.DEFAULT_PROJECT_PATH_TO_SCAN, [], true, true, ["php"]);
		
		// Prepare OS Commands Array to Check
		var cmds = [];
		cmds.push("system(");
		cmds.push("exec(");
		cmds.push("shell_exec(");
		cmds.push("passthru(");
		cmds.push("popen(");
		cmds.push("proc_open(");
		cmds.push("proc_close(");
		cmds.push("proc_get_status(");
		cmds.push("proc_nice(");
		cmds.push("proc_terminate(");
		
		// LDAP & OS Commands Injection Check
		for(var i = 0; i < files.length; i++){
			//LDAP
			var ldap_search_array = core.findLineInFile("ldap_search(", files[i], true);
			if(ldap_search_array.length > 0){
				if(core.findLineInFile("ldap_escape(", files[i]) == 0){
					num_vulnerabilities_found++; //1-//This can be added further = num_vulnerabilities_found++; + ldap_search_array.length;
					
					core.println(num_vulnerabilities_found+") Path of LDAP injection vulnerability is " + files[i]+ " for the vulnerability \n");
					//1-
					core.appendToFile("<span style='color:orange;'>" + files[i] + " File has an LDAP Injection Vulnerability, 'ldap_search()' function can be injected without ldap_escape() function and its flag LDAP_ESCAPE_FILTER!</span><br/>" + 
					"<span style='color:indigo;'>" + "check the following line(s) for the vulnerability:" + ldap_search_array.toString() + "</span><br/><br/>");
					

					//-1
				}
				else if(core.findLineInFile("LDAP_ESCAPE_FILTER", files[i]) == 0){
					num_vulnerabilities_found = num_vulnerabilities_found + ldap_search_array.length;
					core.println(num_vulnerabilities_found+") Path of LDAP injection vulnerability is " + files[i]+"\n");
					//1-
					core.appendToFile("<span style='color:orange;'>" + files[i] + " File has an LDAP Injection Vulnerability, 'ldap_escape()' function can be injected without its flag LDAP_ESCAPE_FILTER! for the vulnerability.</span><br/>" +
					"<span style='color:indigo;'>" + "check the following line(s) for the vulnerability: </span><br/><br/>");

					//-1
				}
			}
			
			//OS Commands
			for(var j = 0; j < cmds.length; j++){
				var cmd_array = core.findLineInFile(cmds[j], files[i], true);
				if(cmd_array.length > 0){
					if(core.findLineInFile("escapeshellcmd(", files[i]) == 0 || core.findLineInFile("escapeshellarg(", files[i]) == 0){
						num_vulnerabilities_found = num_vulnerabilities_found + cmd_array.length;
						core.println(num_vulnerabilities_found+") Path of Command injection vulnerability is " + files[i] + "\n");
						//1-
						core.appendToFile("<span style='color:orange;'>" + files[i] + " File has an OS Command Injection Vulnerability, '" + cmds[j] + ")' function can be injected without escapeshellcmd() and escapeshellarg() functions </span><br/>" +
						"<span style='color:indigo;'>" + "check the following line(s) for the vulnerability:" + cmd_array.toString() + "</span><br/><br/>");

						//-1
					}
				}
			}
		}
		
		// Results
		var injection = num_vulnerabilities_found;
		a=num_vulnerabilities_found;
		core.showResults(num_vulnerabilities_found, "Injection", "../languages/php/docs/php_injection_prevention.pdf", true);
		return num_vulnerabilities_found;
	}
	
	function checkForBrokenAuth(){
		core.println("<-- Checking for Broken Authentication Vulnerabilities -->", "green", "bold");
		//-
		var a2='<div class="accordion-item">\
		  <h2 class="accordion-header">\
			<button class="accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">'
		core.appendToFile(a2);
		core.appendToFile("<span style='font-size: 30px; color:green ; font-weight:bold'>Checking for Broken Authentication Vulnerabilities</span><br/>");
        var a1='</button>\
		</h2>\
		<div id="faqsOne-1" class="accordion-collapse collapse" data-bs-parent="#faq-group-1">\
		  <div class="accordion-body">';
		core.appendToFile(a1);  
		//-1
		var files = core.getAllFilesPaths(core.config.DEFAULT_PROJECT_PATH_TO_SCAN, [], true, true, ["php"]);
		
		var num_vulnerabilities_found = 0;
		for (var i = 0; i < files.length; i++) {
			if (core.findLineInFile("<form", files[i]) > 0 && core.findLineInFile("</form>", files[i]) > 0) {
				
			  if ((core.findLineInFile("g-recaptcha", files[i]) == 0 || core.findLineInFile("data-sitekey", files[i]) == 0) && (core.findLineInFile("grecaptcha", files[i]) == 0)) {
				
				num_vulnerabilities_found++;
				core.println(num_vulnerabilities_found + ") Path of broken authentication vulnerability is " + files[i] + "\n"+"\n");
		  
				// Get the line number for the <form tag
				var formLine = core.findLineInFile("</form", files[i]);
	
				// Add the vulnerability information to the file
				core.appendToFile("<span style='color:orange;'>" + files[i] + "</span><br/>" +
				"<span style='color:indigo;'>" + " File has a Broken Authentication Vulnerability nearly in the line between " +core.findLineInFile("<form", files[i], formLine)+ " and "+core.findLineInFile("</form", files[i], formLine) +" may be because of absence of google recaptcha! </span><br/><br/>");

			}
			}
		  }
		  
		  
		var broken = num_vulnerabilities_found;
		b = num_vulnerabilities_found;
		// Results
		core.showResults(num_vulnerabilities_found, "Broken Authentication","../languages/php/docs/php_broken_authentication_prevention.pdf", true);
		return num_vulnerabilities_found;
	}
	
	function checkForCrossSiteRequestForgery(){
		core.println("<-- Checking for Cross-Site Request Forgery Vulnerabilities -->", "green", "bold");
		//1-
		var a2='<div class="accordion-item">\
		  <h2 class="accordion-header">\
			<button class="accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">'
		core.appendToFile(a2);
		core.appendToFile("<span style='font-size: 30px; color:green ; font-weight:bold'>Checking for Cross-Site Request Forgery Vulnerabilities</span><br/>");
		//-1
		var a1='</button>\
		</h2>\
		<div id="faqsOne-1" class="accordion-collapse collapse" data-bs-parent="#faq-group-1">\
		  <div class="accordion-body">';
		core.appendToFile(a1);  
		var files = core.getAllFilesPaths(core.config.DEFAULT_PROJECT_PATH_TO_SCAN, [], true, true, ["php"]);
		
		var num_vulnerabilities_found = 0;
		for(var i = 0; i < files.length; i++){
			if(core.findLineInFile("<form", files[i]) > 0 && core.findLineInFile("</form>", files[i]) > 0){
				if(core.findLineInFile("token", files[i]) == 0 && core.findLineInFile("csrf", files[i]) == 0){
					num_vulnerabilities_found++;
					core.println(num_vulnerabilities_found+") Path of CrossSiteRequestForgery vulnarability is " + files[i]+"\n");
					
					var formLine = core.findLineInFile("<form", files[i]);
				
					//1-
					core.appendToFile("<span style='color:orange;'>" + files[i] + "</span><br/>" +
					"<span style='color:indigo;'>" + " File has Vulnerability nearly in the line between " +core.findLineInFile("<form", files[i], formLine)+ " and "+core.findLineInFile("</form", files[i], formLine) +" Check CSRF token implemented properly or not  </span><br/><br/>");						
					//-1
				}
			}
		}
		var crosssite = num_vulnerabilities_found;
		c = num_vulnerabilities_found;
		core.showResults(num_vulnerabilities_found, "Cross SiteRequestForgery ", "../languages/php/docs/php_cross_site_request_forgery_prevention.pdf", true);
		return num_vulnerabilities_found;
	}	

	function checkForSecurityMisconfiguration(){
		core.println("<-- Checking for Security Misconfiguration Vulnerabilities -->", "green", "bold");
		//1-
		var a2='<div class="accordion-item">\
		  <h2 class="accordion-header">\
			<button class="accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">'
		core.appendToFile(a2);
		core.appendToFile("<span style='font-size: 30px; color:green ; font-weight:bold'>Checking for Security Misconfiguration Vulnerabilities</span><br/>");
		//-1
		var a1='</button>\
		</h2>\
		<div id="faqsOne-1" class="accordion-collapse collapse" data-bs-parent="#faq-group-1">\
		  <div class="accordion-body">';
		core.appendToFile(a1);  
		var num_vulnerabilities_found = 0;
		
		// Checking for Listing Directories
		var htaccessPath = core.config.DEFAULT_PROJECT_PATH_TO_SCAN + ".htaccess";
		
		if(!core.isFileExists(htaccessPath)){
			var folders = core.getAllFilesPaths(core.config.DEFAULT_PROJECT_PATH_TO_SCAN, [], false);
			
			var found = -1;
			for(var i = 0; i < folders.length; i++){
				if(core.isFileExists(folders[i] + ".htaccess")){
					found = i;
					break;
				}
			}
			
			if(found >= 0){
				htaccessPath = folders[i] + ".htaccess";
			}
			else {
				num_vulnerabilities_found++;
				core.println(num_vulnerabilities_found+") Path of Security Misconfiguration vulnerability is " +htaccessPath+"\n");
			//1-
			core.appendToFile("<span style='color:purple;'>.htaccess file couldn't be detected, .htaccess file must exists in the project's root folder and have rules to prevent directory listing (index).</span><br/>");
				//-1
			}
		}
		
		if(core.isFileExists(htaccessPath)){
			if(core.findLineInFile("Options -Indexes", htaccessPath) == 0){
				num_vulnerabilities_found++;
				core.println(num_vulnerabilities_found+") Path of Security Misconfiguration vulnerability is " + htaccessPath+"\n");
			//1-
			core.appendToFile("<span style='color:purple;'>" + htaccessPath + " file does not have specific rule to prevent directory listing, which may lead to information leakage.</span><br/>");

			//-1
			}
		}
		
		// Checking for error handling
		var files = core.getAllFilesPaths(core.config.DEFAULT_PROJECT_PATH_TO_SCAN, [], true, true, ["php"]);
		
		var isErrorReportingFound = false;

		for(var i = 0; i < files.length; i++){
			if(core.findLineInFile("error_reporting(0)", files[i]) > 0 || core.findLineInFile("error_reporting($", files[i]) > 0){
				isErrorReportingFound = true;
				break;
			}
		}
		
		if(!isErrorReportingFound){
			num_vulnerabilities_found++;
			core.println(num_vulnerabilities_found+") error handling vulnarability, i.e no path"+"\n");
			//1-
			core.appendToFile("<span style='color:purple;'>Project is not configured to not report any error while production, make sure you add this function call 'error_reporting(0);' in the header of every page, or add it to your web site/app config file then it will be called in all pages.</span><br/>");

			//-1
		}
		var security = num_vulnerabilities_found;
		d = num_vulnerabilities_found;
		// Results
		core.showResults(num_vulnerabilities_found, "Security Misconfiguration", "../languages/php/docs/php_security_misconfiguration_prevention.pdf", true);
		return num_vulnerabilities_found;
	}
	
	function checkForCrossSiteScripting(){
		core.println("<-- Checking for Cross-Site Scripting Vulnerabilities -->", "green", "bold");
		//1-
		var a2='<div class="accordion-item">\
		  <h2 class="accordion-header">\
			<button class="accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">'
		core.appendToFile(a2);	
		core.appendToFile("<span style='font-size: 30px; color:green ; font-weight:bold'>Checking for Cross-Site Scripting Vulnerabilities</span><br/>");
		var a1='</button>\
		</h2>\
		<div id="faqsOne-1" class="accordion-collapse collapse" data-bs-parent="#faq-group-1">\
		  <div class="accordion-body">';
		core.appendToFile(a1);  

		//-1
		var num_vulnerabilities_found = 0;
	
		var files = core.getAllFilesPaths(core.config.DEFAULT_PROJECT_PATH_TO_SCAN);
		
		for(var i = 0; i < files.length; i++){
			if(core.findLineInFile("$_GET[ ;", files[i]) > 0){
				if(core.findLineInFile("htmlentities( $_GET[ ;", files[i], false, true) == 0 && core.findLineInFile("htmlspecialchars( $_GET[ ;", files[i], false, true) == 0 && core.findLineInFile("->purify( $_GET[ ;", files[i], false, true) == 0 && core.findLineInFile("xss $_GET[ ;", files[i]) == 0){
					num_vulnerabilities_found = num_vulnerabilities_found + core.findLineInFile("$_GET[ ;", files[i], false, true, false, false, "File might have Cross-Site Scripting Vulnerability", "'$_GET' user input can be injected, make sure to sanitize any $_GET user input from Javascript code input", true);
					core.println(num_vulnerabilities_found+") Path of Cross-Site Scripting vulnerability is " + files[i]+"\n");
				}
			}
			
			if(core.findLineInFile("$_POST[ ;", files[i]) > 0){
				if(core.findLineInFile("htmlentities( $_POST[ ;", files[i], false, true) == 0 && core.findLineInFile("htmlspecialchars( $_POST[ ;", files[i], false, true) == 0 && core.findLineInFile("->purify( $_POST[ ;", files[i], false, true) == 0 && core.findLineInFile("xss $_POST[ ;", files[i]) == 0){
					num_vulnerabilities_found = num_vulnerabilities_found + core.findLineInFile("$_POST[ ;", files[i], false, true, false, false, "File might have Cross-Site Scripting Vulnerability", "'$_POST' user input can be injected, make sure to sanitize any $_GET user input from Javascript code input", true);	
					core.println(num_vulnerabilities_found+") Path of Cross-Site Scripting vulnerability is " + files[i]+"\n");
				}
			}
			
			if(core.findLineInFile("$_REQUEST[ ;", files[i]) > 0){
				if(core.findLineInFile("htmlentities( $_REQUEST[ ;", files[i], false, true) == 0 && core.findLineInFile("htmlspecialchars( $_REQUEST[ ;", files[i], false, true) == 0 && core.findLineInFile("->purify( $_REQUEST[ ;", files[i], false, true) == 0 && core.findLineInFile("xss $_REQUEST[ ;", files[i]) == 0){
					num_vulnerabilities_found = num_vulnerabilities_found + core.findLineInFile("$_REQUEST[ ;", files[i], false, true, false, false, "File might have Cross-Site Scripting Vulnerability", "'$_REQUEST' user input can be injected, make sure to sanitize any $_GET user input from Javascript code input", true);	
					core.println(num_vulnerabilities_found+") Path of Cross-Site Scripting vulnerability is " + files[i]+"\n");
				}
			}
			
			num_vulnerabilities_found = num_vulnerabilities_found + core.findLineInFile(".innerHTML", files[i], false, true, false, false, "File might have Cross-Site Scripting Vulnerability", "'.innerHTML' function can be injected, please use '.innerText' instead", true);
			num_vulnerabilities_found = num_vulnerabilities_found + core.findLineInFile("eval(", files[i], false, true, false, false, "File might have Cross-Site Scripting Vulnerability", "'eval()' function can be injected, never use it. needing to use eval() usually indicates a problem in your code design.", true);
		}
		var crosssite = num_vulnerabilities_found;
		e = num_vulnerabilities_found;
		// Results
		core.showResults(num_vulnerabilities_found, "Cross-Site Scripting", "../languages/php/docs/php_cross_site_scripting_prevention.pdf", true);
		return num_vulnerabilities_found;
		
	}
	
	var total_num_vulnerabilities_found = 0;
	
	console.log("");
	console.log("------------------------------");
	console.log("Scanning The file");
	console.log("------------------------------");
	console.log("");
	
	//1-
	core.initReport();
	//-1
	total_num_vulnerabilities_found = total_num_vulnerabilities_found + checkForInjections();
	core.showSpace();
	total_num_vulnerabilities_found = total_num_vulnerabilities_found + checkForBrokenAuth();
	core.showSpace();
	total_num_vulnerabilities_found = total_num_vulnerabilities_found + checkForCrossSiteRequestForgery();
	core.showSpace();
	total_num_vulnerabilities_found = total_num_vulnerabilities_found + checkForSecurityMisconfiguration();
	core.showSpace();
	total_num_vulnerabilities_found = total_num_vulnerabilities_found + checkForCrossSiteScripting();
	core.showSpace();
	
	core.println("Total number of possible vulnerabilities found: " + total_num_vulnerabilities_found, "yellow", "bold");
	core.println("Check the generated " + core.config.HTML_REPORT_FILE_NAME_AND_PATH + " file to see scan results in detailed", "cyan", "bold");
	core.appendToFile("<span style='color:green;font-size:30px; font-weight:bold'>Total number of possible vulnerabilities found: " + total_num_vulnerabilities_found + "</span><br/>");
	core.appendToFile("<span style='color:blue; font-weight:bold'><a href='" + __dirname + "/../php/docs' target='_blank'>There are other Web Security Suggestions which can only be explained verbosely, Click Here to read more.</a></span><br/></br></br>");
	var code2 = '\
	</div>\
  </div>\
</div><!-- End F.A.Q Group 1 -->';
core.appendToFile(code2);

var code = '<head>\
		<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js" type="text/javascript"></script>\
	</head>\
	<body>\
		<div id="container"></div>\
		<script>\
			var pie = new ej.charts.AccumulationChart({ \
				backgroundColor: "#F5DEB3",\
				title: "Vulnerabilities found ",\
				series: [\
					{\
						dataSource: [';
core.appendToFile(code)
core.appendToFile("{ 'x': 'Injection Vulnerabilities', y: "+ a +" },")
core.appendToFile("{ 'x': 'Broken Authentication Vulnerabilities', y: " + b + " },")
core.appendToFile("{ 'x': 'Cross-Site Request Forgery Vulnerabilities', y: " + c + " },")
core.appendToFile("{ 'x': 'Security Misconfiguration Vulnerabilities', y: " + d + " },")
core.appendToFile("{ 'x': 'Cross-Site Scripting Vulnerabilities', y: " + e + " }")

var code2='],\
						dataLabel: {\
							visible: true,\
							position: "Inside",\
						},\
						xName: "x",\
						yName: "y"\
					}\
				],\
			});\
			pie.appendTo("#container");\
		</script>\
	</body>\
	';
	core.appendToFile(code2)	
	core.appendToFile("<script>\
	localStorage.setItem('a'," +a+");")
	core.appendToFile("localStorage.setItem('b', "+b+");")
	core.appendToFile("localStorage.setItem('c', "+c+");")
	core.appendToFile("localStorage.setItem('d', "+d+");")
	core.appendToFile("localStorage.setItem('e', "+e+");\
	</script>")

var code3='\
</div><!-- End Right side columns -->\
</div>\
</section>\
</main><!-- End #main -->\
<!-- ======= Footer ======= -->\
<footer id="footer" class="footer">\
<div class="credits">\
Designed by Team 12</a>\
</div>\
</footer><!-- End Footer -->\
<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>\
<!-- Vendor JS Files -->\
<script src="assets/vendor/apexcharts/apexcharts.min.js"></script>\
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>\
<script src="assets/vendor/chart.js/chart.umd.js"></script>\
<script src="assets/vendor/echarts/echarts.min.js"></script>\
<script src="assets/vendor/quill/quill.min.js"></script>\
<script src="assets/vendor/simple-datatables/simple-datatables.js"></script>\
<script src="assets/vendor/tinymce/tinymce.min.js"></script>\
<script src="assets/vendor/php-email-form/validate.js"></script>\
<!-- Template Main JS File -->\
<script src="assets/js/main.js"></script>\
</body>\
</html>';
	core.appendToFile(code3)	

	core.showSpace();

	
}