function showStoredData() {
    const clientsData = JSON.parse(localStorage.getItem('benaturalClients')) || [];
    const consumptionsData = JSON.parse(localStorage.getItem('benaturalConsumptions')) || [];
    
    let dataHtml = '<h3>Données stockées localement</h3>';
    
    dataHtml += '<h4>Clients</h4>';
    if (clientsData.length === 0) {
        dataHtml += '<p>Aucun client enregistré.</p>';
    } else {
        dataHtml += '<ul>';
        clientsData.forEach(client => {
            dataHtml += `<li>ID: ${client.id}, Nom: ${client.name}, Téléphone: ${client.phone}</li>`;
        });
        dataHtml += '</ul>';
    }
    
    dataHtml += '<h4>Consommations</h4>';
    if (consumptionsData.length === 0) {
        dataHtml += '<p>Aucune consommation enregistrée.</p>';
    } else {
        dataHtml += '<ul>';
        consumptionsData.forEach(consumption => {
            dataHtml += `<li>
                Date: ${consumption.date}, 
                Client ID: ${consumption.clientId}, 
                Total: ${consumption.total} FCFA
                <ul>`;
            consumption.services.forEach(service => {
                dataHtml += `<li>${service.name}: ${service.price} FCFA</li>`;
            });
            dataHtml += `</ul>
            </li>`;
        });
        dataHtml += '</ul>';
    }
    
    // Afficher les données dans un nouvel élément div
    const dataDisplayDiv = document.createElement('div');
    dataDisplayDiv.innerHTML = dataHtml;
    dataDisplayDiv.style.maxHeight = '400px';
    dataDisplayDiv.style.overflowY = 'auto';
    dataDisplayDiv.style.border = '1px solid #ccc';
    dataDisplayDiv.style.padding = '10px';
    dataDisplayDiv.style.marginTop = '20px';
    
    // Remplacer le contenu existant ou ajouter à la fin
    const adminPanel = document.getElementById('adminPanel');
    const existingDataDisplay = adminPanel.querySelector('.stored-data-display');
    if (existingDataDisplay) {
        adminPanel.replaceChild(dataDisplayDiv, existingDataDisplay);
    } else {
        adminPanel.appendChild(dataDisplayDiv);
    }
    dataDisplayDiv.classList.add('stored-data-display');
}
