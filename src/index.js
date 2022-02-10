const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokeContainer = document.querySelector('.pokemon-container');
const generateBtn = document.getElementById('gen-btn');
const audioElement = document.getElementById('audioElement');
let answerField;
let initialClick = false;
let pokemon;
let pokemonList = [];
let answer;

async function pokemonLoaded() {
	const res = await fetch(url + '?limit=898');
	const data = await res.json();
	data.results.map((pokemonObj) => {
		pokemonList.push(pokemonObj.name);
	});
	console.log(pokemonList);
	main();
}

pokemonLoaded();

function main() {
	generateBtn.addEventListener('click', () => {
		if (!initialClick) {
			initialClick = true;
			audioElement.play();
		}
		fetchNewPokemon().then((pokemonObj) => {
			htmlHelper(pokemonObj);
			pokemon = pokemonObj;
		});
	});

	document.addEventListener('click', (e) => {
		if (e.target.id === 'answer-btn') {
			const choices = [...document.querySelectorAll('input.choice-i')];
			const givenAnswer = choices.filter((choice) => choice.checked);
			console.log(givenAnswer[0].value, pokemon.species.name);
			if (givenAnswer[0].value === pokemon.species.name) {
				console.log('correct!');
			} else {
				console.log('Incorrect!');
			}
			fetchNewPokemon().then((pokemonObj) => {
				htmlHelper(pokemonObj);
				pokemon = pokemonObj;
			});
		}
	});
}

const fetchNewPokemon = async () => {
	const randNum = Math.floor(Math.random() * 898).toString();

	const res = await fetch(url + randNum);
	const pokemonObj = await res.json();
	return pokemonObj;
};

const htmlHelper = (pokemon) => {
	const choices = randomizedChoices(pokemon);

	pokeContainer.innerHTML = `
        <h2>${pokemon.species.name}</h2>
        <img src=${pokemon.sprites.front_default} alt="" />
		<span class="choice">
			<label for="choice1">${choices[0]}</label>
        	<input name="answers" class="choice-i" id="choice1" type="radio" value=${choices[0]} />
			<label for="choice2">${choices[1]}</label>
        	<input name="answers" class="choice-i"  id="choice2" type="radio" value=${choices[1]} />
			<label for="choice3">${choices[2]}</label>
        	<input name="answers" class="choice-i" id="choice3" type="radio" value=${choices[2]} />
			<label for="choice4">${choices[3]}</label>
        	<input name="answers" class="choice-i" id="choice4" type="radio" value=${choices[3]} />
			<button type="button" id="answer-btn" class="btn btn-success">Submit</button> 
		</span>
    `;
};

const randomizedChoices = (pokemon) => {
	const pokemonChoices = [
		pokemonList[Math.floor(Math.random() * pokemonList.length - 1)],
		pokemonList[Math.floor(Math.random() * pokemonList.length - 1)],
		pokemonList[Math.floor(Math.random() * pokemonList.length - 1)],
	];
	pokemonChoices.splice(
		Math.floor(Math.random() * 3),
		0,
		pokemon.species.name
	);
	return pokemonChoices;
};
