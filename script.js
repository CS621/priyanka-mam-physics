// 10-Stage Progression System
function nextStage(currentStage, targetStage) {
    // Hide active stage
    const activeStage = document.getElementById(`stage${currentStage}`);
    if (activeStage) {
        activeStage.classList.remove('active');
    }

    // Show target stage
    const nextStageEl = document.getElementById(`stage${targetStage}`);
    if (nextStageEl) {
        nextStageEl.classList.add('active');
    }

    // Update Progress Bar (1 to 10 Stages)
    const progressBar = document.getElementById('progressBar');
    const percentage = (targetStage / 10) * 100;
    progressBar.style.width = `${percentage}%`;

    // Trigger Confetti on Stage 9 & 10
    if (targetStage === 9 || targetStage === 10) {
        triggerConfetti();
    }
}

// Stage 4: Lab Energy Slider (100% Force Sync)
function handleSlider(val) {
    const sliderValDisplay = document.getElementById('sliderVal');
    const stage4Btn = document.getElementById('stage4Btn');

    sliderValDisplay.innerText = `${val}%`;

    if (parseInt(val) === 100) {
        stage4Btn.classList.remove('locked');
        sliderValDisplay.innerText = `100% ⚡ MAX FORCE SYNCED!`;
    } else {
        stage4Btn.classList.add('locked');
    }
}

// Stage 5: Dodgy NO Button & Secret Override Hack
let noAttempts = 0;
const physicsHints = [
    "Opposing vector detected! Try YES! 😉",
    "Physics Law: NO button has infinite speed! 😜",
    "Gravitational pull is toward YES! 😂"
];

function dodgeNoBtn() {
    const noBtn = document.getElementById('noBtn');
    const dodgyHint = document.getElementById('dodgyHint');

    noAttempts++;

    // 3 attempts ke baad auto override logic
    if (noAttempts >= 3) {
        dodgyHint.innerHTML = "<b>Nice try Priyanka Mam!</b><br>Par Physics rule kehta hai aap 'NO' choose hi nahi kar sakti! Auto-switching to YES! ✨";
        noBtn.style.display = 'none';

        setTimeout(() => {
            nextStage(5, 6);
        }, 1800);
        return;
    }

    // Random dodge coordinates
    const x = (Math.random() * 140) - 70;
    const y = (Math.random() * 80) - 40;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
    dodgyHint.innerText = physicsHints[noAttempts - 1];
}

// Stage 6: Quiz Incorrect Option Handling
function wrongQuizChoice(btn) {
    const quizError = document.getElementById('quizError');
    quizError.innerText = "Wrong law! Real attraction force Priyanka Mam ki Physics class me hota hai! 😉";
    btn.style.opacity = '0.4';
    btn.style.pointerEvents = 'none';
}

// Multi-Burst Confetti Celebration Engine
function triggerConfetti() {
    // Initial Center Blast
    confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#00d2ff', '#ff007f', '#ffbe0b', '#ffffff']
    });

    // Left Burst
    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.7 },
            colors: ['#00d2ff', '#10b981', '#ff007f']
        });
    }, 250);

    // Right Burst
    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.7 },
            colors: ['#ffbe0b', '#ec4899', '#00d2ff']
        });
    }, 450);
}

// Reset Entire Experience
function restartExperience() {
    noAttempts = 0;
    const noBtn = document.getElementById('noBtn');
    const dodgyHint = document.getElementById('dodgyHint');
    const quizError = document.getElementById('quizError');

    if (noBtn) {
        noBtn.style.display = 'inline-flex';
        noBtn.style.transform = 'translate(0, 0)';
    }
    if (dodgyHint) dodgyHint.innerText = '';
    if (quizError) quizError.innerText = '';

    const slider = document.getElementById('energyRange');
    if (slider) {
        slider.value = 50;
        handleSlider(50);
    }

    nextStage(10, 1);
}
