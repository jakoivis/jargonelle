
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import getClassName from '../util/getClassName.js';

// import '../styles/hsv-grayscale-matrix.styl';

const HUE_MATRIX = [
    {h:0, s: 1, l: 0.5},
    {h:1, s: 1, l: 0.5}
];

export default class HueSliderPalette extends React.Component {

    render() {

        return <ColorMatrix
            className='hue-slider-palette'
            width={this.props.width}
            height={this.props.height}
            colors={HUE_MATRIX}
            colorType='hsl'
            rotation={-0.25}
            lockXAxis={true}
            onChange={this.props.onChange}
            y={this.props.color.hsv.h*this.props.height}>

            {this.props.children}

        </ColorMatrix>;
    }
}

HueSliderPalette.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    color: PropTypes.any
}

HueSliderPalette.defaultProps = {
    width: 200,
    height: 10,
    onChange: _.noop,
    color: 0xFF0000
}