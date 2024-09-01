# NBA POELTL: Draft Edition
This is a personal project based on the popular NBA guessing game NBA Poeltl: https://poeltl.nbpa.com/. Instead of guessing based on Conferences and Positions, you can guess based on draft pick, round, and year. 

# How it works
The player has 8 guesses to guess the mystery player. Each time, they are returned with hints about the player's attributes. In total, there are 5 attributes to guess: Draft year, round, pick, position, pre-NBA team, and drafted team. 

# Ongoing Improvements
* Implement the standard Wordle game model: One chance to play per day, a universal player to guess, and a reset for the next day.
* Have several hints that the user can access at any time such as current team, pre-NBA team, and similar players from draft class.
* Have better attribute hints for team and position. Have a yellow indicator for if the player has played on it, and if the position is close in proximity to the guessed position.

# Technical Details
I used the classic Create React App to create a one-page UI, as well as Chakra UI and Autocomplete to handle the guessing mechanisms. Each guest is handled by the Python Flask Server that implements Restful APIs.
