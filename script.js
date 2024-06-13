document.addEventListener('DOMContentLoaded', () => {
    const bestteamContainer = document.getElementById('bestteam-table');
    const worstteamContainer = document.getElementById('worstteam-table');
    const mostredsContainer = document.getElementById('mostreds-table');
    const topscorerContainer = document.getElementById('topscorer-table');

    // Simulated data for different groups, in real application you would fetch this data from an API
    const dataBestTeam = [
        { name: 'France', points: 15 },
        { name: 'Germany', points: 12 },
        { name: 'Italy', points: 10 }
    ];

    const dataWorstTeam = [
        { name: 'Spain', points: 9 },
        { name: 'Belgium', points: 7 },
        { name: 'Portugal', points: 6 }
    ];

    const dataMostReds = [
        { name: 'Spain', points: 9 },
        { name: 'Belgium', points: 7 },
        { name: 'Portugal', points: 6 }
    ];

    const dataTopScorer = [
        { name: 'Spain', points: 9 },
        { name: 'Belgium', points: 7 },
        { name: 'Portugal', points: 6 }
    ];

    function updateTeams(group, container) {
        container.innerHTML = ''; // Clear previous list

        // Sort teams by points in descending order
        group.sort((a, b) => b.points - a.points);

        group.forEach((team, index) => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team';

            teamDiv.innerHTML = `
                <span class="rank">${index + 1}</span>
                <span class="name">${team.name}</span>
                <span class="points">${team.points} pts</span>
            `;

            container.appendChild(teamDiv);
        });
    }

    // Simulate live ranking update
    setInterval(() => {
        // In a real application, you would fetch new data here
        updateTeams(dataBestTeam, bestteamContainer);
        updateTeams(dataWorstTeam, worstteamContainer);
        updateTeams(dataMostReds, mostredsContainer);
        updateTeams(dataTopScorerTeam, topscorerContainer);
    }, 10000); // Update every 10 seconds

    updateTeams(dataBestTeam, bestteamContainer);  // Initial call to populate
    updateTeams(dataWorstTeam, worstteamContainer);  // Initial call to populate
    updateTeams(dataMostReds, mostredsContainer);  // Initial call to populate
    updateTeams(dataTopScorer, topscorerContainer);  // Initial call to populate
    
});
