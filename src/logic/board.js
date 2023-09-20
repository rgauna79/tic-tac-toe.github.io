import { WINNER_COMBOS } from "../constants.js"


export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    //if no winner
    return null
  }

export const checkEndGame = (newBoard) => {
    //if all positions square in newBoard are different to null
    return newBoard.every((square) => square !== null)
  }