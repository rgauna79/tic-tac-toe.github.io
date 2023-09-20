import {useState} from "react";
import './App.css'
import confetti from "canvas-confetti";
import {Square} from './components/Square'
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)  
    return Array(9).fill(null)
})
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  //null no winner, false is draw
  const [winner, setWinner] = useState(null); 
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  
  const updateBoard = (index) => {
      //check if square has a value
      if (board[index] || winner) return
      //update board
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      //change turn
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn)
      //SAVE game
      window.localStorage.setItem('board', JSON.stringify(newBoard))
      window.localStorage.setItem('turn',turn)
      //check if winner
      const newWinner = checkWinnerFrom(newBoard)
      if (newWinner){
        confetti()
        setWinner(newWinner)
      } else if (checkEndGame(newBoard)){
        setWinner(false)
      }
  }

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
      {
        board.map((square,index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {square}
            </Square>
          )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>

    </main>
  )
}

export default App
