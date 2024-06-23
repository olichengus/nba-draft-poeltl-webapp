import unittest
from enum import Enum
from backend.src.GuessScore import Status, Direction, GuessScore
from backend.src.Player import Player
from backend.src.GamePlatform import GamePlatform


class TestGuessScore(unittest.TestCase):
    def setUp(self):
        self.playerPoetl = Player(2544,2003,1,1,"Lakers","Akron","SF")
        self.game = GuessScore()

    def test_green_everything(self):
        test_player = Player(2544,2003,1,1,"Lakers","Akron","SF")
        res = self.game.get_scores(test_player, self.playerPoetl)
        self.assertEqual(res["year_score"], Status.GREEN)
        self.assertEqual(res['round_score'], Status.GREEN)
        self.assertEqual(res['pick_score'], Status.GREEN)
        self.assertEqual(res['col_score'], Status.GREEN)
        self.assertEqual(res['pos_score'], Status.GREEN)
        self.assertEqual(res['team_score'], Status.GREEN)

    def test_submit_answer(self):
        game = GamePlatform()
        game.set_new_player()
        test_player = "Jayson Tatum"
        res = game.submit_answer(test_player, "Lebron James")
        self.assertIsNotNone(res)

    def test_incorrect_guess(self):
        test_player = Player(2541, 2002,1,6,"Lakers","Kansas","SG")
        res = self.game.get_scores(self.playerPoetl, test_player)
        self.assertEqual(self.game.year_score, Status.YELLOW)
        self.assertEqual(self.game.round_score, Status.GREEN)
        self.assertEqual(self.game.pick_score, Status.YELLOW)
        self.assertEqual(self.game.team_score, Status.GREEN)
        self.assertEqual(self.game.col_score, Status.GREY)
        self.assertEqual(self.game.pos_score, Status.GREY)
        self.assertEqual(self.game.year_dir, Direction.UP)
        self.assertEqual(self.game.pick_dir, Direction.DOWN)

    def test_set_poetl_player(self):
        gamePlatform = GamePlatform()
        gamePlatform.set_new_player()
        self.assertIsNotNone(gamePlatform.poeltlPlayer)


if __name__ == '__main__':
    unittest.main()
