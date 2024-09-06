// Fonction pour chiffrer les données
function encrypt(data, key) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

// Fonction pour déchiffrer les données
function decrypt(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

// Clé de chiffrement (à stocker de manière sécurisée dans une application réelle)
const ENCRYPTION_KEY = 'votre_clé_secrète_très_longue_et_complexe';

// Objet pour gérer le stockage sécurisé
const secureStorage = {
    setItem: function(key, value) {
        const encryptedValue = encrypt(value, ENCRYPTION_KEY);
        localStorage.setItem(key, encryptedValue);
    },
    getItem: function(key) {
        const encryptedValue = localStorage.getItem(key);
        if (encryptedValue) {
            return decrypt(encryptedValue, ENCRYPTION_KEY);
        }
        return null;
    },
    removeItem: function(key) {
        localStorage.removeItem(key);
    },
    clear: function() {
        localStorage.clear();
    }
};

// Exemple d'utilisation
function saveClients(clients) {
    secureStorage.setItem('clients', clients);
}

function getClients() {
    return secureStorage.getItem('clients') || [];
}

function saveServices(services) {
    secureStorage.setItem('services', services);
}

function getServices() {
    return secureStorage.getItem('services') || [];
}

// Fonction pour sauvegarder toutes les données
function saveData() {
    const clients = getClients();
    const services = getServices();
    
    // Mettez à jour ces données selon votre logique d'application
    // Par exemple :
    // clients.push(newClient);
    // services.push(newService);
    
    saveClients(clients);
    saveServices(services);
    
    alert('Données sauvegardées avec succès !');
}

// N'oubliez pas d'inclure la bibliothèque CryptoJS dans votre HTML :
// <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
