const CuisineSelect: React.FC<{
  cuisines: string[];
  onCuisineChangeHandler: () => {};
}> = ({ cuisines, onCuisineChangeHandler }) => {
  return (
    <>
      <label htmlFor="cuisine">Your cuisines: </label>
      <select id="cuisine" onChange={onCuisineChangeHandler}>
        <option defaultValue={'All'} value="All">
          All
        </option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </>
  );
};

export default CuisineSelect;
