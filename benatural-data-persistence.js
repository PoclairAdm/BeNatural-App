// Système de sauvegarde des données pour BeNatural ByLaury

// Fonction pour sauvegarder les données
function saveData() {
    localStorage.setItem('benaturalClients', JSON.stringify(clients));
    localStorage.setItem('benaturalConsumptions', JSON.stringify(consumptions));
}

// Fonction pour charger les données
function loadData() {
    const savedClients = localStorage.getItem('benaturalClients');
    const savedConsumptions = localStorage.getItem('benaturalConsumptions');

    if (savedClients) {
        clients = JSON.parse(savedClients);
    }
    if (savedConsumptions) {
        consumptions = JSON.parse(savedConsumptions);
    }
}

// Fonction pour effacer toutes les données (utile pour le débogage)
function clearAllData() {
    localStorage.removeItem('benaturalClients');
    localStorage.removeItem('benaturalConsumptions');
    clients = [];
    consumptions = [];
}

// Charger les données au démarrage de l'application
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    // Si vous avez une fonction qui initialise l'interface utilisateur, appelez-la ici
    // Par exemple : updateClientList();
});

// Sauvegarder les données avant de quitter la page
window.addEventListener('beforeunload', function() {
    saveData();
});

// Wrapper pour les fonctions qui modifient les données
function wrapWithSave(originalFunction) {
    return function(...args) {
        const result = originalFunction.apply(this, args);
        saveData();
        return result;
    };
}

// Remplacer les fonctions existantes par des versions qui sauvegardent automatiquement
createClient = wrapWithSave(createClient);
submitServices = wrapWithSave(submitServices);
