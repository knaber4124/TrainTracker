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

    $('.clock').text(moment().format('MMMM D YYYY, h:mm a'));
    function update() {
        $('.clock').text(moment().format('MMMM D YYYY, h:mm a'));
    }
    setInterval(update, 1000);


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
        $('.nameInput').val('');
        $('.destinationInput').val('');
        $('.arrivalInput').val('');
        $('.intervalInput').val('');

        database.ref('/trains').push({
            newTrain: newTrain,
            newTrainDestination: newTrainDestination,
            newTrainFirstArrival: newTrainFirstArrival,
            newTrainInterval: newTrainInterval,
            nextArrival: nextArrival,
            timeRemaining: timeRemaining
        });

        database.ref('/trains').on('child_added', function (childSnapshot) {
            let newTR = $('<tr>');
            let trainName = $('<td>').text(childSnapshot.val().newTrain);
            let trainDesination = $('<td>').text(childSnapshot.val().newTrainDestination);
            let trainFrequency = $('<td>').text(childSnapshot.val().newTrainInterval + ' ' +'minutes');
            let nextArrivalTime = $('<td>');
            nextArrivalTime.addClass('nextArrivalData').text(childSnapshot.val().nextArrival);
            let nextArrivalInterval = $('<td>');
            nextArrivalInterval.addClass('timeRemainingData').text(childSnapshot.val().timeRemaining);
            var firstArrivalconverted = moment(newTrainFirstArrival, 'HH:mm').subtract(1, 'years');
            console.log(firstArrivalconverted);
            var diffCalc = moment().diff(moment(firstArrivalconverted), 'minutes');
            var timeDifference = diffCalc % newTrainInterval;
            var timeRemaining = newTrainInterval - timeDifference;
            console.log(timeRemaining);
            var nextArrival = moment().add(timeRemaining, 'minutes').format('h:mma');
            console.log(nextArrival);


            newTR.append(trainName, trainDesination, trainFrequency, nextArrivalTime, nextArrivalInterval);
            $('.trainInfo').append(newTR);

        })
        // function updateTimes() {
        //     var firstArrivalconverted = moment(newTrainFirstArrival, 'HH:mm').subtract(1, 'years');
        //     console.log(firstArrivalconverted);
        //     var diffCalc = moment().diff(moment(firstArrivalconverted), 'minutes');
        //     var timeDifference = diffCalc % newTrainInterval;
        //     var timeRemaining = newTrainInterval - timeDifference;
        //     console.log(timeRemaining);
        //     var nextArrival = moment().add(timeRemaining, 'minutes').format('h:mma');
        //     console.log(nextArrival);

        //     $('.nextArrivalData').text(snapShot.val().nextArrival);
        //     $('.timeRemainingData').text(snapShot.val().timeRemaining);
        // }
        // setInterval(updateTimes, 1000)




    })



})



