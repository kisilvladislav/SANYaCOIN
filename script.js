document.addEventListener('DOMContentLoaded', () => {
    let username = '';
    let coins = 0;
    let energy = 100;
    let maxEnergy = 100;
    let clickValue = 1;
    let upgradeCost = 1000;
    let energyCost = 1000;

    const usernameInput = document.getElementById('username');
    const authButton = document.getElementById('authButton');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const coinsElement = document.getElementById('coins');
    const energyElement = document.getElementById('energy');
    const maxEnergyElement = document.getElementById('maxEnergy');
    const coin = document.getElementById('coin');
    const upgradeButton = document.getElementById('upgradeButton');
    const energyButton = document.getElementById('energyButton');
    const upgradeCostElement = document.getElementById('upgradeCost');
    const energyCostElement = document.getElementById('energyCost');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const clickSound = new Audio('sounds/click.mp3');
    const upgradeSound = new Audio('sounds/upgrade.mp3');

    function playBackgroundMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.log('Background music play error:', error);
            });
        }
    }

    function playSound(audio) {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.log('Sound play error:', error);
        });
    }

    function updateDisplay() {
        usernameDisplay.textContent = username;
        coinsElement.textContent = coins;
        energyElement.textContent = energy;
        maxEnergyElement.textContent = maxEnergy;
        upgradeCostElement.textContent = upgradeCost;
        energyCostElement.textContent = energyCost;
    }

    function animateCoin() {
        const coinClone = document.createElement('img');
        coinClone.src = 'coin.png';
        coinClone.classList.add('coin-fly');
        const coinRect = coin.getBoundingClientRect();
        coinClone.style.left = `${coinRect.left + window.scrollX}px`;
        coinClone.style.top = `${coinRect.top + window.scrollY}px`;
        document.body.appendChild(coinClone);
        coinClone.addEventListener('animationend', () => {
            coinClone.remove();
        });
    }

    function animateGhostCoin() {
        const ghostCoin = document.createElement('img');
        ghostCoin.src = 'coin.png';
        ghostCoin.id = 'coinGhost';
        const coinRect = coin.getBoundingClientRect();
        ghostCoin.style.width = `${coinRect.width}px`;
        ghostCoin.style.height = `${coinRect.height}px`;
        ghostCoin.style.left = `${coinRect.left + window.scrollX}px`;
        ghostCoin.style.top = `${coinRect.top + window.scrollY}px`;
        document.body.appendChild(ghostCoin);
        setTimeout(() => {
            ghostCoin.remove();
        }, 2000);
    }

    coin.addEventListener('click', () => {
        playSound(clickSound.cloneNode(true));
        if (energy > 0) {
            coins += clickValue;
            energy -= 1;
            animateCoin();
            animateGhostCoin();
            updateDisplay();
        } else {
            alert('Недостатньо енергії!');
        }
    });

    upgradeButton.addEventListener('click', () => {
        if (coins >= upgradeCost) {
            coins -= upgradeCost;
            clickValue += 1;
            upgradeCost *= 2;
            playSound(upgradeSound.cloneNode(true));
            updateDisplay();
        } else {
            alert('Недостатньо монет!');
        }
    });

    energyButton.addEventListener('click', () => {
        if (coins >= energyCost) {
            coins -= energyCost;
            maxEnergy += 50;
            energyCost *= 2;
            playSound(upgradeSound.cloneNode(true));
            updateDisplay();
        } else {
            alert('Недостатньо монет!');
        }
    });

    setInterval(() => {
        if (energy < maxEnergy) {
            energy += 1;
            updateDisplay();
        }
    }, 1000);

    authButton.addEventListener('click', () => {
        username = usernameInput.value;
        if (username) {
            localStorage.setItem('username', username);
            localStorage.setItem('coins', coins);
            localStorage.setItem('energy', energy);
            localStorage.setItem('maxEnergy', maxEnergy);
            localStorage.setItem('clickValue', clickValue);
            localStorage.setItem('upgradeCost', upgradeCost);
            localStorage.setItem('energyCost', energyCost);
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            playBackgroundMusic();
            updateDisplay();
        } else {
            alert('Будь ласка, введіть ваше ім\'я');
        }
    });

    function loadGame() {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            username = storedUsername;
            coins = parseInt(localStorage.getItem('coins')) || coins;
            energy = parseInt(localStorage.getItem('energy')) || energy;
            maxEnergy = parseInt(localStorage.getItem('maxEnergy')) || maxEnergy;
            clickValue = parseInt(localStorage.getItem('clickValue')) || clickValue;
            upgradeCost = parseInt(localStorage.getItem('upgradeCost')) || upgradeCost;
            energyCost = parseInt(localStorage.getItem('energyCost')) || energyCost;
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            playBackgroundMusic();
            updateDisplay();
        }
    }

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('coins', coins);
        localStorage.setItem('energy', energy);
        localStorage.setItem('maxEnergy', maxEnergy);
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('upgradeCost', upgradeCost);
        localStorage.setItem('energyCost', energyCost);
    });

    loadGame();
    updateDisplay();
});
