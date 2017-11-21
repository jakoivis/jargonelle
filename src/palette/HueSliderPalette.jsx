
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import getClassName from '../util/getClassName.js';

// import '../styles/hsv-grayscale-matrix.styl';

const HUE_GRADIENT = colorutil.rgb.hueColors();
const HUE_MATRIX = [colorutil.rgb.hueColors()];

export default class HueSliderPalette extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hueValue: colorutil.any.to.hsv(this.props.color).h
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.color !== this.props.color) {
            this.setState({
                hueValue: colorutil.any.to.hsv(this.props.color).h
            });
        }
    }

    render() {
        return <ColorMatrix
            className='hue-slider-palette'
            width={this.props.width}
            height={this.props.height}
            colors={HUE_MATRIX}
            rotation={-0.25}
            lockXAxis={true}
            onChange={this.props.onChange}
            y={this.state.hueValue*this.props.height}>

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