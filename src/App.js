
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {Button, Grid, GridItem, HStack} from "@chakra-ui/react";
import {ReactNode} from "react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

const GREY = 'grey';
const GREEN = 'green-500';
const YELLOW = 'yellow'

function App() {
  const [poeltlPlayer, setPoeltlPlayer] = useState("");
  const [guessedPlayer, setGuessedPlayer] = useState("");
  const [hint, setHint] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [options, setOptions] = useState([]);

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
      console.log("Handling Guess");
      console.log(guessedPlayer);
      console.log(poeltlPlayer);
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
                  console.log("data fetched");
                  const guess = data.data;
                  const result = data.result;
                  if (typeof guess === 'string'){
                      return ;
                  } else {
                      setGuesses(guesses => [...guesses, guess]);
                      result === 'wrong' ? setGameFinished(false): setGameFinished(true)
                  }
              }
          ))
  }

  useEffect(()=> {
      console.log("Fetching Player")
      fetchPoeltlPlayer()
  },[]);


  useEffect(()=> {
        console.log("Fetching Available Guesses");
        if (guessedPlayer.length > 2) {
            fetchPlayerOptions(guessedPlayer);
        }
    },[guessedPlayer]);

    function fetchPlayerOptions(player_search){
        return fetch(`/api/get_players?player_full_name=${player_search}`)
            .then(res => res.json())
            .then(data => {
                setOptions(data.data);
            });
        }


  function renderGuesses(): ReactNode{
      return(
          <GridItem>{JSON.stringify(guesses)}</GridItem>
      );
  }


  return (
    <div className="App">
      <header className="App-header">
        <p>
          Poeltl player is {poeltlPlayer} from {hint}
        </p>
          <HStack>
              <AutoComplete color="black" openOnFocus>
                  <AutoCompleteInput variant="filled" />
                  <AutoCompleteList>
                      {options.map((option) => (
                          <AutoCompleteItem
                              key={option}
                              value={option}
                              textTransform="capitalize"
                          >
                              {option}
                          </AutoCompleteItem>
                      ))}
                  </AutoCompleteList>
              </AutoComplete>
              <Button>Guess</Button>
          </HStack>
      </header>
        <Grid color='blue'>
            {renderGuesses()}
        </Grid>
    </div>
  );
}

export default App;
