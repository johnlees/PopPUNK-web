import React from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class ClusterResult extends React.Component {

    handleSaveToPC(jsonData) {
        const fileData = JSON.stringify(jsonData);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'filename.json';
        link.href = url;
        link.click();
    };

    render() {
        return(
        <>
            <div className='display-cluster'>
                <h2>Cluster ID: {this.props.display} </h2>
            </div>
            <Button variant="outline-primary" onClick={ this.handleSaveToPC.bind(null, this.props.sketch) } >Download sketch</Button>
        </>
    )};
};

export default ClusterResult;

