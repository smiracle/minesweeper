interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ onSelectDifficulty }) => {
  return (
    <div>
      <h3>Select Difficulty:</h3>
      <button onClick={() => onSelectDifficulty("easy")}>Easy</button>
      <button onClick={() => onSelectDifficulty("medium")}>Medium</button>
      <button onClick={() => onSelectDifficulty("hard")}>Hard</button>
    </div>
  );
};

export default DifficultySelector;
