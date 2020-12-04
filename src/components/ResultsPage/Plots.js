import Plotly from 'plotly.js';
import React from "react";

class Plots extends React.Component{
    constructor(props){
        super(props);
        this.PlotlyRef = React.createRef();
        this.renderPlotlyElement = this.renderPlotlyElement.bind(this);
      };

    renderPlotlyElement(){
        var trace = {
            x: this.props.display.clusters,
            y: this.props.display.prevalences,
            type: 'bar',
            marker: {color: this.props.display.colours}
        };
        var data = [trace];
        var layout = {
            xaxis: {
                title: "Strain ID",
                type: "category"
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
            height: 550,
            width: 1350
        };
        Plotly.newPlot(this.PlotlyRef.current, data, layout, {scrollZoom: true, displayModeBar: false, responsive: true});
    };

    componentDidMount() {
        this.renderPlotlyElement();
    };

    componentDidUpdate(prevProps) {
        if (prevProps!==this.props) {
            this.renderPlotlyElement();
        };
    };

    render() {
        return (
            <div ref={this.PlotlyRef} style={{height:'95%'}}></div>
        );
    };
};

export default Plots;