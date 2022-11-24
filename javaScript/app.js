import Pagination from "./pagination.js";
function App({ $target }) {
  const arrayLength = 100;
  const arrayMaker = (arrayLength) => {
    const array = [];
    for (let i = 1; i <= arrayLength; i++) {
      array.push(i);
    }
    return array;
  };

  const pagination = new Pagination({
    $target,
    initialState: arrayMaker(arrayLength),
  });
}

export default App;
