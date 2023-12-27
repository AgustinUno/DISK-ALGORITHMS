
//Global declaration of array storages
var no_tracks = [];
var previous_track = [];
var current_track = [];
var seek_rate = [];
var requested_tracks = []; 

function fetchTracks(inputId, arrayName) {
    var inputElement = document.getElementById(inputId);
    var inputString = inputElement.value;

    // Split the string into an array of strings and parse as integers
    var tracksArray = inputString.split(',').map(function(item) {
        return parseInt(item.trim(), 10);
    });

    // Filter out NaN values (non-integer inputs)
    tracksArray = tracksArray.filter(Number.isInteger);

    // Store the result in the specified array name
    window[arrayName] = tracksArray;

   
    alert("No. of Tracks: " + tracksArray.length);
}

