import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ColorUtil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import RgbInputs from './RgbInputs.jsx';
import getClassName from './util/getClassName.js';

import './styles/color-picker.styl';
import './styles/input.styl';

const hueColors = ColorUtil.rgb.hueColors();

const verticalHue = {
    gradient: [[0xFF0000], [0xFFFF00], [0x00FF00], [0x00FFFF], [0x0000FF], [0xFF00FF], [0xFF0000]],
    width: 10,
    height: 400,
    lockYAxis: false,
    lockXAxis: true
};

const horizontalHue = {
    gradient: [[0xFF0000, 0xFFFF00, 0x00FF00, 0x00FFFF, 0x0000FF, 0xFF00FF, 0xFF0000]],
    width: 400,
    height: 5,
    lockYAxis: true,
    lockXAxis: false
}

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props);

        this.onHueChange = this.onHueChange.bind(this);
        this.onGrayScaleChange = this.onGrayScaleChange.bind(this);
        this.onRgbInputsChange = this.onRgbInputsChange.bind(this);

        let rgb = ColorUtil.any.toRgb(this.props.color);
        let hsv = ColorUtil.any.toHsv(this.props.color);

        let hueRgb = ColorUtil.rgb.hue(rgb);
        let hue = ColorUtil.rgb.toInt(hueRgb);

        this.state = {
            rgb: rgb,
            hsv: hsv,
            // TODO: maybe short-cut method for this?
            grayScaleMatrix: [[0xFFFFFF, hue],[0]]
        }
    }

    onHueChange(rgb) {
        let hsv = ColorUtil.rgb.toHsv(rgb);
        let hue = ColorUtil.gradientColor(hueColors, hsv.h);

        this.setState({
            rgb: rgb,
            hsv: hsv,
            grayScaleMatrix: [[0xFFFFFF, hue], [0]]
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
        return <div
            className={getClassName('color-picker', this.props)}>

            <ColorMatrix
                className='hue'
                height={verticalHue.height}
                width={verticalHue.width}
                colors={verticalHue.gradient}
                lockXAxis={verticalHue.lockXAxis}
                lockYAxis={verticalHue.lockYAxis}
                onChange={this.onHueChange}
                y={this.state.hsv.h}>

                <HueSelection />

            </ColorMatrix>

            <div className='right'>

                <ColorMatrix
                    className='grayScale'
                    width={200}
                    colors={this.state.grayScaleMatrix}
                    onChange={this.onGrayScaleChange}
                    x={this.state.hsv.s}
                    y={1-this.state.hsv.v}>

                    <GrayScaleSelection color={this.state.rgb} />

                </ColorMatrix>

                <RgbInputs
                    color={this.state.hsv}
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
    color: PropTypes.number,
    onChange: PropTypes.func
}

ColorPicker.defaultProps = {
    color: 0xFF0000,
    onChange: _.noop
}