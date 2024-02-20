import Player from "./components/player.jsx";
import Gameboard from "./components/gameboard.jsx";

import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import Gameover from './components/gameover.jsx';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};


function deriveactivePlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
 return currentPlayer;
}

const initialGameboard = [
  [null,null ,null], 
  [null,null,null],
  [null,null,null]
  ];

  function derivegameBoard(gameTurns){
    let gameBoard = [...initialGameboard.map(Array => [...Array])];

    for (const turn of gameTurns){
        const {square,player} = turn;
        const {row,col} = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
  }

  function deriveWinner(gameBoard,players){
    let winner;

    for (const combination of WINNING_COMBINATIONS){
     const firstsquareSymbol = gameBoard[combination[0].row][combination[0].column];
     const secondsquareSymbol = gameBoard[combination[1].row][combination[1].column];
     const thirdsquareSymbol = gameBoard[combination[2].row][combination[2].column];
    
     if(firstsquareSymbol && firstsquareSymbol === secondsquareSymbol && firstsquareSymbol === thirdsquareSymbol){
       winner = players[firstsquareSymbol];
     }
   
   
   }
   return winner;
  }

function App() {
  // const[activePlayer,setactivePlayer]= useState('X');
  const [gameTurns,setgameTurns] = useState([]);
  // const [hasWinner,sethasWinner] = useState(false);

  const [players, setPlayers] = useState(PLAYERS);

   const activePlayer = deriveactivePlayer(gameTurns);

  const gameBoard = derivegameBoard(gameTurns);

  const winner = deriveWinner(gameBoard,players); 

  const hasDraw = gameTurns.length === 9 && !winner;



  function handleselectSquare(rowIndex,colIndex){
    // setactivePlayer((curactivePlayer)=>  curactivePlayer === 'X'? 'O':'X');
    setgameTurns(prevTurns => {
      const currentPlayer =deriveactivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns];

      return updatedTurns;
    });
  }

  function handleRestart(){
    setgameTurns([]);
  }

  function handlePlayernamechange(symbol,newName){
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer ==='X'} onChangeName={handlePlayernamechange}/>

          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer ==='O'} onChangeName={handlePlayernamechange}/>
          
        </ol>
        {(winner || hasDraw)&& <Gameover winner={winner} onRestart={handleRestart}/>}
        <Gameboard onSelectSquare={handleselectSquare} board={gameBoard}/>
       </div>

       <Log turns={gameTurns}/>
    </main>
  )
}

export default App
