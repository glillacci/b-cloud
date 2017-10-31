// The following code implements OAuth2 authentication

// Declare global variables for configuration data and access token
var config = ""
var access_token = ""

// Create a request to configuration data
var configFileRequest = new XMLHttpRequest();

// Handle events triggered by changes in readyState of configFileRequest
configFileRequest.onreadystatechange = function() {
		// If request is complete
    if (configFileRequest.readyState == 4) {
      // Parse configuration data
      config = JSON.parse(configFileRequest.responseText);
			// Trigger authentication
			performUserAuthetication();
    }
}

// Initialize and send the request
configFileRequest.open("GET", "./script/config.json", true);
configFileRequest.send(null);


// This function performs the authentication flow
function performUserAuthetication() {
	// Extract authorization code from URL
	var authorizationCode = getURLParameter("code")

	// Check if an authorization code is present
	if (authorizationCode == null) {
		// Authorization code is not present -->
		// We must get one by redirecting to Mixcloud's authorization page
		// Build URL for authorization request
		var authotizationURL = config.authorization_url + "?" +
			"client_id=" + config.client_id + "&" +
			"redirect_uri=" + window.location.href
		// Perfom the redirect
		window.location.assign(authotizationURL);
	}
	else {
		// Authorization code is present -->
		// We can send a request to get an access token
		var accessTokenRequest = new XMLHttpRequest();
		// Form the URL for the access token request
		var tokenURL = config.token_url + "?" +
			"client_id=" + config.client_id + "&" +
			"redirect_uri=" + window.location.href.toString().split("?")[0] + "&" +
			"client_secret=" + config.client_secret + "&" +
			"code=" + authorizationCode

		// Handle events triggered by changes in readyState of accessTokenRequest
		accessTokenRequest.onreadystatechange = function() {
			// If request is complete
			if (accessTokenRequest.readyState == 4) {
				// Parse the response text and get access token
				var configData = JSON.parse (accessTokenRequest.responseText);
				access_token = configData.access_token;
				// Set cookie to store the access token
				document.cookie = "access_token=" + access_token;
			}
		}

		// Initialize and send the request
		accessTokenRequest.open("GET", tokenURL, true);
		accessTokenRequest.send(null);
	}
}


// This function reads URL parameters
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' +
		'([^&;]+?)(&|#|;|$)').exec(location.search) ||
		[null, ''])[1].replace(/\+/g, '%20')) || null;
}
