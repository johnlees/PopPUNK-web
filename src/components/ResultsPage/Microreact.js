import React from "react";

class Tree extends React.Component{
    render() {
        return(
            <object style= {{ width: '100%', height: '90%' }} classnametype="text/html" data={ this.props.URL } />
        );
    };
};

export default Tree;