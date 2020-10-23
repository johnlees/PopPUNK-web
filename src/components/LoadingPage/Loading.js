import React from "react";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Spinny from './spinner.png'

class Loading extends React.Component {
    render() {
        return(
        <>
            <div className="loader-container">
                <img className='custom-loader' src={Spinny} alt="Spinner"/>
                <div id='loader-font' className='progress-text'>{this.props.progress} </div>
            </div>
        </>
    )};
};

export default Loading;
