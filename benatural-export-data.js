function exportAllData() {
    const allData = {
        clients: JSON.parse(localStorage.getItem('benaturalClients')) || [],
        consumptions: JSON.parse(localStorage.getItem('benaturalConsumptions')) || []
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "benatural_data_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
