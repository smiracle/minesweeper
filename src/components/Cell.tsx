class Cell {
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

export default Cell;
