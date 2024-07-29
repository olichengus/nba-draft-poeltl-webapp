
import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {Button , HStack, Modal, Alert, Text, ModalBody, ModalOverlay, ModalContent} from "@chakra-ui/react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import PickSelection from './pick-selection/PickSelection';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const TESTING = false;
  const NUM_ROUNDS = 8;
  const [poeltlPlayer, setPoeltlPlayer] = useState("");
  const [guessedPlayer, setGuessedPlayer] = useState("");
  const [guessDisabled, setGuessDisabled] = useState(true);
  const [round, setRound] = useState(0);
  const [won, setWon] = useState(false);
  const [hint, setHint] = useState("");
  const [selected, setSelected] = useState("");                                                                                                     
  const [guesses, setGuesses] = useState([]);
  const [options, setOptions] = useState([]);
  const [submitGuessLoading, setSubmitGuessLoading] = useState(false);

  function fetchPoeltlPlayer() {
      fetch('https://draft-poeltl-backend-production.up.railway.app/api/get_poeltl_player').then(res=>
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
        setSubmitGuessLoading(true);
        fetch('https://draft-poeltl-backend-production.up.railway.app/api/guess_player', {
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
                        toast.error(guess);
                        return ;
                    } else if (result === 'wrong'){
                        player_name = {
                            value: selected,
                            score: "GREY"
                        }
                        setRound(round + 1)
                    } else {
                        player_name = {
                            value: selected,
                            score: "GREEN"
                        };
                         setWon(true);
                         setRound(NUM_ROUNDS);
                    }
                    guess['player_name'] = player_name;
                    setGuesses(guesses => [...guesses, guess]);
                }
            )).finally(() => {
                setSubmitGuessLoading(false);
            });
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
        return fetch(`https://draft-poeltl-backend-production.up.railway.app/api/get_players?player_full_name=${player_search}`)
            .then(res => res.json())
            .then(data => {
                setOptions(data.data);
            });
        }
    

        function renderGuesses(){  
            return guesses.map((guess, index) => {  
                const column = Math.floor(index / 4) + 1; // increases after every 4 elements  
                const row = index % 4 + 1; // alternates between 1 and 4  
                
                return (  
                    <div style={{ gridColumn: `${column} / span 1`, gridRow: `${row} / span 1` }}>  
                    <PickSelection pickNumber={index+1} guess={guess} />  
                    </div>  
                );  
            });  
        }  

    function resetGame(){
        setGuesses([]);
        setRound(0);
        setWon(false);
        fetchPoeltlPlayer();
    }

  return (
    <div className="App">  
    <header className="App-header">
        <Toaster position='top-right'/>
        {TESTING && <p>{poeltlPlayer}</p>}  
        <p>  
            Guess the player based on draft stats!  
        </p>
        {round !== NUM_ROUNDS && 
            <div style={{zIndex: 1 }}>
                <HStack>  
                    <AutoComplete color="black" openOnFocus onSelectOption={(params) => {  
                        console.log(params);  
                        setGuessDisabled(false);  
                        setSelected(params.item.value)}}>  
                        <AutoCompleteInput color="black" variant="filled" onChange={(event) => {  
                            setGuessedPlayer(event.target.value)}} />  
                        <AutoCompleteList color="black"
                        >  
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
                    <Button isLoading={submitGuessLoading} onClick={handleGuess} isDisabled={guessDisabled}>Guess</Button>  
                </HStack>
            </div>}
        <div style={{   
            paddingTop: '25px',   
            zIndex: 0,   
            display: 'grid',   
            gridTemplateColumns: '1fr 1fr', // For 2 columns   
            gridTemplateRows: '1fr 1fr 1fr 1fr' // For 4 rows   
        }}>  
            {renderGuesses()}  
        </div>
        <div style={{zIndex: 2}}>
        <Modal isOpen={round === NUM_ROUNDS} isCentered style={{ width: '25%', height: '25%'}}>  
            <ModalOverlay />  
            <ModalContent   
                color="white"   
                backgroundColor="teal"   
                mx="auto"  
                display="flex"  
                justifyContent="center"   
                alignItems="center">  

                <ModalBody>  
                <Text textAlign="center" mb={4}>  
                    {won ? `Congrats! You successfully guessed ${poeltlPlayer}` : `Nice Try! The player was ${poeltlPlayer}`}  
                </Text>  

                <Button colorScheme="teal" onClick={()=> {resetGame()}}>  
                    Play Again  
                </Button>  
                </ModalBody>  
            </ModalContent>  
        </Modal>
        </div>    
    </header>  
    <div className='App-body'>  
    </div>
    </div>  
  );
}

export default App;
