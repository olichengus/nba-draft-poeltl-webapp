
class Player:
    def __init__(self, ids, d_year, d_round, d_pick, d_team, d_college, d_pos):
        self.id = ids  # Int: unique player id
        self.d_year = d_year  # Int: draft year
        self.d_round = d_round  # Int: draft round
        self.d_pick = d_pick  # Int: draft pick
        self.d_team = d_team  # String: team name that drafted player
        self.d_college = d_college # String: College where player is from
        self.pos = d_pos  # String: Position the player plays

    def get_id(self):
        return self.id

    def get_d_year(self):
        return self.d_year

    def get_d_round(self):
        return self.d_round

    def get_d_pick(self):
        return self.d_pick

    def get_d_team(self):
        return self.d_team

    # compares players and returns a guess score

