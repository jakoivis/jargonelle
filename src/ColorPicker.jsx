import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ColorUtil from 'color-util';
import RgbInputs from './RgbInputs.jsx';
import getClassName from './util/getClassName.js';
import ColorMatrix from './palette/ColorMatrix.jsx';
import HueGrayscaleMatrix from './palette/HueGrayscaleMatrix.jsx';
import HueSliderPalette from './palette/HueSliderPalette.jsx';

import './styles/color-picker.styl';
import './styles/input.styl';

const HUE_GRADIENT = ColorUtil.rgb.hueColors();
const HUE_MATRIX = [ColorUtil.rgb.hueColors()];

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props);

        this.onHueChange = this.onHueChange.bind(this);
        this.onHueGrayScaleChange = this.onHueGrayScaleChange.bind(this);
        this.onRgbInputsChange = this.onRgbInputsChange.bind(this);

        let rgb = ColorUtil.any.toRgb(this.props.color);
        let rgbHue = ColorUtil.rgb.hue(rgb);
        let hsv = ColorUtil.rgb.toHsv(rgb);

        this.state = {
            rgb: rgb,
            rgbHue: rgbHue,
            hsv: hsv
        }
    }

    onHueChange(hue) {
        // TODO: Create ColorUtil.rgb.setHue(rgb, hue)
        // hue as rgb or number 0-1

        let hsv = ColorUtil.rgb.toHsv(this.state.rgb);
        let hueHsv = ColorUtil.rgb.toHsv(hue);

        hsv.h = hueHsv.h;

        let rgb = ColorUtil.hsv.toRgb(hsv);

        //

        this.props.onChange(rgb);

        this.setState({
            hue: hue,
            rgb: rgb
        });
    }

    onHueGrayScaleChange(rgb) {
        this.props.onChange(rgb);

        this.setState({
            rgb: rgb
        });
    }

    onRgbInputsChange(rgb) {
        this.setState({
            rgb: rgb,
            hue: ColorUtil.rgb.hue(rgb)
        });
    }

    render() {

        return <div
            className={getClassName('color-picker', this.props)}>



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


// <HueSliderPalette
//                 height={400}
//                 width={10}
//                 color={rgb}
//                 onChange={this.onHueChange}>

//                 <HueSelection />

//             </HueSliderPalette>

function GrayScaleSelection(props) {

    let color = ColorUtil.any.toHex(props.color);

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