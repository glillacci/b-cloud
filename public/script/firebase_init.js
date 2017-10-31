// Create a request to read Firebase configuration data
var firebaseConfigRequest = new XMLHttpRequest();
// Handle events triggered by changes in readyState of configFileRequest
firebaseConfigRequest.onreadystatechange = function() {
		// If request is complete
    if (firebaseConfigRequest.readyState == 4) {
      // Parse configuration data
      firebaseConfig = JSON.parse(firebaseConfigRequest.responseText);
      // Initialize Firebase
      var config = {
        apiKey: firebaseConfig.apiKey,
        authDomain: firebaseConfig.authDomain,
        databaseURL: firebaseConfig.databaseURL,
        projectId: firebaseConfig.projectId,
        storageBucket: firebaseConfig.storageBucket,
        messagingSenderId: firebaseConfig.messagingSenderId
      };
      firebase.initializeApp(config);
    }
}
// Initialize and send the request
firebaseConfigRequest.open("GET", "./script/firebase_config.json", true);
firebaseConfigRequest.send(null);
