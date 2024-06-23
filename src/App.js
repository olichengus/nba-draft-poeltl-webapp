
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
function App() {
  const [poeltlPlayer, setPoeltlPlayer] = useState("");
  const [guessedPlayer, setGuessedPlayer] = useState("");
  const [hint, setHint] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [correctGuess, setCorrectGuess] = useState(false);

  function fetchPoeltlPlayer() {
      fetch('/api/get_poeltl_player').then(res=>
          res.json()).then(
              data=>{
             console.log(data);
             setPoeltlPlayer(data.name);
             setHint(data.college);
         }
      )
      console.log("Finished Fetch");
  }

  function handleGuess(){
      fetch('/api/guess_player', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              player_name: guessedPlayer,
              poeltl_name: poeltlPlayer
          })
        }).then(
          res => res.json().then(
              data=>{
                  const guess = data.data;
                  const result = data.result;
                  if (typeof guess === 'string'){
                      return ;
                  } else {
                      setGuesses(guesses => [...guesses, guess]);
                    result === 'wrong' ? setCorrectGuess(false): setCorrectGuess(true)
                  }
              }
          ))
  }

  useEffect(()=> {
      console.log("Fetching Player")
      fetchPoeltlPlayer()
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Poeltl player is {poeltlPlayer} from {hint}
        </p>
      </header>
        <div>
        </div>
    </div>
  );
}

export default App;
