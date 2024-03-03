import { useState } from "react";

import Player from "./comonents/player";
import GameBoard from "./comonents/GameBoard";
import TurnLog from "./comonents/TurnLog";
import GameOverScreen from "./comonents/GameOverScreen";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {X : "Player 1", O : "Player 2"};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
}

function derivedWinner(gameBoard, playerNames) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = playerNames[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(row => [...row])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, playerNames);
  const isDraw = !winner && gameTurns.length === 9;

  function restartGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames(prevNames => { return { ...prevNames, [symbol]: newName }; });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    //set the array representing the turns log to be:
    //a copy of itself, but insert as a first element this last move; which player played what square
    setGameTurns(prevGameTurns => {
      const currentPlayer = derivedActivePlayer(prevGameTurns);
      const updatedGameTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevGameTurns];

      return updatedGameTurns;
    });
  }
  //NOTE!
  //its recommanded to pass an object, array, etc to a useState by value, not by reference.
  //this is because passing it by reference, i.e. passing a pointer to the object
  //causes the state to change even before react handles the state update.
  //so for example here we used the spread operator "..." to make a copy of prevGameTurns and changes IT,
  //instead of directly changing prevGameTurns.
  //(we also would have done the same for any nested arrays)

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || isDraw) && <GameOverScreen winner={winner} onRestart={restartGame} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <TurnLog turns={gameTurns} />
    </main>
  )
}

export default App
