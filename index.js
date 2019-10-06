var express         = require("express"),
	http 			= require("http"),
    app             = express();
    socketIO 		= require('socket.io'),
    firebase        = require("firebase/app");

var port = 3000;
var server = http.createServer(app);
var io = socketIO(server);


// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

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

// EXPRESS =============================================
app.get("/", function(req, res) {
	res.send("hello");
});

// SOCKET ==============================================

io.on('connection', function (socket) {
  socket.on( 'new_notification', function( data ) {
    console.log(data.title,data.message);
    io.sockets.emit( 'show_notification', { 

      // request access

      // title: data.title, 
      // message: data.message, 

      // button: Yes
      // Button: No
    });
  });
});


//login

// populate db

// fetch from db

// update file


// middleware to see if user logged in

server.listen(port, function() {
    console.log("Server has started!");
});