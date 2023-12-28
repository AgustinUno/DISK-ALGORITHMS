//Global declaration of array storages
var no_tracks = []
var previous_track = []
var current_track = []
var seek_rate = []
var requested_tracks = []
var checkRt

function fetchTracks(inputId, arrayName) {
  var inputElement = document.getElementById(inputId)
  var inputString = inputElement.value

  // Split the string into an array of strings and parse as integers
  var tracksArray = inputString.split(',').map(function (item) {
    return parseInt(item.trim(), 10)
  })

  // Filter out NaN values (non-integer inputs)
  tracksArray = tracksArray.filter(Number.isInteger)

  // Store the result in the specified array name
  window[arrayName] = tracksArray
}

function getData() {
  fetchTracks('nTracks-input', 'no_tracks')
  fetchTracks('prevTracks-input', 'previous_track')
  fetchTracks('currTracks-input', 'current_track')
  fetchTracks('seekRate-input', 'seek_rate')
  fetchTracks('reqTracks-input', 'requested_tracks')

  console.log('No. of tracks: ' + no_tracks[0])
  console.log('Previous track: ' + previous_track[0])
  console.log('Current track: ' + current_track[0])
  console.log('Seek rate: ' + seek_rate[0] + 'ms')
  console.log('Requested tracks: ' + requested_tracks)
  sort()
}

function sort() {
  // Sort the array in ascending order
  requested_tracks.sort(function (a, b) {
    return a - b
  })

  // Display the sorted array
  console.log('Sorted Tracks: ' + requested_tracks)
  data_Out()
}
var thm
function data_Out() {
  var out = document.getElementById('dataOut')
  out.innerHTML = ''

  out.innerHTML = 'THM = '

  if (current_track[0] < previous_track[0]) {
    thm =
      current_track[0] -
      requested_tracks[0] +
      requested_tracks[requested_tracks.length - 1] -
      requested_tracks[0]

    out.innerHTML += `(${current_track[0]} - ${requested_tracks[0]}) + (${requested_tracks[requested_tracks.length - 1]
      } - ${requested_tracks[0]})`

    console.log(
      'THM = ' +
      (current_track[0] -
        requested_tracks[0] +
        (requested_tracks[requested_tracks.length - 1] - requested_tracks[0]))
    )
  } else {
    thm =
      requested_tracks[requested_tracks.length - 1] -
      current_track[0] +
      (requested_tracks[requested_tracks.length - 1] - requested_tracks[0])

    out.innerHTML += `(${requested_tracks[requested_tracks.length - 1]} - ${current_track[0]
      }) + (${requested_tracks[requested_tracks.length - 1]} - ${requested_tracks[0]
      })`

    //  let r = 42;
    //  out.innerHTML = `value: ${r}`;
  }

  out.innerHTML += `<br><b><span style="color: #238636;">THM = ${thm}</span></b>`

  //ST
  var st
  var st_ms
  st = thm * seek_rate[0]
  st_ms = st / 100

  console.log('ST: ' + st + ' or ' + st_ms + ' s')

  out.innerHTML += `<br><br>ST = ${thm} x ${seek_rate[0]}<br>ST = ${st} / 100<br><b><span style="color: #238636;">ST = ${st_ms} s</span></b>`
}


document.addEventListener('DOMContentLoaded', function () {
 
  var labels = ['Point 1', 'Point 2', 'Point 3']; // Provide meaningful labels
  var data = {
      labels: labels,
      datasets: [{
          label: 'Monthly Data',
          data: requested_tracks,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0
      }]
  };

  var ctx = document.getElementById('myLineChart').getContext('2d');
  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
          indexAxis: 'y',
          scales: {
              x: {
                  beginAtZero: true
              }
          }
      }
  });
});