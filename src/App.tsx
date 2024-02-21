import { useState } from "react";
import Grid from "./components/Grid";
import Explanation from "./components/Explanation";
import DifficultySelector from "./components/DifficultySelector";

const App = () => {
  const [difficultySelected, setDifficultySelected] = useState<boolean>(false);
  const [gridConfig, setGridConfig] = useState<{ numRows: number; numColumns: number; numMines: number }>();

  const handleSelectDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    let config = { numRows: 4, numColumns: 4, numMines: 5 }; // Default to 'easy'
    if (difficulty === "medium") {
      config = { numRows: 6, numColumns: 6, numMines: 10 };
    } else if (difficulty === "hard") {
      config = { numRows: 10, numColumns: 10, numMines: 15 };
    }
    setGridConfig(config);
    setDifficultySelected(true);
  };

  return (
    <div className="app">
      <h1>Minesweeper</h1>
      {!difficultySelected && <DifficultySelector onSelectDifficulty={handleSelectDifficulty} />}
      {difficultySelected && gridConfig && (
        <Grid
          numColumns={gridConfig.numColumns}
          numRows={gridConfig.numRows}
          numMines={gridConfig.numMines}
          restartGame={() => setDifficultySelected(false)}
        />
      )}
      <Explanation />
    </div>
  );
};

export default App;
