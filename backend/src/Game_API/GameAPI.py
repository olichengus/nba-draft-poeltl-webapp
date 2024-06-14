from nba_api.stats.endpoints import playerindex
from nba_api.stats.endpoints import drafthistory
from src.Player import Player


# given draft year, draft round and draft pick returns the team that made that pick
def get_draft_team(y, r, p):
    draft = drafthistory.DraftHistory(league_id="00", season_year_nullable=y, round_num_nullable=r,
                                      overall_pick_nullable=p).get_data_frames()[0]
    return draft["TEAM_NAME"]


class GameAPI:
    def __init__(self):
        # calls API once and gets all necessary players
        self.players = playerindex.PlayerIndex(league_id="00", season="2023").get_data_frames()[0]

    # returns a random player from specific draft class
    def get_player_from_draft_year(self, draft_year):
        years_df = self.players[self.players["DRAFT_YEAR"] == draft_year]
        player_selection = years_df.sample()
        p_id = player_selection[0]["PERSON_ID"]
        p_round = player_selection[0]["DRAFT_ROUND"]
        p_pick = player_selection[0]["DRAFT_NUMBER"]
        p_college = player_selection[0]["COLLEGE"]
        p_pos = player_selection[0]["POSITION"]
        p_team = get_draft_team(draft_year, p_round, p_pick)
        return Player(p_id, draft_year, p_round, p_pick, p_team, p_college, p_pos)

    # returns player given player_id
    def make_player(self, player_id):
        player_df = self.players[self.players["PERSON_ID"] == player_id]
        p_draft_year = player_df[0]["DRAFT_YEAR"]
        p_round = player_df[0]["DRAFT_ROUND"]
        p_pick = player_df[0]["DRAFT_NUMBER"]
        p_college = player_df[0]["COLLEGE"]
        p_pos = player_df[0]["POSITION"]
        p_team = get_draft_team(p_draft_year, p_round, p_pick)
        return Player(player_id,p_draft_year,p_round,p_pick,p_college,p_pos,p_team)
