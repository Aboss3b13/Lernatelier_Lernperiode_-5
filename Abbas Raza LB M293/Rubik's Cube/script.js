// script.js
document.addEventListener("DOMContentLoaded", function() {
    const monthYearElement = document.getElementById("month-year");
    const datesElement = document.querySelector(".dates");
    const clockElement = document.getElementById("clock");
    const stopwatchElement = document.getElementById("stopwatch");
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    
    function updateCalendar() {
        datesElement.innerHTML = "";
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        monthYearElement.textContent = `${months[currentMonth]} ${currentYear}`;
        
        for (let i = 0; i < firstDay; i++) {
            datesElement.innerHTML += `<div class="date"></div>`;
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dateClass = (i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) ? 'date today' : 'date';
            datesElement.innerHTML += `<div class="${dateClass}">${i}</div>`;
        }
    }
    
    window.prevMonth = function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    }
    
    window.nextMonth = function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    }
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    setInterval(updateClock, 1000);
    updateClock();
    updateCalendar();
    
    let stopwatchInterval;
    let stopwatchStartTime;
    let elapsedTime = 0;
    
    window.startStopwatch = function() {
        if (!stopwatchInterval) {
            stopwatchStartTime = Date.now() - elapsedTime;
            stopwatchInterval = setInterval(updateStopwatch, 10);
        }
    }
    
    window.stopStopwatch = function() {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
    
    window.resetStopwatch = function() {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        elapsedTime = 0;
        stopwatchElement.textContent = "00:00:00.000";
    }
    
    function updateStopwatch() {
        elapsedTime = Date.now() - stopwatchStartTime;
        const milliseconds = String(elapsedTime % 1000).padStart(3, '0');
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        stopwatchElement.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
});
