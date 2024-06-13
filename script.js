document.addEventListener('DOMContentLoaded', () => {
    const groupAContainer = document.getElementById('group-a');
    const groupBContainer = document.getElementById('group-b');

    // Simulated data for different groups, in real application you would fetch this data from an API
    const groupA = [
        { name: 'France', points: 15 },
        { name: 'Germany', points: 12 },
        { name: 'Italy', points: 10 }
    ];

    const groupB = [
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
        updateTeams(groupA, groupAContainer);
        updateTeams(groupB, groupBContainer);
    }, 10000); // Update every 10 seconds

    updateTeams(groupA, groupAContainer); // Initial call to populate Group A
    updateTeams(groupB, groupBContainer); // Initial call to populate Group B
});
