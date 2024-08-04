// script.js

let interval;
let timer;
let isPaused = false;
let remainingTime;

document.getElementById('start-timer').addEventListener('click', function() {
    const minutes = parseInt(document.getElementById('time').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }
    startTimer(minutes * 60);
});

document.getElementById('start-break').addEventListener('click', function() {
    const breakMinutes = parseInt(document.getElementById('break-time').value);
    if (isNaN(breakMinutes) || breakMinutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }
    startTimer(breakMinutes * 60);
});

document.getElementById('pause-timer').addEventListener('click', function() {
    if (!isPaused) {
        clearInterval(interval);
        isPaused = true;
        remainingTime = timer;
    }
});

document.getElementById('resume-timer').addEventListener('click', function() {
    if (isPaused) {
        startTimer(remainingTime, true);
        isPaused = false;
    }
});

document.getElementById('stop-timer').addEventListener('click', function() {
    clearInterval(interval);
    stopAlarm();
    document.getElementById('fullscreen-timer').style.display = 'none';
    document.querySelector('body').style.background = 'linear-gradient(to right, #ff7e5f, #feb47b)';
    document.querySelector('.container').style.opacity = '1';
});

function startTimer(duration, resume = false) {
    timer = duration;
    const alarm = document.getElementById('alarm-sound');
    const fullscreenTimer = document.getElementById('fullscreen-timer');

    document.querySelector('.container').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('body').style.background = '#000';
        fullscreenTimer.style.display = 'flex';
    }, 500);

    interval = setInterval(function () {
        let minutes = parseInt(timer / 60, 10);
        let seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        updateDisplay(minutes, seconds);

        if (--timer < 0) {
            clearInterval(interval);
            alarm.play();
        }
    }, 1000);

    if (resume) {
        timer = remainingTime;
    }
}

function updateDisplay(minutes, seconds) {
    const minuteDigits = document.getElementById('minutes');
    const secondDigits = document.getElementById('seconds');

    minuteDigits.textContent = minutes;
    secondDigits.textContent = seconds;
}

function stopAlarm() {
    const alarm = document.getElementById('alarm-sound');
    alarm.pause();
    alarm.currentTime = 0;
}
