import { useState } from 'react';


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


function Square({ index, squareClick }) {

  return (
  <button className="square" onClick={squareClick}>
    {index}
  </button>
  );
}


function Board( {xIsNext, board, onBoard} ) {

  function  handleClick(i){
    if (board[i] || calculateWinner(board))
      return;
  
    const newBoard = board.slice();
    xIsNext? newBoard[i] = 'X': newBoard[i] = 'O';
    onBoard(newBoard);
  }

  const winner = calculateWinner(board);
  let status;

  if (winner)
    status = "Player " + winner + " is the Winner!";
  else
    status = "The next player is " + (xIsNext? 'X': 'O');

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square index={board[0]} squareClick={() => handleClick(0)}/>
        <Square index={board[1]} squareClick={() => handleClick(1)}/>
        <Square index={board[2]} squareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square index={board[3]} squareClick={() => handleClick(3)}/>
        <Square index={board[4]} squareClick={() => handleClick(4)}/>
        <Square index={board[5]} squareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square index={board[6]} squareClick={() => handleClick(6)}/>
        <Square index={board[7]} squareClick={() => handleClick(7)}/>
        <Square index={board[8]} squareClick={() => handleClick(8)}/>
      </div>

    </>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentBoard = history[currentMove];

  function handleBoard(nextSquares) {
    const newHistory = ([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(newHistory.length - 1);
    setHistory(newHistory);
    setXIsNext(!xIsNext);
  }

  function jumpTo(boardId){
    setCurrentMove(boardId);
    setXIsNext(boardId % 2 === 0);
  }

  const historyButton = history.map((board, id) =>{
    const description = id === 0? "Go to game start!": "Go to " + id + " move";
    return(
      <li key={id}>
        <button onClick={() => jumpTo(id)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} board={currentBoard} onBoard={handleBoard} />
      </div>
      <div className="game-moves">
        <ol>{historyButton}</ol>
      </div>
    </div>
  );
}