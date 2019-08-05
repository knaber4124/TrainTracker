$(document).ready(function () {
    


    $('.submit').on('click',function(event){
        event.preventDefault();
        var newTrain=$('.nameInput').val().trim();
        var newTrainDestination=$('.destinationInput').val().trim();
        var newTrainFirstArrival=$('.arrivalInput').val().trim();
        var newTrainInterval=$('.intervalInput').val().trim();
        
        let newTR=$('<tr>');
        let trainName=$('<td>').text(newTrain);
        let trainDesination=$('<td>').text(newTrainDestination);
        let trainFrequency=$('<td>').text(newTrainInterval);
        let nextArrivalTime=$('<td>').text(newTrainFirstArrival);
        let nextArrivalInterval=$('<td>');
        newTR.append(trainName,trainDesination,trainFrequency,nextArrivalTime,nextArrivalInterval);
        $('.trainInfo').append(newTR);

    });




});