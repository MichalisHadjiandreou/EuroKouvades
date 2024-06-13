document.addEventListener('DOMContentLoaded', () => {
    const bestteamContainer = document.getElementById('bestteam-table');
    const worstteamContainer = document.getElementById('worstteam-table');
    const mostredsContainer = document.getElementById('mostreds-table');
    const topscorerContainer = document.getElementById('topscorer-table');

    // Simulated data for different groups, in real application you would fetch this data from an API
    const dataBestTeam = [
        { name: 'Germany', points: 15 },
        { name: 'Scotland', points: 12 },
        { name: 'Hungary', points: 12 },
        { name: 'Switzerland', points: 12 },
        { name: 'Slovenia', points: 12 },
        { name: 'Denmark', points: 12 },
        { name: 'Serbia', points: 12 },
        { name: 'England', points: 12 },
        { name: 'Belgium', points: 12 },
        { name: 'Slovakia', points: 12 },
        { name: 'Romania', points: 12 },
        { name: 'Ukraine', points: 12 },
        { name: 'Spain', points: 12 },
        { name: 'Croatia', points: 12 },
        { name: 'Italy', points: 12 },
        { name: 'Albania', points: 12 },
        { name: 'Poland', points: 12 },
        { name: 'Netherlands', points: 12 },
        { name: 'Austria', points: 12 },
        { name: 'France', points: 12 },
        { name: 'Turkey', points: 12 },
        { name: 'Georgia', points: 12 },
        { name: 'Portugal', points: 12 },
        { name: 'Czechia', points: 10 }
    ];

    const dataWorstTeam = [
        { name: 'Germany', points: 15 },
        { name: 'Scotland', points: 12 },
        { name: 'Hungary', points: 12 },
        { name: 'Switzerland', points: 12 },
        { name: 'Slovenia', points: 12 },
        { name: 'Denmark', points: 12 },
        { name: 'Serbia', points: 12 },
        { name: 'England', points: 12 },
        { name: 'Belgium', points: 12 },
        { name: 'Slovakia', points: 12 },
        { name: 'Romania', points: 12 },
        { name: 'Ukraine', points: 12 },
        { name: 'Spain', points: 12 },
        { name: 'Croatia', points: 12 },
        { name: 'Italy', points: 12 },
        { name: 'Albania', points: 12 },
        { name: 'Poland', points: 12 },
        { name: 'Netherlands', points: 12 },
        { name: 'Austria', points: 12 },
        { name: 'France', points: 12 },
        { name: 'Turkey', points: 12 },
        { name: 'Georgia', points: 12 },
        { name: 'Portugal', points: 12 },
        { name: 'Czechia', points: 10 }
    ];

    const dataMostReds = [
        { name: 'Germany', points: 15 },
        { name: 'Scotland', points: 12 },
        { name: 'Hungary', points: 12 },
        { name: 'Switzerland', points: 12 },
        { name: 'Slovenia', points: 12 },
        { name: 'Denmark', points: 12 },
        { name: 'Serbia', points: 12 },
        { name: 'England', points: 12 },
        { name: 'Belgium', points: 12 },
        { name: 'Slovakia', points: 12 },
        { name: 'Romania', points: 12 },
        { name: 'Ukraine', points: 12 },
        { name: 'Spain', points: 12 },
        { name: 'Croatia', points: 12 },
        { name: 'Italy', points: 12 },
        { name: 'Albania', points: 12 },
        { name: 'Poland', points: 12 },
        { name: 'Netherlands', points: 12 },
        { name: 'Austria', points: 12 },
        { name: 'France', points: 12 },
        { name: 'Turkey', points: 12 },
        { name: 'Georgia', points: 12 },
        { name: 'Portugal', points: 12 },
        { name: 'Czechia', points: 10 }
    ];

    const dataTopScorer = [
        { name: 'Germany', points: 15 },
        { name: 'Scotland', points: 12 },
        { name: 'Hungary', points: 12 },
        { name: 'Switzerland', points: 12 },
        { name: 'Slovenia', points: 12 },
        { name: 'Denmark', points: 12 },
        { name: 'Serbia', points: 12 },
        { name: 'England', points: 12 },
        { name: 'Belgium', points: 12 },
        { name: 'Slovakia', points: 12 },
        { name: 'Romania', points: 12 },
        { name: 'Ukraine', points: 12 },
        { name: 'Spain', points: 12 },
        { name: 'Croatia', points: 12 },
        { name: 'Italy', points: 12 },
        { name: 'Albania', points: 12 },
        { name: 'Poland', points: 12 },
        { name: 'Netherlands', points: 12 },
        { name: 'Austria', points: 12 },
        { name: 'France', points: 12 },
        { name: 'Turkey', points: 12 },
        { name: 'Georgia', points: 12 },
        { name: 'Portugal', points: 12 },
        { name: 'Czechia', points: 20 }
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
