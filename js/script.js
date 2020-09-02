'use strict';

const winningPairs = new Set(['01','12','13','14','20','23','30','34','40','42']);
const optLeftHandedPlayerSymbols = '.lhp';
const optResetGameButton = '.reset'
const optWonScoreValue = '.won-number';
const optTiedScoreValue = '.tied-number';
const optLostScoreValue = '.lost-number';
const optChosenSymbols = '.chosen'
const optWonToken = '.won';
const optLostToken = '.lost';
const optTiedToken = '.tied';
const optWonRecently = '.recently-won';
const optLostRecently = '.recently-lost';
const optTiedRecently = '.recently-tied';
const optSymbols = '.board>.btn'
const optDisableToken = '.disable'
const lhpSymbols = document.querySelectorAll(optLeftHandedPlayerSymbols);
const resetGameButton = document.querySelector(optResetGameButton);

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
	console.log('resultID: ', resultID)
	console.log('Your move: ', yourSymbolID)
	console.log('Opposite player\'s move: ', opponentSymbolID);

	unmarkLastStatus();
	disableSymbols();
	turnonChosenSymbols(yourSymbolID, opponentSymbolID);
	setTimeout(function(){turnonResultFlags(yourSymbolID, opponentSymbolID, gameResult)}, 1000);
	setTimeout(function(){turnoffResultFlags()}, 2000);
	setTimeout(function(){turnoffChosenSymbols()}, 2000);
	setTimeout(enableSymbols, 2000);
	setTimeout(function(){updateScore(gameResult)}, 2000);
	setTimeout(function(){markLastStatus(yourSymbolID, opponentSymbolID, gameResult)}, 2000);
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

	if (result == optWonToken.substring(1))
	{
		wonScoreValue.innerHTML = wonScoreHTML + 1;
	}
	else if (result == optTiedToken.substring(1))
	{
		tiedScoreValue.innerHTML = tiedScoreHTML + 1;
	}
	else if (result == optLostToken.substring(1))
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

function turnoffChosenSymbols()
{
	const chosenSymbols = document.querySelectorAll(optChosenSymbols);
	for(let chosenSymbol of chosenSymbols)
	{
		console.log('class to remove: ', optChosenSymbols.substring(1));
		chosenSymbol.classList.remove(optChosenSymbols.substring(1));
	}
}

function turnonResultFlags(yourSymbol, opponentSymbol, result)
{
	const yourSymbolID = document.getElementById(yourSymbol);
	const opponentSymbolID = document.getElementById(opponentSymbol);
	if (result == optWonToken.substring(1))
	{
		yourSymbolID.classList.add(optWonToken.substring(1));
		opponentSymbolID.classList.add(optLostToken.substring(1));
	}
	else if (result == optLostToken.substring(1))
	{
		yourSymbolID.classList.add(optLostToken.substring(1));
		opponentSymbolID.classList.add(optWonToken.substring(1));		
	}
	else
	{
		yourSymbolID.classList.add(optTiedToken.substring(1));
		opponentSymbolID.classList.add(optTiedToken.substring(1));	
	}

}

function turnoffResultFlags()
{
	const symbols = document.querySelectorAll(optSymbols);
	for(let symbol of symbols)
	{
		symbol.classList.remove(optWonToken.substring(1));
		symbol.classList.remove(optLostToken.substring(1));
		symbol.classList.remove(optTiedToken.substring(1));
	}
}

function turnonChosenSymbols(yourSymbol, opponentSymbol)
{
	const yourSymbolID = document.getElementById(yourSymbol);
	const opponentSymbolID = document.getElementById(opponentSymbol);
	yourSymbolID.classList.add(optChosenSymbols.substring(1));
	opponentSymbolID.classList.add(optChosenSymbols.substring(1));
}

function disableSymbols()
{
	const symbols = document.querySelectorAll(optSymbols);
	for(let symbol of symbols)
	{
		symbol.classList.add(optDisableToken.substring(1));
	}
}

function enableSymbols()
{
	const symbols = document.querySelectorAll(optSymbols);
	for(let symbol of symbols)
	{
		symbol.classList.remove(optDisableToken.substring(1));
	}
}

function markLastStatus(yourSymbol, opponentSymbol, result)
{
	const yourSymbolID = document.getElementById(yourSymbol);
	const opponentSymbolID = document.getElementById(opponentSymbol);
	if (result == optWonToken.substring(1))
	{
		yourSymbolID.classList.add(optWonRecently.substring(1));
		opponentSymbolID.classList.add(optLostRecently.substring(1));
	}
	else if (result == optLostToken.substring(1))
	{
		yourSymbolID.classList.add(optLostRecently.substring(1));
		opponentSymbolID.classList.add(optWonRecently.substring(1));		
	}
	else
	{
		yourSymbolID.classList.add(optTiedRecently.substring(1));
		opponentSymbolID.classList.add(optTiedRecently.substring(1));	
	}
}

function unmarkLastStatus()
{
	const symbols = document.querySelectorAll(optSymbols);
	for(let symbol of symbols)
	{
		symbol.classList.remove(optWonRecently.substring(1));
		symbol.classList.remove(optLostRecently.substring(1));
		symbol.classList.remove(optTiedRecently.substring(1));
	}
}

function resetGame()
{
	console.log('END MATCH was clicked');
	unmarkLastStatus();
	turnoffResultFlags();
	turnoffChosenSymbols();
	enableSymbols();
	updateScore();
}

	for(let lhpSymbol of lhpSymbols)
	{
  		lhpSymbol.addEventListener('click', chosenSymbolsHandler);
	}
	resetGameButton.addEventListener('click', resetGame);

	for(let lhpSymbol of lhpSymbols)
	{
  		lhpSymbol.addEventListener('touchstart', chosenSymbolsHandler);
	}
	resetGameButton.addEventListener('touchstart', resetGame);