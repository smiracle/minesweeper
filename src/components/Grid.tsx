import React, { useEffect, useState } from "react";
import flag from "../images/flag.svg";
import mine from "../images/mine.svg";
import Cell from "./Cell";

interface GridProps {
  numColumns: number;
  numRows: number;
  numMines: number;
  restartGame: () => void;
}

const Grid: React.FC<GridProps> = ({ numColumns, numRows, numMines, restartGame }) => {
  const [cells, setCells] = useState<Cell[]>([]);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [isWin, setWin] = useState<boolean>(false);

  useEffect(() => {
    const initializeCells = (): Cell[] => {
      let newCells: Cell[] = [];
      for (let i = 0; i < numRows * numColumns; i++) {
        newCells.push(new Cell(i, numColumns, numRows));
      }

      let minesPlaced = 0;
      while (minesPlaced < numMines) {
        const randomIndex = Math.floor(Math.random() * newCells.length);
        if (!newCells[randomIndex].isMined) {
          newCells[randomIndex].isMined = true;
          minesPlaced++;
        }
      }

      newCells.forEach((cell) => {
        cell.neighbors.forEach((neighborIndex) => {
          if (newCells[neighborIndex] && newCells[neighborIndex].isMined) {
            cell.minedNeighborCount++;
          }
        });
      });

      return newCells;
    };

    setCells(initializeCells());
  }, [numColumns, numRows, numMines]);

  const uncoverRecursive = (cellIndex: number, cellData: Cell[], visitedIndices: Set<number>) => {
    const cell = cellData[cellIndex];
    if (!cell || cell.isMined || cell.isFlagged || visitedIndices.has(cellIndex)) {
      return;
    }

    cell.isCovered = false;
    visitedIndices.add(cellIndex);

    if (cell.minedNeighborCount === 0) {
      cell.neighbors.forEach((neighborIndex) => {
        uncoverRecursive(neighborIndex, cellData, visitedIndices);
      });
    }
  };

  const checkForWin = () => {
    const win = cells.every((cell) => !cell.isCovered || cell.isFlagged);
    return win;
  };

  const handleClick = (clickedCell: Cell) => {
    if (isGameOver || isWin) {
      return;
    }
    // Create a shallow copy of cells
    const newCells = [...cells];
    const visitedIndices = new Set<number>();
    if (clickedCell.isMined) {
      newCells[clickedCell.index].isCovered = false;
      setGameOver(true);
      setWin(false);
    } else {
      uncoverRecursive(clickedCell.index, newCells, visitedIndices);
    }
    setWin(checkForWin());
    // Update the state with the new cell data after recursion
    setCells(newCells);
  };

  const handleRightClick = (event: React.MouseEvent<HTMLLIElement>, rightClickedCell: Cell) => {
    event.preventDefault();
    if (!isWin && !isGameOver) {
      const newCells = [...cells];
      if (newCells[rightClickedCell.index].isCovered) {
        newCells[rightClickedCell.index].isFlagged = !newCells[rightClickedCell.index].isFlagged;
      }
      setWin(checkForWin());
      setCells(newCells);
    }
  };

  const chunkIntoRows = (numColumns: number): Cell[][] => {
    const rows: Cell[][] = [];
    for (let i = 0; i < cells.length; i += numColumns) {
      rows.push(cells.slice(i, i + numColumns));
    }
    return rows;
  };

  const rows = chunkIntoRows(numColumns);
  const getCellClassName = (cell: Cell) => {
    if (!cell.isCovered) {
      if (cell.isMined) {
        return "cell mine-selected";
      }
      return "cell selected";
    }
    return "cell";
  };

  return (
    <div className="grid">
      {rows.map((row, rowIndex) => (
        <ul className="row" key={rowIndex}>
          {row.map((cell) => (
            <li
              key={cell.index}
              className={getCellClassName(cell)}
              onClick={() => handleClick(cells[cell.index])}
              onContextMenu={(e) => handleRightClick(e, cells[cell.index])}
            >
              {!cell.isCovered &&
                (cell.isMined ? <img src={mine} alt="mine" className="gridImage" /> : cell.minedNeighborCount)}
              {cell.isCovered && cell.isFlagged ? <img src={flag} alt="flag" className="gridImage" /> : ""}
            </li>
          ))}
        </ul>
      ))}
      {(isGameOver || isWin) && (
        <>
          <p>{isGameOver ? "Game Over" : "Victory!"}</p>
          <button
            onClick={() => {
              setGameOver(false);
              setWin(false);
              restartGame();
            }}
          >
            {isGameOver ? "Try Again" : "Play Again"}
          </button>
        </>
      )}
    </div>
  );
};

export default Grid;
