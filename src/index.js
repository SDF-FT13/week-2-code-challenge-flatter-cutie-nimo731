
let allCharacters = [];
let currentCharacter = null;


document.addEventListener('DOMContentLoaded', () => {
 
  const characterBar = document.getElementById('character-bar');
  const detailedInfo = document.getElementById('detailed-info');
  const nameEl = document.getElementById('name');
  const imageEl = document.getElementById('image');
  const voteCountEl = document.getElementById('vote-count');
  const votesForm = document.getElementById('votes-form');
  const resetBtn = document.getElementById('reset-btn');

 
  init();

  
  votesForm.addEventListener('submit', handleVoteSubmit);


  resetBtn.addEventListener('click', handleResetVotes);
});


async function init() {
  try {
    const characters = await fetchCharacters();
    allCharacters = characters;
    displayCharacters(characters);
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}


async function fetchCharacters() {
  const response = await fetch('http://localhost:3000/characters');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}


function displayCharacters(characters) {
  const characterBar = document.getElementById('character-bar');
  characterBar.innerHTML = '';

  characters.forEach(character => {
    const span = document.createElement('span');
    span.textContent = character.name;
    span.dataset.id = character.id;

    span.addEventListener('click', () => displayCharacterDetails(character));

    characterBar.appendChild(span);
  });
}

function displayCharacterDetails(character) {
  currentCharacter = character;

  const nameEl = document.getElementById('name');
  const imageEl = document.getElementById('image');
  const voteCountEl = document.getElementById('vote-count');

  nameEl.textContent = character.name;
  imageEl.src = character.image;
  imageEl.alt = character.name;
  voteCountEl.textContent = character.votes;
}


function handleVoteSubmit(event) {
  event.preventDefault();
  const votesInput = document.getElementById('votes');
  const votes = parseInt(votesInput.value);

  if (currentCharacter && !isNaN(votes)) {
    currentCharacter.votes += votes;
    updateVoteDisplay();
    votesForm.reset();
  }
}


function handleResetVotes() {
  if (currentCharacter) {
    currentCharacter.votes = 0;
    updateVoteDisplay();
  }
}


function updateVoteDisplay() {
  const voteCountEl = document.getElementById('vote-count');
  voteCountEl.textContent = currentCharacter.votes;
}
