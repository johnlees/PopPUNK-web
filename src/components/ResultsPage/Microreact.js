import React from "react";

class Tree extends React.Component{
    render() {
        return(
            <object title="Microreact project" style= {{ width: '100%', height: '100%' }} classnametype="text/html" data={ this.props.URL } />
        );
    };
};

export default Tree;