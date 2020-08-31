'use strict';

const winningPairs = new Set(['01','12','13','14','20','23','30','34','40','42']);
const optLeftHandedPlayerSymbols = '.lhp';
const optWonScoreValue = '.won-number';
const optTiedScoreValue = '.tied-number';
const optLostScoreValue = '.lost-number';
const lhpSymbols = document.querySelectorAll(optLeftHandedPlayerSymbols);

function throwDice(faces)
{
	return Math.floor(Math.random() * faces);
}

function getOppositeMove()
{
	const drawMap = new Map([[0, 0], [1, 0], [2, 0], [3, 1], [4, 1], [5, 1], [6, 2], [7, 3], [8, 4]]);
	return drawMap.get(throwDice(9));
}

function chosenSymbolsHandler(symbol)
{
	/* Disable EventListener */
	const clickedSymbol = this;
	console.log('this=: ', clickedSymbol);
	const yourChoice = clickedSymbol.getAttribute('value')
	const yourSymbolID = 'lhp-' + yourChoice;
	const opponentChoice = getOppositeMove();
	const opponentSymbolID = 'rhp-' + opponentChoice;
	const resultID = yourChoice.toString().concat(opponentChoice);
	const gameResult = getGameResult(resultID);
	console.log('gameResult: ', gameResult);
	updateScore(gameResult);

	console.log('resultID: ', resultID)
	console.log('Your move: ', yourSymbolID)
	console.log('Opposite player\'s move: ', opponentSymbolID);
	/*for(let lhpSymbol of lhpSymbols)
	{
  		lhpSymbol.removeEventListener('click', function(){console.log(lhpSymbol.getAttribute('value'), ' was disabled')});
	}*/

	/* Enable EventListener */
	/*for(let lhpSymbol of lhpSymbols)
	{
  		lhpSymbol.addEventListener('click', chosenSymbolsHandler(lhpSymbol.getAttribute('value')));
	}*/
}

function updateScore(result)
{
	const wonScoreValue = document.querySelector(optWonScoreValue);
	const tiedScoreValue = document.querySelector(optTiedScoreValue);
	const lostScoreValue = document.querySelector(optLostScoreValue);
	let wonScoreHTML = parseInt(wonScoreValue.innerHTML);
	let tiedScoreHTML = parseInt(tiedScoreValue.innerHTML);
	let lostScoreHTML = parseInt(lostScoreValue.innerHTML);
	
	console.log('result: ', result);

	if (result == 'won')
	{
		wonScoreValue.innerHTML = wonScoreHTML + 1;
	}
	else if (result == 'tied')
	{
		tiedScoreValue.innerHTML = tiedScoreHTML + 1;
	}
	else if (result == 'lost')
	{
		lostScoreValue.innerHTML = lostScoreHTML + 1;
	}
	else
	{
		wonScoreValue.innerHTML = 0;
		tiedScoreValue.innerHTML = 0;
		lostScoreValue.innerHTML = 0;
	}
}

function getGameResult(resultID)
{
	if (winningPairs.has(resultID))
	{
		return 'won';
	}
	else if (resultID.substring(0,1) == resultID.substring(1,2))
	{	
		console.log(resultID.substring(0,1));
		console.log(resultID.substring(1,2));
		return 'tied';
	}
	else
	{
		return 'lost';
	}
}

	for(let lhpSymbol of lhpSymbols)
	{
  		lhpSymbol.addEventListener('click', chosenSymbolsHandler);
	}