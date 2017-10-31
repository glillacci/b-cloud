// Create a request to retrieve followers from API
var followerRequest = new XMLHttpRequest();
var followerRequestURL = "https://api.mixcloud.com/b-fore/followers/?limit=20";

// Handle changes in readyState property of followerRequest
followerRequest.onreadystatechange = function() {
  if (followerRequest.readyState == 4) {
    var followers = JSON.parse (followerRequest.responseText);
    console.log(followers);

    // API will deliver 20 followers at a time
    // List followers on this chunk of data
    for (i = 0; i < followers.data.length; i++) {
      document.getElementById("followers").value += (followers.data[i].
        username + ", ");
    }

    // Check if we are done
    if (followers.paging.next != null) {
      // If not, send request to retrieve the next chunk of users
      nextPageURL = followers.paging.next;
      followerRequest.open ("GET", nextPageURL, true);
      followerRequest.send (null);
    }
  }
}

// Open and send the initial request
followerRequest.open("GET", followerRequestURL, true);
followerRequest.send(null);
