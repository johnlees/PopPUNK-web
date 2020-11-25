onmessage = function(message) {
    fetch("http://localhost:5000/network", {
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