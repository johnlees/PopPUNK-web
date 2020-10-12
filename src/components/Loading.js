import React from "react";
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Loading extends React.Component {
    render() {
        return(
        <>
            <div className='loader'>
                <Loader type="Circles" color="#00BFFF" height={100}  width={100} />
            </div>
            <div className='progress-text'>{this.props.progress} </div>
        </>
    )};
};

export default Loading;
