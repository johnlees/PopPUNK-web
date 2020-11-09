import React from "react";
import Spinner from './spinner.png'

class Loading extends React.Component {
    render() {
        return(
        <>
            <div className="loader-container">
                <img className='custom-loader' src={Spinner} alt="Spinner"/>
                <div id='loader-font' className='progress-text'>{this.props.progress} </div>
            </div>
        </>
    )};
};

export default Loading;
