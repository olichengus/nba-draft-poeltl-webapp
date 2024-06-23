from nba_api.stats.static import players
import random
from backend.src.GuessScore import GuessScore
from backend.src.Game_API.GameAPI import GameAPI
from backend.src.Player import Player


class GamePlatform:
    def __init__(self):
        self.gameAPI = GameAPI()
        self.availableYears = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
        self.poeltlPlayer = None
        self.round = 0
        self.answerPlayers = []
        self.guessScore = GuessScore()

    # finds new Poeltl player
    def set_new_player(self):
        # maybe use try block here
        draft_year = random.choice(self.availableYears)
        self.poeltlPlayer = self.gameAPI.get_player_from_draft_year(draft_year)

    def get_poeltl_player_id(self):
        if self.poeltlPlayer is not None:
            return self.poeltlPlayer.id

    def get_poeltl_player_college(self):
        if self.poeltlPlayer is not None:
            return self.poeltlPlayer.d_college

    def get_poeltl_player_name(self):
        player_name = players.find_player_by_id(self.poeltlPlayer.id)
        return player_name["full_name"]

    # receives player name and returns dict of GuessScore Results
    def submit_answer(self, player_name, poeltl_name):
        try:
            guess_player = self.make_player_full_name(player_name)
            poeltl_player = self.make_player_full_name(poeltl_name)
            # if not isinstance(self.poeltlPlayer, Player):
            #     return "No Poeltl Player"
            #     # raise Exception("No player to guess")
            # # make player by id
            res = self.guessScore.get_scores(poeltl_player, guess_player)
            player_dict = guess_player.get_player_dict()
            merge_res = {**res, **player_dict}
            return merge_res
        except Exception as e:
            print(e)
            return "Error occurred"

    # resets game for another round of guessing
    def reset_game(self):
        self.set_new_player()
        self.answerPlayers = []
        self.round = 0

    def make_player_full_name(self, player_name):
        player_search = players.find_players_by_full_name(player_name)
        if player_search == [] or len(player_search) < 1 or player_search[0]["is_active"] is False:
            raise Exception("No specific player found")
        player_id = player_search[0]["id"]
        return self.gameAPI.make_player(player_id)

