import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import getClassName from '../util/getClassName.js';

import '../styles/hsv-grayscale-matrix.styl';

export default class HueGrayscaleMatrix extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);

        let rgbHue = colorutil.convert(this.props.hue,
            colorutil.any.to.rgb,
            colorutil.rgb.hue);

        this.state = {
            hueGrayscaleGradient: colorutil.rgb.gradient({
                colors: this.getHueGrayscaleMatrix(rgbHue),
                width: this.props.width,
                height: this.props.height
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        let rgbHue = colorutil.convert(nextProps.hue,
            colorutil.any.to.rgb,
            colorutil.rgb.hue);

        this.setState({
            hueGrayscaleGradient: colorutil.rgb.gradient({
                colors: this.getHueGrayscaleMatrix(rgbHue),
                width: nextProps.width,
                height: nextProps.height
            })
        });
    }

    onChange(rgb, x, y) {
        let rgbWithHue = this.state.hueGrayscaleGradient(x, y);

        this.props.onChange(rgbWithHue, x, y);
    }

    getTransparentGrayscaleMatrix() {
        return [
            [
                {r: 255, g: 255, b: 255, a: 255},
                {a: 0}
            ],
            [
                {a: 255},
            ]
        ];
    }

    getHueGrayscaleMatrix(rgbHue) {
        return [
            [
                {r: 255, g: 255, b: 255, a: 255},
                rgbHue
            ],
            [
                {a: 255},
            ]
        ];
    }

    render() {
        let hexHue = colorutil.convert(this.props.hue,
            colorutil.any.to.rgb,
            colorutil.rgb.hue,
            colorutil.rgb.to.hex);

        return <div
            className={getClassName('hsv-grayscale-matrix', this.props)}
            onMouseDown={this.onMouseDown}>

            <div
                className="hue"
                style={{
                    backgroundColor: hexHue,
                    width: this.props.width,
                    height: this.props.height
                }}>
            </div>

            <ColorMatrix
                {...this.props}
                onChange={this.onChange}
                colors={this.getTransparentGrayscaleMatrix()} />

        </div>;
    }
}

HueGrayscaleMatrix.propTypes = {
    hue: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
}

HueGrayscaleMatrix.defaultProps = {
    hue: {r: 255},
    width: 100,
    height: 100,
    onChange: _.noop,
    lockXAxis: false,
    lockYAxis: false,
    x: 0,
    y: 0
}