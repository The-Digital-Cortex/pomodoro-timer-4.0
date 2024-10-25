let focusTime = 25; // Default focus time in minutes
let shortBreakTime = 5; // Default short break time in minutes
let longBreakTime = 15; // Default long break time in minutes
let timer; // Timer variable
let isRunning = false; // Timer state
let timeRemaining; // Time remaining in seconds

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const settingsModal = document.getElementById("settingsModal");
const saveSettingsButton = document.getElementById("saveSettings");
const closeModal = document.getElementById("closeModal");

// Load settings from localStorage if they exist
function loadSettings() {
    const savedFocusTime = localStorage.getItem("focusTime");
    const savedShortBreak = localStorage.getItem("shortBreakTime");
    const savedLongBreak = localStorage.getItem("longBreakTime");
    const savedFontColor = localStorage.getItem("fontColor");
    const savedBackgroundColor = localStorage.getItem("backgroundColor");

    if (savedFocusTime) focusTime = parseInt(savedFocusTime);
    if (savedShortBreak) shortBreakTime = parseInt(savedShortBreak);
    if (savedLongBreak) longBreakTime = parseInt(savedLongBreak);
    if (savedFontColor) document.body.style.color = savedFontColor; // Apply to body text
    if (savedBackgroundColor) {
        document.body.style.backgroundColor = savedBackgroundColor; // Change background color
        document.body.style.borderColor = savedBackgroundColor; // Change border color to match background
    }

    updateTimerDisplay(focusTime, 0); // Update display with loaded settings
}

// Event listeners for preset buttons
document.getElementById("focusOption").addEventListener("click", () => {
    timeRemaining = focusTime * 60; // Set time for focus
    updateTimerDisplay(focusTime, 0); // Update display
});

document.getElementById("shortBreakOption").addEventListener("click", () => {
    timeRemaining = shortBreakTime * 60; // Set time for short break
    updateTimerDisplay(shortBreakTime, 0); // Update display
});

document.getElementById("longBreakOption").addEventListener("click", () => {
    timeRemaining = longBreakTime * 60; // Set time for long break
    updateTimerDisplay(longBreakTime, 0); // Update display
});

// Start button functionality
document.getElementById("start").addEventListener("click", () => {
    if (!isRunning && timeRemaining > 0) {
        startTimer();
    }
});

// Reset button functionality
document.getElementById("reset").addEventListener("click", () => {
    resetTimer();
});

// Open settings modal
document.getElementById("settings").addEventListener("click", () => {
    settingsModal.style.display = "block";
});

// Close settings modal
closeModal.addEventListener("click", () => {
    settingsModal.style.display = "none";
});

// Save settings when the save button is clicked
saveSettingsButton.addEventListener("click", () => {
    // Update time values from input fields
    focusTime = parseInt(document.getElementById("focusTime").value) || focusTime;
    shortBreakTime = parseInt(document.getElementById("shortBreak").value) || shortBreakTime;
    longBreakTime = parseInt(document.getElementById("longBreak").value) || longBreakTime;

    // Save settings to localStorage
    localStorage.setItem("focusTime", focusTime);
    localStorage.setItem("shortBreakTime", shortBreakTime);
    localStorage.setItem("longBreakTime", longBreakTime);

    // Update display when saving settings
    updateTimerDisplay(focusTime, 0);
    settingsModal.style.display = "none"; // Hide settings modal

    // Update the color settings
    const fontColor = document.getElementById("fontColor").value;
    const backgroundColor = document.getElementById("backgroundColor").value;

    document.body.style.color = fontColor; // Change font color of the body
    document.body.style.backgroundColor = backgroundColor; // Change background color

    // Save color settings to localStorage
    localStorage.setItem("fontColor", fontColor);
    localStorage.setItem("backgroundColor", backgroundColor);
});

// Timer function
function startTimer() {
    if (timeRemaining <= 0) return; // Prevent starting if no time left
    isRunning = true;

    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Time's up!");
            return;
        }
        timeRemaining--; // Decrease remaining time
        updateTimerDisplay(Math.floor(timeRemaining / 60), timeRemaining % 60); // Update display
    }, 1000);
}

// Update timer display
function updateTimerDisplay(minutes, seconds) {
    minutesDisplay.textContent = String(minutes).padStart(2, '0'); // Format minutes
    secondsDisplay.textContent = String(seconds).padStart(2, '0'); // Format seconds
}

// Reset timer function
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = focusTime * 60; // Reset to focus time
    updateTimerDisplay(focusTime, 0); // Update display
}

// Load settings on page load
window.onload = loadSettings;
