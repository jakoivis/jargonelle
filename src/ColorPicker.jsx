import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ColorUtil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import getClassName from './util/getClassName.js';

import './styles/color-picker.styl';

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

        this.onGradientChange = this.onGradientChange.bind(this);
        this.onGrayScaleChange = this.onGrayScaleChange.bind(this);

        this.state = {
            hsv: ColorUtil.rgb.toHsv(ColorUtil.int.toRgb(this.props.color)),
            grayScaleMatrix: [[0xFFFFFF, 0xFFFFFF],[0]]
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.color !== this.props.color) {
            this.setState({
                hsv: ColorUtil.rgb.toHsv(ColorUtil.int.toRgb(nextProps.color)),
            });
        }
    }

    onGradientChange(color) {
        this.setState({
            grayScaleMatrix: [[0xFFFFFF, color], [0]],
            hueColor: color
        });
    }

    onGrayScaleChange(color) {
        this.props.onChange(color);

        this.setState({
            grayScaleColor: color
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
                onValueChange={this.onGradientChange}
                y={this.state.hsv.h/360}>

                <HueSelection color={this.state.hueColor} />

            </ColorMatrix>

            <div className='control-container'>

                <ColorMatrix
                    className='grayScale'
                    width={200}
                    colors={this.state.grayScaleMatrix}
                    onValueChange={this.onGrayScaleChange}
                    x={this.state.hsv.s}
                    y={1-this.state.hsv.v}>

                    <GrayScaleSelection color={this.state.grayScaleColor} />

                </ColorMatrix>

            </div>

        </div>
    }
}

function GrayScaleSelection(props) {
    let color = ColorUtil.int.toHex(props.color);

    return <div
        className='selection'
        style={{backgroundColor: color}} />
}

function HueSelection(props) {
    let color = ColorUtil.int.toHex(props.color);

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


function getHue(color) {
    return ColorUtil.rgb.toHsl(ColorUtil.int.toRgb(color)).h;
}