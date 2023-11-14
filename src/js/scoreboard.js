
document.addEventListener("DOMContentLoaded", function () {
    const scoreDisplay = document.getElementById("scoreDisplay");
    const scoreValue = document.getElementById("scoreValue");
    const score = document.getElementById("puntenCel");

    function updateScoreboard() {
        // Werk de score op het scorebord bij
        scoreValue.textContent = scorecounter;
        puntenCel.textContent = scorecounter;
    }
    updateScoreboard();
    document.addEventListener("scoreChanged", updateScoreboard);
});
