import React from "react";
import ChangeView from './changeView'

class ClusterResult extends React.Component {

    render() {
        return(
        <ChangeView display={ this.props.display } sketch = { this.props.sketch }/>
    )};
};

export default ClusterResult;