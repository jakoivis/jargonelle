
import React from 'react';
import PropTypes from 'prop-types';

const HsvCanvas = props => (

    <div className='hsv-canvas'>

        <div className='hue' style={{backgroundColor: props.hue}} />
        <div className='saturation-value' />

    </div>
);

HsvCanvas.propTypes = {
    hue: PropTypes.string
}

HsvCanvas.defaultProps = {
    hue: '#ff0000'
}

export default HsvCanvas;