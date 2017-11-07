import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ColorUtil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import getClassName from '../util/getClassName.js';

import '../styles/hsv-grayscale-matrix.styl';

export default class HSVGrayscalePalette extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rgb: ColorUtil.any.toRgb(this.props.color)
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(rgb, matrixX, matrixY) {

        let gradient = ColorUtil.rgb.createGradient({
            colors: this.getHsvGrayscaleMatrix(),
            width: this.props.width,
            height: this.props.height
        });

        let rgbWithHue = gradient(matrixX, matrixY);

        this.props.onChange(rgbWithHue, matrixX, matrixY);
    }

    getGrayscaleMatrix() {
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

    getHsvGrayscaleMatrix() {
        return [
            [
                {r: 255, g: 255, b: 255, a: 255},
                this.props.hue
            ],
            [
                {a: 255},
            ]
        ];
    }

    render() {

        return <div
            className={getClassName('hsv-grayscale-matrix', this.props)}
            onMouseDown={this.onMouseDown}>

            <div
                className="hue"
                style={{
                    backgroundColor: ColorUtil.rgb.toHex(this.props.hue),
                    width: this.props.width,
                    height: this.props.height
                }}>
            </div>

            <ColorMatrix
                {...this.props}
                onChange={this.onChange}
                matrix={this.getGrayscaleMatrix()} />

        </div>;
    }
}

HSVGrayscalePalette.propTypes = {
    color: PropTypes.any,
    hue: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
}

HSVGrayscalePalette.defaultProps = {
    color: 0xFF0000,
    hue: {r: 255},
    width: 100,
    height: 100,
    onChange: _.noop,
    lockXAxis: false,
    lockYAxis: false,
    x: 0,
    y: 0
}