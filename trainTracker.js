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

        var diffCalc = moment().diff(moment(firstArrivalconverted), 'minutes');
        var timeDifference = diffCalc % newTrainInterval;
        var timeRemaining = newTrainInterval - timeDifference;

        var nextArrival = moment().add(timeRemaining, 'minutes').format('h:mma');

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
        })
        function updateTimes() {
            var firstArrivalconverted = moment(newTrainFirstArrival, 'HH:mm').subtract(1, 'years');
            console.log(firstArrivalconverted);
            var diffCalc = moment().diff(moment(firstArrivalconverted), 'minutes');
            var timeDifference = diffCalc % newTrainInterval;
            var timeRemaining = newTrainInterval - timeDifference;
            console.log(timeRemaining);
            var nextArrival = moment().add(timeRemaining, 'minutes').format('h:mma');
            console.log(nextArrival);

            $('.nextArrivalData').text(snapShot.val().nextArrival);
            $('.timeRemainingData').text(snapShot.val().timeRemaining);
        }
        setInterval(updateTimes, 1000)
    });
    database.ref('/trains').on('child_added', function (childSnapshot) {
        $('.trainInfo').append(
            $('<tr>'),
            $('<td>').text(childSnapshot.val().newTrain),
            $('<td>').text(childSnapshot.val().newTrainDestination),
            $('<td>').text(childSnapshot.val().newTrainInterval),
            $('<td>').text(childSnapshot.val().nextArrival),
            $('<td>').text(childSnapshot.val().timeRemaining),
        )
    });
});















