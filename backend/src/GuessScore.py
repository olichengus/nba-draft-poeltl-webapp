from enum import Enum
from src.Player import Player


class Direction(Enum):
    UP = 1
    DOWN = -1


class Status(Enum):
    GREY = -1
    YELLOW = 0
    GREEN = 1


class GuessScore:
    def __init__(self):
        self.year_dir = None
        self.year_score = None
        self.round_score = None
        self.pick_score = None
        self.pick_dir = None
        self.col_score = None
        self.pos_score = None
        self.team_score = None

    def get_scores(self, player1, player2):
        if not isinstance(player1,Player) or not isinstance(player2,Player):
            raise Exception("a player is missing")
        if player1.id == player2.id:
            self.green_everything()
        else:
            self.calculate_year_scores(player1.d_year, player2.d_year)
            self.calculate_round_scores(player1.d_round, player2.d_round)
            self.calculate_pick_scores(player1.d_pick, player2.d_pick)
            self.calculate_col_scores(player1.d_college, player2.d_college)
            self.calculate_pos_scores(player1.pos, player2.pos)
            self.calculate_team_scores(player1.d_team, player2.d_team)
        return self.make_result_dict()

    def make_result_dict(self):
        ret = {'year_score': self.year_score, 'year_dir': self.year_dir, 'round_score': self.round_score,
               'pick_score': self.pick_score, 'pick_dir': self.pick_dir, 'col_score': self.col_score,
               'pos_score': self.pos_score, 'team_score': self.team_score}
        return ret

    def green_everything(self):
        self.year_score = Status.GREEN
        self.round_score = Status.GREEN
        self.pick_score = Status.GREEN
        self.col_score = Status.GREEN
        self.pos_score = Status.GREEN
        self.team_score = Status.GREEN

    # if year is within 3 then yellow
    # 1 is always Poeltl player and 2 is guess
    def calculate_year_scores(self, d_year1, d_year2):
        if d_year1 == d_year2:
            self.year_score = Status.GREEN
        else:
            if d_year1 > d_year2:
                self.year_dir = Direction.UP
            elif d_year1 < d_year2:
                self.year_dir = Direction.DOWN
            dif = abs(d_year1 - d_year2)
            if dif <= 3:
                self.year_score = Status.YELLOW
            else:
                self.year_score = Status.GREY

    def calculate_round_scores(self, round1, round2):
        if round1 == round2:
            self.round_score = Status.GREEN
        else:
            self.round_score = Status.GREY

    def calculate_pick_scores(self, p1, p2):
        if p1 == p2:
            self.pick_score = Status.GREEN
        else:
            if p1 > p2:
                self.pick_dir = Direction.UP
            elif p1 < p2:
                self.pick_dir = Direction.DOWN
            dif = abs(p1 - p2)
            if dif <= 10:
                self.pick_score = Status.YELLOW
            else:
                self.pick_score = Status.GREY
        return True

    def calculate_col_scores(self, col1, col2):
        if col1 == col2:
            self.col_score = Status.GREEN
        else:
            self.col_score = Status.GREY

    def calculate_pos_scores(self, pos1, pos2):
        if pos1 == pos2:
            self.pos_score = Status.GREEN
        else:
            self.pos_score = Status.GREY

    def calculate_team_scores(self, team1, team2):
        if team1 == team2:
            self.team_score = Status.GREEN
        else:
            self.team_score = Status.GREY
        return True



