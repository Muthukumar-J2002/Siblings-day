// Moving Button (Troll Game)
function moveButton() {
    let btn = document.getElementById("trollBtn");

    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

// Fake Download Troll
function fakeDownload() {
    alert("😂 Virus downloading... Just kidding!");
}

// Mood Detector (Funny AI)
function checkMood() {
    let mood = document.getElementById("mood").value.toLowerCase();

    let result = "";

    if (mood.includes("sad")) {
        result = "Eat biryani 🍗 you'll be fine 😂";
    } else if (mood.includes("angry")) {
        result = "Go shout at your brother 😈";
    } else if (mood.includes("happy")) {
        result = "Suspicious... why are you happy? 🤨";
    } else {
        result = "Mood not found... like your brain 🤣";
    }

    document.getElementById("moodResult").innerText = result;
}