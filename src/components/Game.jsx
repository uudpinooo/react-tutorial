import react, {useState} from 'react';
import { Board } from "./Board";

export const Game = () => {

  const [ history, setHistory ] = useState([{squares: Array(9).fill(null)}]);
  const [ stepNumber, setStepNumber ] = useState(0);
  const [ xIsNext, setXIsNext ] = useState(true);

  const handleClick = (i) => {
    const history = checkHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    const newHistory = history.concat([{squares: squares}]);
    const newStepNumber = history.length;
    const NewXIxNext = !xIsNext

    setHistory(newHistory);
    setStepNumber(newStepNumber);
    setXIsNext(NewXIxNext);
  }

  const jumpTo = (step) => {
    const newStepNumber = step;
    const NewXIxNext = (step % 2) === 0

    setStepNumber(newStepNumber);
    setXIsNext(NewXIxNext);
  }

  const checkHistory = history;
  const current = checkHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = checkHistory.map((step, move) => {
    const desc = move ?
      move + '番目に戻る' :
      'スタートに戻る';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
  });

  let status;
  if(winner) {
    status = 'Winner' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
