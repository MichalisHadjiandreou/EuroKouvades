#Import the relevant packages
from flask import Flask, render_template, jsonify, send_from_directory
from datetime import datetime
import os
import requests
import ast
import requests_cache
import threading
import time

# Cache the responses for the next hour
requests_cache.install_cache('football_api_cache', backend='sqlite', expire_after=3600)  # Cache expires after 1 hour

# Define the players mappings
participant_team_mappings = ast.literal_eval(os.environ["MAPPINGS"])

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# Best team
@app.route('/dataBestTeam')
def dataBestTeam():
    
    # Define the specific date of the final
    specific_date = datetime(2024, 7, 14)  # Example: June 30, 2024

    # Get the current date
    current_date = datetime.now()
    
    # Check if the current date is before the final date
    if current_date.date() < specific_date.date():
        # No winner yet
        final_data = [
       { "name": 'TBC', "points": "" }
    ]
        # Add the code you want to execute here. TODO enhance
    else:
        winner_team = 'Sample team'
        final_data = [
       { "name": winner_team + " (" + participant_team_mappings[winner_team.lower()] +")", "points": "" }
    ]
    
    return final_data

@app.route('/health')
def health():
    return 'OK', 200
    
# Top scorer
@app.route('/dataTopScorer')
def dataTopScorer():
    top_scorers = get_top_scorers(api_key, 4, 2024)

    return top_scorers

# Most reds
@app.route('/dataMostReds')
def dataMostReds():
    most_reds = get_mostreds(api_key, 4, 2024)

    return most_reds

# Worst team
@app.route('/dataWorstTeam')
def dataWorstTeam():
    worst_team = get_worstteam(api_key, 4, 2024)
    return worst_team

# Next match
@app.route('/dataNextMatch')
def dataNextMatch():
    next_match = get_nextmatch(api_key, 4, 2024)
    return next_match

# Internal method for getting top scorer
def get_top_scorers(api_key, league_id, season):
    base_url = "https://api-football-v1.p.rapidapi.com/v3/"
    headers = {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
    }
    
    # URL to get the top scorers for the specified league and season
    top_scorers_url = f"{base_url}players/topscorers"
    params = {
        'league': league_id,
        'season': season
    }
    
    response = requests.get(top_scorers_url, headers=headers, params=params)
    data = response.json()
    
    if response.status_code != 200 or not data['response']:
        print("Error fetching top scorers data.")
        return None
    
    top_scorers = []
    max_goals = 0
    for scorer in data['response']:
        player_name = scorer['player']['name']
        player_country = scorer['statistics'][0]['team']['name']
        player_goals = scorer['statistics'][0]['goals']['total']
        if player_goals >= max_goals:
            max_goals = player_goals
            top_scorers.append({'name':player_name + " - " + player_country + " (" + participant_team_mappings[player_country.lower()] +")", 'points': player_goals})
        else:
            return top_scorers
    return top_scorers

#internal method for getting mostreds
def get_mostreds(api_key, league_id, season):
    base_url = "https://api-football-v1.p.rapidapi.com/v3/"
    headers = {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
    }
    
    # URL to get the top scorers for the specified league and season
    top_scorers_url = f"{base_url}players/topredcards"
    params = {
        'league': league_id,
        'season': season
    }
    
    response = requests.get(top_scorers_url, headers=headers, params=params)
    data = response.json()

    
    if response.status_code != 200 or not data['response']:
        print("Error fetching top scorers data.")
        return None
    
    top_reds = []
    max_reds = 0
    for indplayer in data['response']:
        player_name = indplayer['player']['name']
        player_country = indplayer['statistics'][0]['team']['name']
        player_reds = indplayer['statistics'][0]['cards']['red']
        player_yellowreds = indplayer['statistics'][0]['cards']['yellowred']
        total_reds = player_reds + player_yellowreds
        if total_reds >= max_reds:
            max_reds = total_reds
            top_reds.append({'name':player_name + " - " + player_country + " (" + participant_team_mappings[player_country.lower()] +")", 'points': total_reds})
        else:
            return top_reds
    return top_reds

#internal method for getting worst team
def get_worstteam(api_key, league_id, season):
    base_url = "https://api-football-v1.p.rapidapi.com/v3/"
    headers = {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
    }
    
    # URL to get the top scorers for the specified league and season
    top_scorers_url = f"{base_url}standings"
    params = {
        'league': league_id,
        'season': season
    }
    
    response = requests.get(top_scorers_url, headers=headers, params=params)
    data = response.json()

    
    if response.status_code != 200 or not data['response']:
        print("Error fetching top scorers data.")
        return None
    
    top_worst_teams = []
    least_points = 999999999999999999999
    least_goaldiff = 999999999999999999999
    for indGroup in data['response'][0]['league']['standings']:
        for indTeam in indGroup:
            team_name = indTeam['team']['name']
            team_points = indTeam['points']
            team_goalDiff = indTeam['goalsDiff']
            
            if team_points < least_points:
                least_points = team_points
                least_goaldiff = team_goalDiff
                top_worst_teams = []
                top_worst_teams.append({'name':team_name + " (" + participant_team_mappings[team_name.lower()] +")", 'points': str(team_points) + " pts/" + str(team_goalDiff) + " GD"})
            elif team_points == least_points:
                if team_goalDiff < least_goaldiff:
                    least_points = team_points
                    least_goaldiff = team_goalDiff
                    top_worst_teams = []
                    top_worst_teams.append({'name':team_name + " (" + participant_team_mappings[team_name.lower()] +")", 'points': str(team_points) + " pts/" + str(team_goalDiff) + " GD"})
                elif team_goalDiff == least_goaldiff:
                    least_points = team_points
                    least_goaldiff = team_goalDiff
                    top_worst_teams.append({'name':team_name+ " (" + participant_team_mappings[team_name.lower()] +")", 'points': str(team_points) + " pts/" + str(team_goalDiff) + " GD"})
                else:
                    pass
            else:
                pass
    return top_worst_teams

#internal method for getting next match
def get_nextmatch(api_key, league_id, season):
    base_url = "https://api-football-v1.p.rapidapi.com/v3/"
    headers = {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': "api-football-v1.p.rapidapi.com"
    }
    
    # URL to get the next match
    next_match_url = f"{base_url}fixtures"
    params = {
        'league': league_id,
        'season': season,
        'next': 1
    }
    
    response = requests.get(next_match_url, headers=headers, params=params)
    data = response.json()

    
    if response.status_code != 200 or not data['response']:
        print("Error fetching top scorers data.")
        return None
    
    next_home = ''
    next_away = ''

    next_home = data['response'][0]['teams']['home']['name']
    next_away = data['response'][0]['teams']['away']['name']

    return [{'name': next_home + " (" + participant_team_mappings[next_home.lower()] +")  Vs " + next_away + " (" + participant_team_mappings[next_away.lower()] +")"}]

#keep alive
def keep_alive():
    while True:
        try:
            response = requests.get("http://localhost:5000/health")
            if response.status_code == 200:
                print("Service is healthy.")
            else:
                print("Service is unhealthy. Status code:", response.status_code)
        except requests.exceptions.RequestException as e:
            print("Failed to connect to service:", e)
        time.sleep(300)  # Ping every 5 minutes

if __name__ == '__main__':
    
    api_key = os.getenv('FOOTBALL_API_KEY')

    if not api_key:
        print("API key not found in environment variables.")

    #app.run(debug=True)
    port = int(os.environ.get('PORT', 5000))

    #separate thread
    threading.Thread(target=keep_alive, daemon=True).start()

    # start 
    app.run(host='0.0.0.0', port=port)