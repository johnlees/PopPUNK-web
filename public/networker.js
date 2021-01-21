onmessage = function(message) {
    fetch("https://poppunk-api.azurewebsites.net:443/network", {
            method: 'POST',
            mode: 'cors',
            headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({species: message.data}),
            }).then((response) => response.json()).then((responseJson) => {
        const networkResult = responseJson;
        self.postMessage(networkResult);
    });
}