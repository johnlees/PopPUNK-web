import React from "react";
import Button from 'react-bootstrap/Button';
import ShowHide from './changeView'

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
            <div className="summary-statistics">
                <h4> Species: {this.props.display.species} Cluster ID: {this.props.display.query} Prevalence: {this.props.display.prev} Other: {this.props.display.other}</h4>
                <Button className='download-button' variant="outline-primary" onClick={ this.handleSaveToPC.bind(null, this.props.sketch) } >Download sketch</Button>
            </div>
            <ShowHide display={ this.props.display }/>
        </>
    )};
};

export default ClusterResult;