
import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import colorutil from 'color-util';
import ColorInputs from './ColorInputs.jsx';
import getClassName from './util/getClassName.js';
import HueGrayscaleMatrix from './palette/HueGrayscaleMatrix.jsx';
import HueSliderPalette from './palette/HueSliderPalette.jsx';

import './styles/color-picker.styl';
import './styles/input.styl';

const HUE_GRADIENT = colorutil.rgb.hueColors();
const HUE_MATRIX = [colorutil.rgb.hueColors()];

export default class ColorPicker extends React.Component {

    constructor(props) {

        super(props);

        this.onHueChange = this.onHueChange.bind(this);
        this.onHueGrayScaleChange = this.onHueGrayScaleChange.bind(this);
        this.onInputsChange = this.onInputsChange.bind(this);

        let color = colorutil.color(this.props.color);
        let hue = color.hue();

        this.state = {
            color: color,
            hue: hue
        }
    }

    onHueChange(hue) {

        let newColor = this.state.color.hueFromColor(hue);

        this.setState({
            color: newColor,
            hue: hue
        });

        this.props.onChange(newColor);
    }

    onHueGrayScaleChange(color) {

        this.setState({
            color: color
        });

        this.props.onChange(color);
    }

    onInputsChange(color) {

        this.setState({
            color: color
        });

        this.props.onChange(color);
    }

    render() {

        return <div
            className={getClassName('color-picker', this.props)}>

            <HueSliderPalette
                height={400}
                width={10}
                color={this.state.hue}
                onChange={this.onHueChange}>

                <HueSelection />

            </HueSliderPalette>

            <div className='right'>

                <HueGrayscaleMatrix
                    className='gray-scale'
                    width={200}
                    height={200}
                    hue={this.state.hue}
                    color={this.state.color}
                    onChange={this.onHueGrayScaleChange}>

                    <GrayScaleSelection color={this.state.color.rgb} />

                </HueGrayscaleMatrix>

                <ColorInputs
                    color={this.state.color}
                    onChange={this.onInputsChange}
                    types={['hex', 'cssrgb']} />

            </div>

        </div>
    }
}

function GrayScaleSelection(props) {

    let color = colorutil.any.to.hex(props.color);

    return <div
        className='selection'
        style={{backgroundColor: color}} />
}

function HueSelection() {

    return <svg className="selection">

        <polygon points="0,0 0,16 10,8"/>

    </svg>
}

ColorPicker.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func
}

ColorPicker.defaultProps = {
    color: 0xFF0000,
    onChange: _.noop
}