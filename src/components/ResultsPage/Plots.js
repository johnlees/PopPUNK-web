import Plot from 'react-plotly.js';
import React from "react";

class Plots extends React.Component{

    render() {
        return (
            <>
                <Plot className="item1"
                    useResizeHandler
                    data={[
                        {type: 'bar', x: this.props.display.clusters, y: this.props.display.prevalences, marker: {color: this.props.display.colours}},
                    ]}
                    layout={ {
                        xaxis: {
                            title: "Cluster ID",
                        },
                        yaxis: {
                            title: "Prevalence (%)",
                        },
                        paper_bgcolor:'rgba(0,0,0,0)',
                        plot_bgcolor:'rgba(0,0,0,0)',  
                        margin: {
                            l:50, 
                            r:0, 
                            b:50, 
                            t:0, 
                            pad: 0},
                        autosize: true} }
                    config={ {displayModeBar: false} }
                    />
                <Plot className="item2"
                    useResizeHandler
                    data={[
                        {
                        x: this.props.display.clusters,
                        y: this.props.display.prevalences,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'blue'},
                        },
                    ]}
                    layout={ {
                        xaxis: {
                            title: "Cluster ID",
                        },
                        yaxis: {
                            title: "Prevalence (%)",
                        },
                        paper_bgcolor:'rgba(0,0,0,0)',
                        plot_bgcolor:'rgba(0,0,0,0)',  
                        margin: {
                            l:50, 
                            r:0, 
                            b:50, 
                            t:0, 
                            pad:0},
                        autosize: true} }
                    config={ {displayModeBar: false} }
                    />
            </>
        );
    };
};

export default Plots;