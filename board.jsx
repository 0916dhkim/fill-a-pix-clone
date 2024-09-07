import { useEffect, useState } from "react";
import "./board.css";
import { Cell } from "./cell";

const GAME = [
  [null, 2, 3, null, null, 0, null, null, null, null],
  [null, null, null, null, 3, null, 2, null, null, 6],
  [null, null, 5, null, 5, 3, null, 5, 7, 4],
  [null, 4, null, 5, null, 5, null, 6, null, 3],
  [null, null, 4, null, 5, null, 6, null, null, 3],
  [null, null, null, 2, null, 5, null, null, null, null],
  [4, null, 1, null, null, null, 1, 1, null, null],
  [4, null, 1, null, null, null, 1, null, 4, null],
  [null, null, null, null, 6, null, null, null, null, 4],
  [null, 4, 4, null, null, null, null, 4, null, null],
];

export function Board() {
  const [cellStates, setCellStates] = useState(Array(100).fill("clear"));
  const [message, setMessage] = useState(null);

  const updateCellState = (i, value) => {
    const copy = [...cellStates];
    copy[i] = value;
    setCellStates(copy);
  };

  const checkGameOver = () => {
    const flatGame = GAME.flat();
    for (let i = 0; i < 100; i++) {
      if (flatGame[i] != null) {
        const targetCount = flatGame[i];
        let filledCellCount = 0;
        for (
          let rowIndex = Math.floor(i / 10) - 1;
          rowIndex <= Math.floor(i / 10) + 1;
          rowIndex++
        ) {
          for (
            let columnIndex = (i % 10) - 1;
            columnIndex <= (i % 10) + 1;
            columnIndex++
          ) {
            if (rowIndex < 0 || rowIndex >= 10) {
              // skip
            } else if (columnIndex < 0 || columnIndex >= 10) {
              // skip
            } else {
              const cellIndex = rowIndex * 10 + columnIndex;
              if (cellStates[cellIndex] === "filled") {
                filledCellCount++;
              }
            }
          }
        }
        if (targetCount !== filledCellCount) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    let hasClearCell = false;
    for (const cell of cellStates) {
      if (cell === "clear") {
        hasClearCell = true;
        break;
      }
    }

    if (!hasClearCell) {
      if (checkGameOver()) {
        setMessage("You won");
      } else {
        setMessage("You got something wrong");
      }
    }
  }, [cellStates]);

  const handleClick = (i) => {
    if (cellStates[i] === "clear") {
      updateCellState(i, "filled");
    } else if (cellStates[i] === "filled") {
      updateCellState(i, "crossed");
    } else {
      updateCellState(i, "clear");
    }
  };

  return (
    <div>
      <div class="board">
        {GAME.flat().map((value, i) => (
          <Cell
            key={i}
            index={i}
            number={value}
            status={cellStates[i]}
            onClick={handleClick}
          />
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
}
