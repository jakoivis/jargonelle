import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ColorUtil from 'color-util';
import RgbInputs from './RgbInputs.jsx';
import getClassName from './util/getClassName.js';
import ColorMatrix from './palette/ColorMatrix.jsx';
import HSVGrayscalePalette from './palette/HSVGrayscalePalette.jsx';
import HueSliderPalette from './palette/HueSliderPalette.jsx';

import './styles/color-picker.styl';
import './styles/input.styl';

const HUE_GRADIENT = ColorUtil.rgb.hueColors();
const HUE_MATRIX = [ColorUtil.rgb.hueColors()];

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props);

        this.onHueChange = this.onHueChange.bind(this);
        this.onGrayScaleChange = this.onGrayScaleChange.bind(this);
        this.onRgbInputsChange = this.onRgbInputsChange.bind(this);

        let rgb = ColorUtil.any.toRgb(this.props.color);
        let hue = ColorUtil.rgb.hue(rgb);

        this.state = {
            rgb: rgb,
            hue: hue
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

    onGrayScaleChange(rgb, x, y) {
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
        let hsv = ColorUtil.rgb.toHsv(this.state.rgb);
        let hue = this.state.hue;
        let rgb = this.state.rgb;

        return <div
            className={getClassName('color-picker', this.props)}>

            <HueSliderPalette
                height={400}
                width={10}
                color={rgb}
                onChange={this.onHueChange}>

                <HueSelection />

            </HueSliderPalette>

            <div className='right'>

                <HSVGrayscalePalette
                    className='gray-scale'
                    width={200}
                    height={200}
                    color={rgb}
                    hue={hue}
                    x={hsv.s*200}
                    y={(1-hsv.v)*200}
                    onChange={this.onGrayScaleChange}>

                    <GrayScaleSelection color={rgb} />

                </HSVGrayscalePalette>

                <RgbInputs
                    color={rgb}
                    onChange={this.onRgbInputsChange} />



            </div>

        </div>
    }
}

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