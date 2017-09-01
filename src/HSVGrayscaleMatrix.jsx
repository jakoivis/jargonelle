import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import ColorUtil from 'color-util';
import ColorMatrix from './ColorMatrix.jsx';
import getClassName from './util/getClassName.js';

import './styles/hsv-grayscale-matrix.styl';

export default class HSVGrayscaleMatrix extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(rgb, matrixX, matrixY) {
        let rgbWithHue = ColorUtil.rgb.matrixColor(this.getHsvGrayscaleMatrix(), matrixX, matrixY);

        this.props.onChange(rgbWithHue, matrixX, matrixY);
    }

    getGrayscaleMatrix() {
        return [
            [
                {r: 255, g: 255, b: 255, a: 255},
                {r: 0, g: 0, b: 0, a: 0}
            ],
            [
                {r: 0, g: 0, b: 0, a: 255},
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
                {r: 0, g: 0, b: 0, a: 255},
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
                colors={this.getGrayscaleMatrix()} />

        </div>;
    }
}

HSVGrayscaleMatrix.propTypes = {
    hue: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
}

HSVGrayscaleMatrix.defaultProps = {
    hue: {r: 255, g: 0, b: 0, a: 255},
    width: 100,
    height: 100,
    onChange: _.noop,
    lockXAxis: false,
    lockYAxis: false,
    x: 0.5,
    y: 0.5
}