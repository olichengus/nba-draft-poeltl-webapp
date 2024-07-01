import string
from webbrowser import get
from src.GamePlatform import GamePlatform
from backend.src.Game_API.GameAPI import GameAPI
from backend.src.GamePlatform import find_lists_of_players_full_name
from flask import Flask, request, jsonify

app = Flask(__name__)
api = GameAPI()
game = GamePlatform()


@app.route('/get_players', methods=['GET'])
def get_players():
    if request.method == 'GET':
        player_full_name = request.args.get('player_full_name')
        res = find_lists_of_players_full_name(player_full_name)
        res_active = [x for x in res if x["is_active"]]
        res_full_names = [active_player['full_name'] for active_player in res_active]
        return jsonify({
            "data": res_full_names
        }), 200


@app.route('/guess_player', methods=['POST'])
def guess_player():
    if request.method == 'POST':
        data = request.get_json()
        player_name = data['player_name']
        poeltl_name = data['poeltl_name']
        res = game.submit_answer(player_name, poeltl_name)
        if isinstance(res, str):
            return jsonify({
                "data": res
            })
        return jsonify({
            "result": res['result'],
            "data": {
                "year": {
                    "value": res["d_year"],
                    "score": res["year_score"].name,
                    "dir": res["year_dir"].name,
                },
                "round": {
                    "value": res["d_round"],
                    "score": res["round_score"].name,
                },
                "pick": {
                    "value": res["d_pick"],
                    "score": res["pick_score"].name,
                    "dir": res["pick_dir"].name,
                },
                "college": {
                    "value": res["d_college"],
                    "score": res["col_score"].name,
                },
                "team": {
                    "value": res["d_team"],
                    "score": res["team_score"].name,
                },
                "position": {
                    "value": res["pos"],
                    "score": res["pos_score"].name
                }
            }
        })


@app.route('/get_poeltl_player', methods=['GET'])
def get_poeltl_player():
    game.set_new_player()
    name = game.get_poeltl_player_name()
    college = game.get_poeltl_player_college()
    return jsonify({
        "name": name,
        "college": college,
    }), 200


def guess_player_2(player_name):
    res = game.submit_answer(player_name)
    print(res)
    return "Guessing player"


# Run the app
if __name__ == '__main__':
    app.run(debug=True, port=8080)
