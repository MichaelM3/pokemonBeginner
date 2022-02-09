const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokeContainer = document.querySelector('.pokemon-container');
const generateBtn = document.getElementById('gen-btn');
const audioElement = document.getElementById('audioElement');

generateBtn.addEventListener('click', () => {
	audioElement.play();
	fetchNewPokemon().then((pokemonObj) => {
		htmlHelper(pokemonObj);
	});
});

const fetchNewPokemon = async () => {
	const randNum = Math.floor(Math.random() * 898).toString();

	const res = await fetch(url + randNum);
	const pokemonObj = await res.json();
	return pokemonObj;
};

const htmlHelper = (pokemon) => {
	pokeContainer.innerHTML = `
        <h2>${pokemon.species.name}</h2>
        <img src=${pokemon.sprites.front_default} alt="" />
        <label for="guess-input">Guess here</label>
        <input id="guess-input" type="text" />
    `;
};
