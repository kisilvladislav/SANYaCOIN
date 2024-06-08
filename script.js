document.addEventListener('DOMContentLoaded', () => {
    let coins = 0;
    let energy = 100;
    let clickValue = 1;
    let upgradeCost = 10;
    let energyCost = 5;
    let level = 1;

    const coinsElement = document.getElementById('coins');
    const energyElement = document.getElementById('energy');
    const coin = document.getElementById('coin');
    const upgradeButton = document.getElementById('upgradeButton');
    const energyButton = document.getElementById('energyButton');
    const upgradeCostElement = document.getElementById('upgradeCost');
    const energyCostElement = document.getElementById('energyCost');
    const levelElement = document.getElementById('level');

    const clickSound = { src: 'sounds/click.mp3' };
    const upgradeSound = { src: 'sounds/upgrade.mp3' };

    function updateDisplay() {
        coinsElement.textContent = coins;
        energyElement.textContent = energy;
        upgradeCostElement.textContent = upgradeCost;
        energyCostElement.textContent = energyCost;
        levelElement.textContent = level;
    }

    function animateCoin() {
        const coinClone = document.createElement('img');
        coinClone.src = 'coin.png';
        coinClone.classList.add('coin-fly');
        coinClone.style.left = `${coin.offsetLeft}px`;
        coinClone.style.top = `${coin.offsetTop}px`;
        document.body.appendChild(coinClone);
        coinClone.addEventListener('animationend', () => {
            coinClone.remove();
        });
    }

    function animateGhostCoin() {
        const ghostCoin = document.createElement('div');
        ghostCoin.id = 'coinGhost';
        ghostCoin.style.left = `${coin.offsetLeft}px`;
        ghostCoin.style.top = `${coin.offsetTop}px`;
        document.body.appendChild(ghostCoin);
        setTimeout(() => {
            ghostCoin.remove();
        }, 2000);
    }

    function playSound(audio) {
        const newAudio = new Audio(audio.src);
        newAudio.play();
    }

    coin.addEventListener('click', () => {
        playSound(clickSound);
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
            energyCost *= 2; 
            level += 1;
            energy += level * 10; 
            playSound(upgradeSound);
            updateDisplay();
        } else {
            alert('Недостатньо монет!');
        }
    });

    energyButton.addEventListener('click', () => {
        if (coins >= energyCost) {
            coins -= energyCost;
            energy = 100;
            updateDisplay();
        } else {
            alert('Недостатньо монет!');
        }
    });

    setInterval(() => {
        if (energy < level * 10) {
            energy += 1;
            updateDisplay();
        }
    }, 1000);

    updateDisplay();
});
