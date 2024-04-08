document.addEventListener('DOMContentLoaded', function () {
  const addPlayerBtn = document.getElementById('addPlayerBtn');
  const resetScoresBtn = document.getElementById('resetScoresBtn');
  const resetAllBtn = document.getElementById('resetAllBtn');
  const playersContainer = document.getElementById('playersContainer');

  let playersData = localStorage.getItem('playersData');
  playersData = playersData ? JSON.parse(playersData) : [];

  function updateLocalStorage() {
    localStorage.setItem('playersData', JSON.stringify(playersData));
  }

  function renderPlayers() {
    playersContainer.innerHTML = '';
    playersData.forEach((player) => {
      const playerElement = document.createElement('div');
      playerElement.classList.add('player');

      const playerName = document.createElement('div');
      playerName.classList.add('player-name');
      playerName.textContent = player.name;
      playerElement.appendChild(playerName);

      const playerScore = document.createElement('div');
      playerScore.classList.add('player-score');
      playerScore.textContent = `Счёт: ${player.score}`;
      playerElement.appendChild(playerScore);

      const playerButtons = document.createElement('div');
      playerButtons.classList.add('player-buttons');

      const addScoreBtn = document.createElement('button');
      addScoreBtn.textContent = '+ очков';
      addScoreBtn.addEventListener('click', () => {
        const score = prompt('Введите число:');
        if (score !== null && !isNaN(score)) {
          player.score += parseInt(score);
          playerScore.textContent = `Счёт: ${player.score}`;
          updateLocalStorage();
        }
      });
      playerButtons.appendChild(addScoreBtn);

      const subtractScoreBtn = document.createElement('button');
      subtractScoreBtn.textContent = '- очков';
      subtractScoreBtn.addEventListener('click', () => {
        const score = prompt('Введите число:');
        if (score !== null && !isNaN(score)) {
          player.score -= parseInt(score);
          playerScore.textContent = `Счёт: ${player.score}`;
          updateLocalStorage();
        }
      });
      playerButtons.appendChild(subtractScoreBtn);

      playerElement.appendChild(playerButtons);

      playersContainer.appendChild(playerElement);
    });
  }

  addPlayerBtn.addEventListener('click', () => {
    const playerName = prompt('Введите имя:');
    if (playerName !== null && playerName.trim() !== '') {
      const player = { name: playerName, score: 0 };
      playersData.push(player);
      renderPlayers();
      updateLocalStorage();
    }
  });

  resetScoresBtn.addEventListener('click', () => {
    playersData.forEach((player) => {
      player.score = 0;
    });
    renderPlayers();
    updateLocalStorage();
  });

  resetAllBtn.addEventListener('click', () => {
    playersData = [];
    localStorage.removeItem('playersData');
    renderPlayers();
  });

  renderPlayers();
});
