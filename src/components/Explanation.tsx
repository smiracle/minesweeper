const Explanation = () => {
  return (
    <div className="explanation">
      <h3>Explanation:</h3>
      <p>Left click on cells to reveal the number of surrounding mines</p>
      <p>Don't click on mines, or it's game over</p>
      <p>Right click on cells to flag them as potentially mined</p>
      <p>Safely flag all of the mines to win</p>
    </div>
  );
};
export default Explanation;
