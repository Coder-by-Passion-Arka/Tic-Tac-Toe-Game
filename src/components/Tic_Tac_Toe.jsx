import React, { useState } from 'react'
import '../index.css'
import react_svg from './assets/react.svg'

export default function Tic_Tac_Toe() {
  let initialData = ["", "", "", "", "", "", "", "", ""];
  let [data, setData] = useState(initialData);
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);

  const handleResetButton = () => {
    setData(initialData);
    setCount(0);
    setLock(false);
    document.querySelectorAll('.boxes').forEach(box => {
      box.innerHTML = "";
      box.classList.remove('mark');
      box.classList.remove('lock');
    });
  }

  function mark(index, winType) {
    if (winType === "Row") {
      if (index === 0) {
        document.querySelectorAll('.row1 .boxes').forEach(box => box.classList.add('mark'));
      } else if (index === 3) {
        document.querySelectorAll('.row2 .boxes').forEach(box => box.classList.add('mark'));
      } else if (index === 6) {
        document.querySelectorAll('.row3 .boxes').forEach(box => box.classList.add('mark'));
      } else {
        console.log("Wrong Condition for Row win");
      }
    } else if (winType === "Column") {
      if (index === 0) {
        document.querySelectorAll('.column_1').forEach(box => box.classList.add('mark'));
      } else if (index === 1) {
        document.querySelectorAll('.column_2').forEach(box => box.classList.add('mark'));
      } else if (index === 2) {
        document.querySelectorAll('.column_3').forEach(box => box.classList.add('mark'));
      } else {
        console.log("Wrong Condition for Column win");
      }
    } else if (winType === "Diagonal") {
      if (index === 0) {
        document.querySelectorAll('.diagonal_1').forEach(box => box.classList.add('mark'));
      } else if (index === 2) {
        document.querySelectorAll('.diagonal_2').forEach(box => box.classList.add('mark'));
      } else {
        console.log("Wrong Condition for Diagonal Win");
      }
    }
  }

  const won = (winner) => {
    if (winner === "o")
      console.log("Winner is O");
    else if (winner === "x")
      console.log("Winner is X");
    setLock(true);
  }

  const checkWin = (data) => {
    console.log([...data]);
    // Row-Wise Check Condition
    for (let boxIndex = 0; boxIndex < 9; boxIndex += 3) {
      if (data[boxIndex] === data[boxIndex + 1] && data[boxIndex + 1] === data[boxIndex + 2] && data[boxIndex] !== "") {
        mark(boxIndex, "Row");
        won(data[boxIndex]);
        return;
      }
    }

    // Column-Wise Check Condition
    for (let boxIndex = 0; boxIndex < 3; boxIndex++) {
      if (data[boxIndex] === data[boxIndex + 3] && data[boxIndex + 3] === data[boxIndex + 6] && data[boxIndex] !== "") {
        mark(boxIndex, "Column");
        won(data[boxIndex]);
        return;
      }
    }

    // Diagonal Check Condition
    let a = data[0] === data[4] && data[4] === data[8] && data[0] !== "";
    let b = data[2] === data[4] && data[4] === data[6] && data[2] !== "";
    if (a || b) {
      a ? mark(0, "Diagonal") : mark(2, "Diagonal");
      won(data[4]);
      return;
    }

    // Check for draw
    if (data.every(cell => cell !== "")) {
      const board = document.querySelectorAll(".boxes");
      board.forEach(box => {box.classList.add('lock')});
    }
  }

  const toggle = (event, boxIndex) => {
    if (lock || data[boxIndex] !== "") return;

    const newData = [...data];
    if (count % 2 === 0) {
      event.target.innerHTML = `<i class="fa-solid fa-xmark fa-4x"></i>`;
      newData[boxIndex] = "x";
      console.log(`Cross has been entered ${[...newData]}`);
    } else {
      event.target.innerHTML = `<i class="fa-regular fa-circle fa-3x"></i>`;
      newData[boxIndex] = "o";
      console.log(`Circle has been entered ${[...newData]}`);
    }

    setData(newData);
    setCount(prevCount => prevCount + 1);

    // Check if a Player has Won or not
    checkWin(newData);
  }

  return (
    <div className="container">
      <h1 className="title">
        <span className='title-span'>
          Tic-Tac-Toe in <span className='React-span'>React</span> <img src={react_svg} className="react_logo" alt="React logo" />
        </span>
      </h1>

      {/* Start of Board */}
      <div className="board">
        {/* Start of Row-1 */}
        <div className="row1">
          <div className="boxes diagonal_1 column_1" onClick={(event) => toggle(event, 0)}></div>
          <div className="boxes column_2" onClick={(event) => toggle(event, 1)}></div>
          <div className="boxes diagonal_2 column_3" onClick={(event) => toggle(event, 2)}></div>
        </div>
        {/* End of Row-1 */}
        {/* Start of Row-2 */}
        <div className="row2">
          <div className="boxes column_1" onClick={(event) => toggle(event, 3)}></div>
          <div className="boxes diagonal_1 diagonal_2 column_2" onClick={(event) => toggle(event, 4)}></div>
          <div className="boxes column_3" onClick={(event) => toggle(event, 5)}></div>
        </div>
        {/* End of Row-2 */}
        {/* Start of Row-3 */}
        <div className="row3">
          <div className="boxes diagonal_2 column_1" onClick={(event) => toggle(event, 6)}></div>
          <div className="boxes column_2" onClick={(event) => toggle(event, 7)}></div>
          <div className="boxes diagonal_1 column_3" onClick={(event) => toggle(event, 8)}></div>
        </div>
        {/* End of Row-3 */}
      </div>
      {/* End of Board */}

      {/* Start of btn-container */}
      <div className="btn-container">
        <button className="reset btn btn-glow" onClick={handleResetButton}>Reset</button>
      </div>
      {/* End of btn-container */}
    </div>
  )
}
