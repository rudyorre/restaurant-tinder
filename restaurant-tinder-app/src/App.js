import logo from './logo.svg';
import './App.css';

function App() {
  // Sample fetch from the backend API
  fetch("http://localhost:3000/restaurants")
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
        document.getElementById("test").innerHTML = json;
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Restaurant Tinder Web App!
        </p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="test" style={{height:"200px", width:"1200px", wordWrap:"break-word", fontSize:"15px"}}></div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
