
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

        this.state = {
            hueGrayscaleGradient: colorutil.rgb.gradient({
                colors: this.getHueGrayscaleMatrix(this.props.color.hue().rgb),
                width: this.props.width,
                height: this.props.height
            })
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            hueGrayscaleGradient: colorutil.rgb.gradient({
                colors: this.getHueGrayscaleMatrix(nextProps.color.hue().rgb),
                width: nextProps.width,
                height: nextProps.height
            })
        });
    }

    onChange(rgb, x, y) {

        let rgbWithHue = this.state.hueGrayscaleGradient(x, y);
        let color = colorutil.color(rgbWithHue);

        this.props.onChange(color, x, y);
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

        return <div
            className={getClassName('hsv-grayscale-matrix', this.props)}
            onMouseDown={this.onMouseDown}>

            <div
                className="hue"
                style={{
                    backgroundColor: this.props.color.hue().hex,
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
    color: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
}

HueGrayscaleMatrix.defaultProps = {
    color: null,
    width: 100,
    height: 100,
    onChange: _.noop,
    lockXAxis: false,
    lockYAxis: false,
    x: 0,
    y: 0
}