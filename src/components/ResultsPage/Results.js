import React from "react";
import ShowHide from './changeView'

class ClusterResult extends React.Component {
    
    render() {
        return(
        <ShowHide display={ this.props.display } sketch = { this.props.sketch }/>
    )};
};

export default ClusterResult;