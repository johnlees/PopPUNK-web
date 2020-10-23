import React, { useState } from "react";

function Tree() {
    const [treeloading, setTreeLoading] = useState(true) //define loading state

    const payload = {
        "name": "New project",
        "description": "New project description...",
        "data": "id,__latitude,__longitude,country,__year,__month,__day,country__color,country__shape,country__groupColor...,",
     
        "tree": "(LwvfR33:3.3,LVJeB53:5.3,VbrFX46:4.6,DIrBt40:4.0,RLInK79:7.9,..."
      }
     
    console.log("posting to microreact!")
    fetch("https://microreact.org/api/poppunktesting", {
        method: 'POST',
        mode: 'cors',
        headers : { 
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(payload),
        }).then((response) => response.json()).then((responseJson) => {
    const treeResult = JSON.parse(responseJson);
    setTreeLoading(false)
    console.log(treeResult);
    console.log("Microreact complete!");
    });
    return(
        <div> 
            <object className="toggled-results" classNametype="text/html" data="https://microreact.org/project/cogconsortium-2020-10-21/e6a88c91/" />
        </div>
    );
};

export default Tree;