let startTime;
let running = false;
let interval;
let laps = [];

function startStop() {
  if (!running) {
    startTime = new Date().getTime();
    interval = setInterval(updateDisplay, 10);
    document.getElementById("startStopButton").innerHTML = "Stop";
    document.getElementById("startStopButton").classList.remove("start");
    document.getElementById("startStopButton").classList.add("stop");
    running = true;
  } else {
    clearInterval(interval);
    document.getElementById("startStopButton").innerHTML = "Start";
    document.getElementById("startStopButton").classList.remove("stop");
    document.getElementById("startStopButton").classList.add("start");
    running = false;
  }
}

function reset() {
  clearInterval(interval);
  document.getElementById("display").innerHTML = "00:00:00";
  document.getElementById("startStopButton").innerHTML = "Start";
  document.getElementById("startStopButton").classList.remove("stop");
  document.getElementById("startStopButton").classList.add("start");
  running = false;
  laps = [];
  displayLaps(); 
}
function lap() {
  if (running) {
    let lapTime = new Date().getTime() - startTime;
    let formattedLapTime = formatTime(lapTime);
    laps.push(formattedLapTime);
    displayLaps();
    copyLapTime(formattedLapTime);
  }
}

function copyLapTime(lapTime) {
  let li = document.createElement("li");
  li.textContent = lapTime;
  document.getElementById("lapTimes").appendChild(li);
}


function updateDisplay() {
  let elapsedTime = new Date().getTime() - startTime;
  let formattedTime = formatTime(elapsedTime);
  document.getElementById("display").innerHTML = formattedTime;
}

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor((time % 1000) / 10);

  return (
    pad(hours) + ":" +
    pad(minutes) + ":" +
    pad(seconds) + ":" +
    pad(milliseconds)
  );
}

function pad(num) {
  return (num < 10 ? "0" : "") + num;
}

function displayLaps() {
  let lapTimesList = document.getElementById("lapTimes");
  lapTimesList.innerHTML = ""; 

  laps.forEach(function(lap, index) {
    let li = document.createElement("li");
    li.textContent = "Lap " + (index + 1) + ": " + lap;
    lapTimesList.appendChild(li);
  });
}
