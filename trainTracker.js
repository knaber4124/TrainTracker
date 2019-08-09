$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyAWQ3rY6DPVXZJHc_CDVH3mW6a2ka7psNM",
        authDomain: "traintracker-482ca.firebaseapp.com",
        databaseURL: "https://traintracker-482ca.firebaseio.com",
        projectId: "traintracker-482ca",
        storageBucket: "",
        messagingSenderId: "44644774961",
        appId: "1:44644774961:web:fb75e960592f73ff"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    database = firebase.database();
    // let now = moment();
    $('.clock').text(moment().format('MMMM D YYYY, h:mm a'));
    function update() {
        $('.clock').text(moment().format('MMMM D YYYY, h:mm a'));
    }
    setInterval(update, 1000);

    function populate(){

    };


    $('.submit').on('click', function (event) {
        event.preventDefault();

        var newTrain = $('.nameInput').val().trim();
        var newTrainDestination = $('.destinationInput').val().trim();
        var newTrainFirstArrival = $('.arrivalInput').val().trim();
        var newTrainInterval = $('.intervalInput').val().trim();
        var firstArrivalconverted = moment(newTrainFirstArrival, 'HH:mm').subtract(1, 'years');
        console.log(firstArrivalconverted);
        var diffCalc = moment().diff(moment(firstArrivalconverted), 'minutes');
        var timeDifference = diffCalc % newTrainInterval;
        var timeRemaining = newTrainInterval - timeDifference;
        console.log(timeRemaining);
        var nextArrival = moment().add(timeRemaining, 'minutes').format('h:mma');
        console.log(nextArrival);




        // localStorage.setItem("newTrain", newTrain);
        // localStorage.setItem('newTrainDestination', newTrainDestination);
        // localStorage.setItem('newTrainFirstArrival', newTrainFirstArrival);
        // localStorage.setItem('newTrainInterval', newTrainInterval);

        database.ref().push({
            newTrain: newTrain,
            newTrainDestination: newTrainDestination,
            newTrainFirstArrival: newTrainFirstArrival,
            newTrainInterval: newTrainInterval,

        });


        database.ref().on('child_added', function (childSnapshot) {
            let newTR = $('<tr>');
            let trainName = $('<td>').text(childSnapshot.val().newTrain);
            let trainDesination = $('<td>').text(childSnapshot.val().newTrainDestination);
            let trainFrequency = $('<td>').text(childSnapshot.val().newTrainInterval);
            let nextArrivalTime = $('<td>');
            nextArrivalTime.addClass('nextArrivalData');
            let nextArrivalInterval = $('<td>');
            nextArrivalInterval.addClass('timeRemainingData');
            var firstArrivalconverted = moment(newTrainFirstArrival, 'HH:mm').subtract(1, 'years');
            console.log(firstArrivalconverted);
            var diffCalc = moment().diff(moment(firstArrivalconverted), 'minutes');
            var timeDifference = diffCalc % newTrainInterval;
            var timeRemaining = newTrainInterval - timeDifference;
            console.log(timeRemaining);
            var nextArrival = moment().add(timeRemaining, 'minutes').format('h:mma');
            console.log(nextArrival);
            function updateTimes() {
                $('.nextArrivalData').text(nextArrival);
                $('.timeRemainingData').text(timeRemaining);
            }
            setInterval(updateTimes, 60000);
            newTR.append(trainName, trainDesination, trainFrequency, nextArrivalTime, nextArrivalInterval);
            $('.trainInfo').append(newTR);

        })


    })

    // database.ref('users').push(function)
    // // change on click to push to firebase as a JSON object
    // database.ref('users').on('child_added', function(snapshot){
    // pull data from Fireadd data to page
    // newTR.append(trainName,trainDesination,trainFrequency,nextArrivalTime,nextArrivalInterval);
    //     $('.trainInfo').append(newTR);

})

// });

//

