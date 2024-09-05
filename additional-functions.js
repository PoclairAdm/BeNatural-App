// Fonctions supplémentaires pour BeNatural ByLaury

function showClientList() {
    const clientListDiv = document.getElementById('clientList');
    clientListDiv.innerHTML = '<h3>Liste des clients</h3>';
    clients.forEach(client => {
        clientListDiv.innerHTML += `<p>${client.name} - ${client.phone}</p>`;
    });
    clientListDiv.style.display = 'block';
    document.getElementById('dailyConsumptionList').style.display = 'none';
    document.getElementById('dailyReportSection').style.display = 'none';
}

function showDailyConsumption() {
    const dailyConsumptionDiv = document.getElementById('dailyConsumptionList');
    dailyConsumptionDiv.innerHTML = '<h3>Consommations journalières</h3>';
    const groupedConsumptions = groupConsumptionsByDate();
    for (let date in groupedConsumptions) {
        const dailyTotal = groupedConsumptions[date].reduce((sum, c) => sum + c.total, 0);
        dailyConsumptionDiv.innerHTML += `
            <div class="daily-consumption">
                <h4>${date} - Total: ${dailyTotal} FCFA</h4>
                <ul>
                    ${groupedConsumptions[date].map(c => `
                        <li>${clients.find(client => client.id === c.clientId).name}: ${c.total} FCFA</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    dailyConsumptionDiv.style.display = 'block';
    document.getElementById('clientList').style.display = 'none';
    document.getElementById('dailyReportSection').style.display = 'none';
}

function groupConsumptionsByDate() {
    const grouped = {};
    consumptions.forEach(c => {
        if (!grouped[c.date]) {
            grouped[c.date] = [];
        }
        grouped[c.date].push(c);
    });
    return grouped;
}

function showDailyReport() {
    document.getElementById('clientList').style.display = 'none';
    document.getElementById('dailyConsumptionList').style.display = 'none';
    document.getElementById('dailyReportSection').style.display = 'block';
    document.getElementById('dateSelect').valueAsDate = new Date();
    loadDailyReport();
}

function loadDailyReport() {
    const selectedDate = document.getElementById('dateSelect').value;
    const dailyConsumptions = consumptions.filter(c => c.date === selectedDate);
    
    let reportHtml = `<h3>Rapport du ${selectedDate}</h3>`;
    
    if (dailyConsumptions.length === 0) {
        reportHtml += '<p>Aucune consommation enregistrée pour cette date.</p>';
    } else {
        reportHtml += `
            <table>
                <tr>
                    <th>Client</th>
                    <th>Services</th>
                    <th>Total</th>
                </tr>
        `;
        
        let dailyTotal = 0;
        
        dailyConsumptions.forEach(consumption => {
            const clientTotal = consumption.services.reduce((sum, service) => sum + service.price, 0);
            dailyTotal += clientTotal;
            
            reportHtml += `
                <tr>
                    <td>${clients.find(c => c.id === consumption.clientId).name}</td>
                    <td>${consumption.services.map(s => `${s.name} (${s.price} FCFA)`).join('<br>')}</td>
                    <td>${clientTotal} FCFA</td>
                </tr>
            `;
        });
        
        reportHtml += `
            <tr class="total-row">
                <td colspan="2">Total Journalier</td>
                <td>${dailyTotal} FCFA</td>
            </tr>
            </table>
        `;
    }
    
    document.getElementById('dailyReport').innerHTML = reportHtml;
    
    // Generate chart
    generateChart(dailyConsumptions);
}

function generateChart(dailyConsumptions) {
    const ctx = document.getElementById('chart').getContext('2d');
    
    // Prepare data for the chart
    const serviceData = {};
    dailyConsumptions.forEach(consumption => {
        consumption.services.forEach(service => {
            if (serviceData[service.name]) {
                serviceData[service.name] += service.price;
            } else {
                serviceData[service.name] = service.price;
            }
        });
    });
    
    // Create the chart
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(serviceData),
            datasets: [{
                data: Object.values(serviceData),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Répartition des services'
            }
        }
    });
}

function exportConsumptionData() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Date,Client,Service,Prix\n"
        + consumptions.map(c => c.services.map(s => `${c.date},${clients.find(client => client.id === c.clientId).name},${s.name},${s.price}`).join("\n")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "consommations.csv");
    document.body.appendChild(link);
    link.click();
}

function exportClientData() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "ID,Nom,Téléphone\n"
        + clients.map(c => `${c.id},${c.name},${c.phone}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clients.csv");
    document.body.appendChild(link);
    link.click();
}