import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import colorutil from 'color-util';
import RgbInputs from './RgbInputs.jsx';
import getClassName from './util/getClassName.js';
import ColorMatrix from './palette/ColorMatrix.jsx';
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
        this.onRgbInputsChange = this.onRgbInputsChange.bind(this);

        let rgb = colorutil.any.to.rgb(this.props.color);
        let rgbHue = colorutil.rgb.hue(rgb);
        let hsv = colorutil.rgb.to.hsv(rgb);

        this.state = {
            rgb: rgb,
            rgbHue: rgbHue,
            hsv: hsv
        }
    }

    onHueChange(rgbHue) {
        let hsv = colorutil.rgb.to.hsv(this.state.rgb);
        let hueHsv = colorutil.rgb.to.hsv(rgbHue);

        hsv.h = hueHsv.h;

        let rgb = colorutil.hsv.to.rgb(hsv);

        this.setState({
            rgb: rgb,
            rgbHue: rgbHue,
            hsv: hsv
        });

        this.props.onChange(rgb);
    }

    onHueGrayScaleChange(rgb) {
        let hsv = colorutil.rgb.to.hsv(rgb);

        this.setState({
            rgb: rgb,
            hsv: hsv
        });

        this.props.onChange(rgb);
    }

    onRgbInputsChange(rgb) {
        this.setState({
            rgb: rgb,
            hue: colorutil.rgb.hue(rgb)
        });
    }

    render() {

        return <div
            className={getClassName('color-picker', this.props)}>

            <HueSliderPalette
                height={400}
                width={10}
                color={this.state.rgb}
                onChange={this.onHueChange}>

                <HueSelection />

            </HueSliderPalette>

            <div className='right'>

                <HueGrayscaleMatrix
                    className='gray-scale'
                    width={200}
                    height={200}
                    hue={this.state.rgbHue}
                    x={this.state.hsv.s * 200}
                    y={(1 - this.state.hsv.v) * 200}
                    onChange={this.onHueGrayScaleChange}>

                    <GrayScaleSelection color={this.state.rgb} />

                </HueGrayscaleMatrix>





            </div>

        </div>
    }
}

// <RgbInputs
                    // color={rgb}
                    // onChange={this.onRgbInputsChange} />




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