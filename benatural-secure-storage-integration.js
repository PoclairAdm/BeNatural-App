// Assurez-vous d'avoir inclus la bibliothèque CryptoJS dans votre HTML

// Code de stockage sécurisé (comme fourni précédemment)
// ... [Insérez ici le code de l'artefact "secure-local-storage"]

// Modification des fonctions existantes pour utiliser le stockage sécurisé

let clients = [];
let services = [];

function loadData() {
    clients = getClients();
    services = getServices();
    updateClientList();
    updateClientSelect();
}

function saveData() {
    saveClients(clients);
    saveServices(services);
    alert('Données sauvegardées avec succès !');
}

function registerClient() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const photo = document.getElementById('clientPhoto').files[0];

    if (!name || !phone) {
        document.getElementById('registrationError').textContent = 'Veuillez remplir tous les champs obligatoires.';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const newClient = {
            id: Date.now(),
            name: name,
            phone: phone,
            photo: e.target.result,
            registrationDate: new Date().toISOString()
        };

        clients.push(newClient);
        saveClients(clients);
        alert('Client inscrit avec succès !');
        showHomeView();
    };

    if (photo) {
        reader.readAsDataURL(photo);
    } else {
        reader.onload({ target: { result: null } });
    }
}

function addService() {
    const clientId = document.getElementById('clientSelect').value;
    const serviceType = document.getElementById('serviceType').value;
    const amount = parseFloat(document.getElementById('serviceAmount').value);

    if (!clientId || !serviceType || isNaN(amount)) {
        document.getElementById('serviceError').textContent = 'Veuillez remplir tous les champs correctement.';
        return;
    }

    const newService = {
        id: Date.now(),
        clientId: parseInt(clientId),
        type: serviceType,
        amount: amount,
        date: new Date().toISOString()
    };

    services.push(newService);
    saveServices(services);
    alert('Service ajouté avec succès !');
    showAdminPanel();
}

function updateClientList() {
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';
    clients.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        clientCard.innerHTML = `
            <img src="${client.photo || 'placeholder.jpg'}" alt="${client.name}" class="client-photo">
            <h3>${client.name}</h3>
            <p>Téléphone: ${client.phone}</p>
            <p>Date d'inscription: ${new Date(client.registrationDate).toLocaleDateString()}</p>
        `;
        clientList.appendChild(clientCard);
    });
}

function updateClientSelect() {
    const clientSelect = document.getElementById('clientSelect');
    clientSelect.innerHTML = '<option value="">Sélectionnez un client</option>';
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.id;
        option.textContent = client.name;
        clientSelect.appendChild(option);
    });
}

function searchClients() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm) || 
        client.phone.includes(searchTerm)
    );
    const clientList = document.getElementById('clientList');
    clientList.innerHTML = '';
    filteredClients.forEach(client => {
        // ... (même code que dans updateClientList pour afficher les clients)
    });
}

function exportClients() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Nom,Téléphone,Date d'inscription\n"
        + clients.map(client => `${client.name},${client.phone},${client.registrationDate}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clients_benatural.csv");
    document.body.appendChild(link);
    link.click();
}

function exportServices() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Client,Type de service,Montant,Date\n"
        + services.map(service => {
            const client = clients.find(c => c.id === service.clientId);
            return `${client ? client.name : 'Client inconnu'},${service.type},${service.amount},${service.date}`;
        }).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "services_benatural.csv");
    document.body.appendChild(link);
    link.click();
}

// Chargez les données au démarrage de l'application
window.onload = loadData;
