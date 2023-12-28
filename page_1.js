//Global declaration of array storages
var no_tracks = []
var previous_track = []
var current_track = []
var seek_rate = []
var requested_tracks = []
var graph_direction;
var graph_end;

function fetchTracks (inputId, arrayName) {
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

function getData () {
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

function sort () {
  // Sort the array in ascending order
  requested_tracks.sort(function (a, b) {
    return a - b
  })

  // Display the sorted array
  console.log('Sorted Tracks: ' + requested_tracks)
  data_Out()
}
var thm
function data_Out () {
  var out = document.getElementById('dataOut')
  var direction = ''
  var gap = ''
  out.innerHTML = ''

  out.innerHTML = 'THM = '

  if (current_track[0] < previous_track[0]) {
    thm =
      current_track[0] -
      requested_tracks[0] +
      requested_tracks[requested_tracks.length - 1] -
      requested_tracks[0]

    out.innerHTML += `(${current_track[0]} - ${requested_tracks[0]}) + (${
      requested_tracks[requested_tracks.length - 1]
    } - ${requested_tracks[0]})`

    console.log(
      'THM = ' +
        (current_track[0] -
          requested_tracks[0] +
          (requested_tracks[requested_tracks.length - 1] - requested_tracks[0]))
    )
    direction += 'left'
    gap += 'less than'
    graph_direction = requested_tracks[0];
    graph_end = requested_tracks[requested_tracks.length - 1];
  } else {
    thm =
      requested_tracks[requested_tracks.length - 1] -
      current_track[0] +
      (requested_tracks[requested_tracks.length - 1] - requested_tracks[0])

    out.innerHTML += `(${requested_tracks[requested_tracks.length - 1]} - ${
      current_track[0]
    }) + (${requested_tracks[requested_tracks.length - 1]} - ${
      requested_tracks[0]
    })`

    direction += 'right'
    gap += 'greater than'
    graph_direction = requested_tracks[requested_tracks.length - 1];
    graph_end = requested_tracks[0];
  }

  out.innerHTML += `<br><b><span style="color: #238636;">THM = ${thm}</span></b>`

  //ST
  var st
  var st_ms
  st = thm * seek_rate[0]
  st_ms = st / 100

  console.log('ST: ' + st + ' or ' + st_ms + ' s')

  out.innerHTML += `<br><br>ST = ${thm} x ${seek_rate[0]}<br>ST = ${st} / 100<br><b><span style="color: #238636;">ST = ${st_ms} s</span></b>`

  var state = document.getElementById('statement')
  state.innerHTML = ' '
  state.innerHTML += `<i>The Total Head Movement is ${thm}, while the Seek Time is ${st_ms} second/s.<br>Thus, the graph shows a ${direction} direction because the current track is ${gap} the previous track.</i>`
  updateChart(); 
}




var myLineChart; // Declare the variable outside the functions

function updateChart() {
  var data_values = [previous_track[0], current_track[0], graph_direction, graph_end ];
  var labels = ['Previous', 'Current', '', '' , ''];
  

  var data = {
    labels: labels,
    datasets: [
      {
        label: 'Track',
        data: data_values,
        fill: false,
        borderColor: '#238636',
        tension: 0.2,
        pointBackgroundColor: ['#238636', '#e4ebf1', '#238636', '#238636', '#238636'],
      }
    ]
  };

  var ctx = document.getElementById('myLineChart').getContext('2d');

  // Destroy the existing chart if it exists
  if (myLineChart) {
    myLineChart.destroy();
  }

  // Create a new chart with datalabels plugin
  myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
    
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
         

          },
          y: {
            
            beginAtZero: true,
            grid: { 
              color:['', '#238636', '', '']
             
              
              }
            }
        
      },
      elements: {
        pointLabel:{
            label: ['1','2']
        },
        point: {
          radius: 10, // You can adjust the point radius as needed
          hoverRadius: 20, // You can adjust the hover radius as needed
          hitRadius: 60,
          pointStyle: 'circle'
        },
        line:{
          borderJoinStyle: 'round',
          borderWidth: '2'
        }
      },layout: {
        padding: {
          left: 30, // Adjust the left padding as needed
          right: 40, // Adjust the right padding as needed
          top: 40, // Adjust the top padding as needed
          bottom: 20 // Adjust the bottom padding as needed
        }
        },  animation: {

  },
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          clamp: true,
          anchor: 'center',
          align: 'center',
          font: {
            size: 120
          },
          display: true
        }
      },
      
     
    }
  });
  
}

// Initial chart setup on page load
document.addEventListener('DOMContentLoaded', updateChart);
