var express         = require("express"),
	http 			= require("http"),
    app             = express(),
    socketIO 		= require('socket.io');
    firebase        = require("firebase/app");

var port = 3000;
var server = http.createServer(app);
var io = socketIO(server);
// Get a reference to the database service
//
var user;
var email_id;

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

//TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB31ToTQDgya-NGh8rtJh278H2KNCpa5UY",
  authDomain: "goldenhack-fe1fc.firebaseapp.com",
  databaseURL: "https://goldenhack-fe1fc.firebaseio.com",
  projectId: "goldenhack-fe1fc",
  storageBucket: "",
  messagingSenderId: "581271980997",
  appId: "1:581271980997:web:96705594a36f5b32e199ac",
  measurementId: "G-256HQXL6SK"
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//var database = firebase.database();

// EXPRESS =============================================
app.get("/", function(req, res) {
	res.send("hello");
});



// Checks is user has logged in
firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			user = firebase.auth().currentUser;

			if (user != null) {
				email_id = user.email;
			}
		} else {
			// No user is signed in.
			user = null;
		}
});

// FIREBASE============================================

//login
function login() {

	var userEmail; // need to fetch from front end
	var password; // need to fetch from front end;

	firebase.auth().signInWithEmailAndPassword(userEmail, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});
}

function logout() {
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  // An error happened.
	});
}

function signup() {
	// firebase.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
	//  // here you can use either the returned user object or       firebase.auth().currentUser. I will use the returned user object
	//     if(user){
	//       user.updateProfile({
	//          displayName: "ninad"// fetch userId from frontend,
	//          //photoURL: // some photo url
	//       }).then(
	//         (s)=> // perform any other operation
	//       )
	//     }
	// })
	// .catch(function(error) {
	//   // Handle Errors here.
	//   var errorCode = error.code;
	//   var errorMessage = error.message;
	//   // ...
	// });

	var email = "nin@gmail.com";
	var password = "123456";

	 firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
	 	console.log(cred);
	 	// add user to database
	 });
	 //catch(function(error) {
	//   // Handle Errors here.
	//   var errorCode = error.code;
	//   var errorMessage = error.message;
	//   // ...
	// });

	// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	//   // Handle Errors here.
	//   var errorCode = error.code;
	//   var errorMessage = error.message;
	//   // ...
	// });
}

var databaseRef = firebase.database().ref("/users");

// function uploadImageBase64(imageUrl) {
//   firebase.database().ref('users/' + userId + '/folders/' + folder).set({
//     //: name,
//     //email: email,
//     file : imageUrl
//   });
// }

function fetchFile() {
	
}

// const addUser = (userId) => {
// 	var databaseRef = firebase.database().ref("/users");
// 	var updates = {};
// 	updates[userId] = {
// 		email: 'ninad';
// 	};

// 	return databaseRef.update(updates);
// }

const addFolder = (userId, folderName) => {
	var databaseRef = firebase.database().ref("/users" + userId + '/folders/');

	var updates = {};
	updates[folderName] = {};

	return databaseRef.update(updates);
}

const addImageToFolder = (userId, folderName, imageName, imageBase64) => {
	var databaseRef = firebase.database().ref("/users/" + userId + '/folders/' + folderName);

	var updates = {};
	updates[`${imageName}`] = {
		date: '08-09-19',
		img: imageBase64
	};

	return databaseRef.update(updates);
}

const writeToDB = (userId, folderName, imgName) => {
	var databaseRef = firebase.database().ref("/users" + userId);
	databaseRef.set({
		hello: 'Hi there'
	});

	const folderData = {}
	folderData[imgName] = {
		date: '08-09-19'
	}

	// Write the new post's data simultaneously in the posts list and the user's post list.
	var updates = {};
	updates['/folders/' + folderName] = folderData;

	return databaseRef.update(updates);
}

// SOCKET ==============================================

io.on('connection', function (socket) {

  // LISTEN FOR DOCTORS REQUEST
  socket.on('doctor_request', function( data ) {
  	 // check if user logged in
  	 if (user != null) {
  	 	//if data.userId === user.displayName {
  	 		io.emit( 'show_notification', data);
  	 	//}
  	 } else {
  	 	// user not logged in
  	 	// send "user not logged in message to doctor"
  	 }
    
  });

  // SEND RESPONSE TO DOCTOR
  socket.on('patient_respone', function(data) {
  	io.emit("patient_response", data);
  });

  // DISCONNECT SESSION
  socket.on('disconnect', function() {
  	io.emit('doctor disconnected successfully');
  });
});


/// Encoding ===========================================
const Buffer = require('buffer').Buffer;
const path = require('path');
//const fs = require('fs');

var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    //console.log('******** File created from base64 encoded string ********');
}




// populate db

// fetch from db

// update file


server.listen(port, function() {
    console.log("Server has started!");
    // var str = base64_encode(__dirname + '/public/' + 'nin.png');
    // console.log(str);
    // console.log(base64_decode(str, __dirname + '/public/' + 'nin2.png'))
    //signup();
    //writeToDB(`user123`, `immunization`, `chickenpox`);
    //addUser('user12345');
    addFolder('user123', 'immunization')
    addImageToFolder('user123', 'immunization', 'chickenpox', base64_encode(__dirname + '/public/' + 'nin.png'))
    addFolder('user123', 'radiology')
    addImageToFolder('user123', 'radiology', 'someStuff', base64_encode(__dirname + '/public/' + 'nin.png'))

    addFolder('user321', 'immunization')
    addImageToFolder('user321', 'immunization', 'chickenpox', base64_encode(__dirname + '/public/' + 'nin.png'))
});





