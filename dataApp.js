// Initialize Firebase
var config = {
  apiKey: "AIzaSyAcWq1_yZ3ycDSMoag2exuBJVChamzAwZ8",
  authDomain: "train-activity-7bbcb.firebaseapp.com",
  databaseURL: "https://train-activity-7bbcb.firebaseio.com",
  storageBucket: "train-activity-7bbcb.appspot.com",
  messagingSenderId: "681560829641"
};

firebase.initializeApp(config);


var database = firebase.database();

//Initial values

 var name = "";
 var destination = "";
 var frequency = "";
 var nextArrival = "";
 var firstTime = "";
 var minAway = "";

 //capture button Click
 $("#submit").on("click", function(){

   //Grabbed value from text boxes
   name = $("#train-name").val().trim();
   destination = $("#destination").val().trim();
   frequency = $("#frequency").val().trim();
   firstTime = $("#first-time").val().trim();
   //firstTime = moment($("#first-time").val().trim(),"HH:mm").format("X");
   //figure out moment.js and have it convert.
   //
   convertedStartTime = moment(firstTime,'HH:mm');
   var timeDiff = moment().diff(moment(convertedStartTime),'minutes');
   //# of the next train to this time since the first Train.
   var nextTrain = roundUp(timeDiff/parseFloat(frequency),1);
   var minTillNextTrain = nextTrain*parseFloat(frequency);

   nextTrainTime = convertedStartTime.add(minTillNextTrain,'m');

   nextArrival = nextTrainTime.format("HH:mm");

   console.log("firstTime",convertedStartTime);
   console.log("timeDiff",timeDiff);
   console.log("nextTrain",nextTrain);
   console.log("minTillNextTrain",minTillNextTrain);
   console.log("nexttraintime",nextTrainTime);
   console.log("nextArrival",nextArrival);



   database.ref().push({
     name: name,
     destination: destination,
     frequency: frequency,
     nextArrival: nextArrival,
     minAway : minAway,
   });

   //Don't refresh the page!
   return false;

 });

 database.ref().on("child_added", function(childSnapshot) {
   //log everything that's coming out of snapshot
   console.log(childSnapshot.val().name);
   console.log(childSnapshot.val().destination);
   console.log(childSnapshot.val().frequency);
   console.log(childSnapshot.val().nextArrival);
   console.log(childSnapshot.val().minAway);


   //full list of item to the well

   $("#tbody").append("<tr><td> " + childSnapshot.val().name +
     " </td><td> " + childSnapshot.val().destination +
     " </td><td id=''> " + childSnapshot.val().frequency +
     " </td><td>" + childSnapshot.val().nextArrival + "</td><td id=''> " + childSnapshot.val().minAway + " </td></tr>");

     //this handle the error
 }, function(errorObject){
   console.log("Errors handled: "+errorObject.code);
 });

//round up function from stack overflow.
 function roundUp(num, precision) {
   return Math.ceil(num * precision) / precision
 };
