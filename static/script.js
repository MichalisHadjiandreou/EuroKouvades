document.addEventListener('DOMContentLoaded', () => {
    //Keep updating for new content
    const bestteamContainer = document.getElementById('bestteam-table');
    const topscorerContainer = document.getElementById('topscorer-table');
    const mostredsContainer = document.getElementById('mostreds-table');
    const worstteamContainer = document.getElementById('worstteam-table');

    //
    let dataBestTeam; // Declare in a wider scope
    let dataTopScorer; // Declare in a wider scope
    let dataMostReds; // Declare in a wider scope
    let dataWorstTeam; // Declare in a wider scope

    //Fetch the data from backend
    fetch('/dataBestTeam')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Populate Best Performing Team table
            dataBestTeam = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    //Fetch the data from backend
    fetch('/dataTopScorer')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Populate Best Performing Team table
            dataTopScorer = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    //Fetch the data from backend
    fetch('/dataMostReds')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Populate Best Performing Team table
            dataMostReds = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    //Fetch the data from backend
    fetch('/dataWorstTeam')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Populate Best Performing Team table
            dataWorstTeam = data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    
    function updateTeams(group, container) {
        container.innerHTML = ''; // Clear previous list

        group.forEach((team, index) => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team';

            teamDiv.innerHTML = `
                <span class="rank">${index + 1}</span>
                <span class="name">${team.name}</span>
                <span class="points">${team.points}</span>
            `;

            container.appendChild(teamDiv);
        });
    }

    // Simulate live ranking update
    setInterval(() => {
        // In a real application, you would fetch new data here
        updateTeams(dataBestTeam, bestteamContainer);
        updateTeams(dataTopScorer, topscorerContainer);
        updateTeams(dataMostReds, mostredsContainer);
        updateTeams(dataWorstTeam, worstteamContainer);
    }, 1000000000000000000000000000000); // Update every 10 seconds

    updateTeams(dataBestTeam, bestteamContainer);  // Initial call to populate
    updateTeams(dataTopScorer, topscorerContainer);
    updateTeams(dataMostReds, mostredsContainer);
    updateTeams(dataWorstTeam, worstteamContainer);
    
});