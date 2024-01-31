import { useEffect, useState } from "react";
import Grid from "./components/Grid";

export class Cell {
  index: number;
  isMined: boolean;
  isCovered: boolean;
  isFlagged: boolean;
  neighbors: Array<number>;
  minedNeighborCount: number;

  constructor(index: number, numColumns: number, numRows: number) {
    this.index = index;
    this.isMined = false;
    this.isFlagged = false;
    this.isCovered = true;
    this.neighbors = this.getNeighbors(numColumns, numRows);
    this.minedNeighborCount = 0;
  }

  getNeighbors = (numColumns: number, numRows: number) => {
    const row = Math.floor(this.index / numColumns);
    const col = this.index % numColumns;
    const neighbors: Array<number> = [];

    const positions = [
      { r: -1, c: -1 },
      { r: -1, c: 0 },
      { r: -1, c: 1 },
      { r: 0, c: -1 },
      { r: 0, c: 1 },
      { r: 1, c: -1 },
      { r: 1, c: 0 },
      { r: 1, c: 1 },
    ];

    positions.forEach(({ r, c }) => {
      const newRow = row + r;
      const newCol = col + c;
      if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numColumns) {
        neighbors.push(newRow * numColumns + newCol);
      }
    });
    return neighbors;
  };
}

const getMinedNeighborCount = (cellToExamine: Cell, cells: Cell[]) => {
  let count = 0;
  cellToExamine.neighbors.forEach((neighborIndex) => {
    if (cells[neighborIndex] && cells[neighborIndex].isMined) {
      count++;
    }
  });
  return count;
};

const App = () => {
  const [numRows] = useState(5);
  const [numColumns] = useState(5);
  const [numMines] = useState(5);
  const [cells, setCells] = useState<Cell[]>([]);
  const setupGrid = (cells: Array<Cell>, numMines: number) => {
    const minedCells = [...cells];
    const indicesToMine = new Set<number>();
    while (indicesToMine.size !== numMines) {
      indicesToMine.add(Math.floor(Math.random() * cells.length));
    }
    const arrOfMinedIndices = Array.from(indicesToMine);
    for (let i = 0; i < arrOfMinedIndices.length; i++) {
      let indexToMine: number = arrOfMinedIndices[i];
      minedCells[indexToMine] = { ...cells[indexToMine], isMined: true };
    }
    for (let i = 0; i < minedCells.length; i++) {
      const count = getMinedNeighborCount(minedCells[i], minedCells);
      minedCells[i].minedNeighborCount = count;
    }
    setCells(minedCells);
  };
  const restartGame = () => {
    setCells([]);

    const cellArr: Cell[] = [];
    for (let i = 0; i < numColumns * numRows; i++) {
      cellArr.push(new Cell(i, numColumns, numRows));
    }
    setupGrid(cellArr, numMines);
  };
  useEffect(() => {
    restartGame();
  }, [numMines]);

  return (
    <div className="app">
      <Grid numColumns={numColumns} cells={cells} restartGame={restartGame} />
    </div>
  );
};

export default App;
