# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.

import pandas as pd
from nba_api.stats.endpoints import drafthistory
from nba_api.stats.endpoints import playerindex
from nba_api.stats.static import players
import random


# Anthony Davis

def print_hi(name):
    try:
        # just playing around with API
        draft_2023 = drafthistory.DraftHistory(league_id="00",season_year_nullable=2010,round_num_nullable=1,overall_pick_nullable=1).get_data_frames()[0]
        availableYears = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
        lakers = playerindex.PlayerIndex(league_id="00",season="2023")
        players_df = lakers.get_data_frames()[0]
        year = random.choice(availableYears)
        years_df = players_df[players_df["DRAFT_YEAR"] == year]
        player_selection = years_df.sample()
        lebron = players.find_players_by_full_name("Kevi Dur")
        print(lebron)
        print(player_selection)
        print(draft_2023["TEAM_NAME"])
        print("bruh")
    except Exception as e:
        print(f"An error occurred: {e}")



# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print_hi('PyCharm')

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
