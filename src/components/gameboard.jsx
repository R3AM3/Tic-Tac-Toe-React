import { useState } from "react";



export default function Gameboard({onSelectSquare, board}){

    
     
    // const [gameBoard,setgameBoard] = useState(initialGameboard);

    // function handleselectSquare(rowIndex,colIndex,){
    //     setgameBoard((prevgameBoard)=>{
    //         const updatedBoard = [...prevgameBoard.map(innerArray => [...innerArray])]
    //         updatedBoard[rowIndex][colIndex] = activeplayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }
    return(
        <ol id="game-board">
           {board.map((row, rowIndex)=> <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol,colIndex) => <li key={colIndex}><button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li>)}
            </ol>
           </li>)}
        </ol>
    );
}