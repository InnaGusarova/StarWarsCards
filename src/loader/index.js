import React from 'react';
import gif from '../img/NgsT.gif'

class Loader extends React.Component {

    render() {   
        return (
            <img className="gif" src={gif} alt="loading"/>
        )
    }
}

export default Loader;