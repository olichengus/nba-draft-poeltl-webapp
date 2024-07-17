
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {Button , HStack, VStack} from "@chakra-ui/react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import PickSelection from './pick-selection/PickSelection';
import { render } from '@testing-library/react';

const GREY = 'grey';
const GREEN = 'green-500';
const YELLOW = 'yellow'

function App() {
  const [poeltlPlayer, setPoeltlPlayer] = useState("");
  const [guessedPlayer, setGuessedPlayer] = useState("");
  const [hint, setHint] = useState("");
  const [selected, setSelected] = useState("");                                                                                                     
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
    if (selected !== ""){
        fetch('/api/guess_player', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                player_name: selected,
                poeltl_name: poeltlPlayer
            })
          }).then(
            res => res.json().then(
                data=>{
                    console.log("data fetched");
                    console.log(data);
                    const guess = data.data;
                    const result = data.result;
                    let player_name;
                    if (typeof guess === 'string'){
                        return ;
                    } else if (result === 'wrong'){
                        player_name = {
                            value: selected,
                            score: "GREY"
                        }
                        setGameFinished(false)
                    } else {
                        player_name = {
                            value: selected,
                            score: "GREEN"
                        };
                         setGameFinished(true)
                    }
                    guess['player_name'] = player_name;
                    setGuesses(guesses => [...guesses, guess]);
                }
            ));
    }
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
    

    function renderGuesses(){
        return guesses.map((guess, index) => {
            return (
                <PickSelection pickNumber={index + 1} guess={guess} />
            );
        });
    }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Poeltl player is {poeltlPlayer} from {hint}
        </p>
          <HStack>
              <AutoComplete color="black" openOnFocus onSelectOption={(params) => {
                console.log(params);
                setSelected(params.item.value)}}>
                  <AutoCompleteInput color="black" variant="filled" onChange={(event) => {setGuessedPlayer(event.target.value)}} />
                  <AutoCompleteList color="black">
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
              <Button onClick={handleGuess}>Guess</Button>
          </HStack>
      </header>
      <div className='App-body'>
        <div>
            <VStack spacing={4}>
                {renderGuesses()}
            </VStack>

        </div>
        </div>
    </div>
  );
}

export default App;
