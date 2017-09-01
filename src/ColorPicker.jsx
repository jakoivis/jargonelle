import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ColorUtil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import RgbInputs from './RgbInputs.jsx';
import getClassName from './util/getClassName.js';
import HSVGrayscaleMatrix from './HSVGrayscaleMatrix.jsx';

import './styles/color-picker.styl';
import './styles/input.styl';

const hueColors = ColorUtil.rgb.hueColors();

const verticalHue = {
    gradient: [ColorUtil.rgb.hueColors()],
    width: 10,
    height: 400,
    lockYAxis: false,
    lockXAxis: true
};

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props);

        this.onHueChange = this.onHueChange.bind(this);
        this.onGrayScaleChange = this.onGrayScaleChange.bind(this);
        this.onRgbInputsChange = this.onRgbInputsChange.bind(this);

        this.state = {
            rgb: ColorUtil.any.toRgb(this.props.color)
        }
    }

    onHueChange(rgb) {
        let hsv = ColorUtil.rgb.toHsv(rgb);
        let hue = ColorUtil.rgb.gradientColor(hueColors, hsv.h);

        this.setState({
            rgb: rgb
        });
    }

    onGrayScaleChange(color) {
        // let rgb = ColorUtil.rgb.to
        this.props.onChange(color);

        this.setState({
            color: color
        });
    }

    onRgbInputsChange(color) {
        this.setState({
            color: color
        });
    }

    render() {
        let hsv = ColorUtil.rgb.toHsv(this.state.rgb);
        let hueRgb = ColorUtil.rgb.gradientColor(hueColors, hsv.h);

        return <div
            className={getClassName('color-picker', this.props)}>

            <ColorMatrix
                className='hue'
                height={verticalHue.height}
                width={verticalHue.width}
                colors={verticalHue.gradient}
                rotation={0.25}
                lockXAxis={verticalHue.lockXAxis}
                lockYAxis={verticalHue.lockYAxis}
                onChange={this.onHueChange}
                y={hsv.h}>

                <HueSelection />

            </ColorMatrix>

            <div className='right'>

                <HSVGrayscaleMatrix
                    className='grayScale'
                    width={200}
                    hue={hueRgb}
                    x={hsv.s}
                    y={1-hsv.v}
                    onChange={this.onGrayScaleChange} />


                <GrayScaleSelection color={this.state.rgb} />

                <RgbInputs
                    color={this.state.rgb}
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