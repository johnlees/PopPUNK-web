import React from "react";

class ClusterResult extends React.Component {
    render() {
        return(
            <div className='display-cluster'>
                <h2>Cluster ID: {this.props.display} </h2>
            </div>
        );
    };
};

export default ClusterResult;

