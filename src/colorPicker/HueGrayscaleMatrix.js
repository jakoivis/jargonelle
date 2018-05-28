
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import GradientPicker from 'colorPicker/GradientPicker';

import getClassName from 'util/getClassName';

import 'styles/colorPicker/HueGrayscaleMatrix';

export default class HueGrayscaleMatrix extends React.Component {

    constructor(props) {

        super(props);

        this.onChange = this.onChange.bind(this);

        this.state = {
            hueGrayscaleGradient: colorutil.rgb.gradient({
                colors: this.getHueGrayscaleColors(this.props.hue.rgb),
                width: this.props.width,
                height: this.props.height
            })
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            hueGrayscaleGradient: colorutil.rgb.gradient({
                colors: this.getHueGrayscaleColors(nextProps.hue.rgb),
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

    getTransparentGrayscaleColors() {

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

    getHueGrayscaleColors(rgbHue) {

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
                    backgroundColor: this.props.hue.hex,
                    width: this.props.width,
                    height: this.props.height
                }}>
            </div>

            <GradientPicker
                {...this.props}
                x={this.props.color.hsv.s * this.props.width}
                y={(1 - this.props.color.hsv.v) * this.props.height}
                onChange={this.onChange}
                colors={this.getTransparentGrayscaleColors()} />

        </div>;
    }
}

HueGrayscaleMatrix.propTypes = {
    color: PropTypes.object,
    hue: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    onChange: PropTypes.func,
    lockYAxis: PropTypes.bool,
    lockXAxis: PropTypes.bool
}

HueGrayscaleMatrix.defaultProps = {
    color: null,
    hue: null,
    width: 100,
    height: 100,
    onChange: _.noop,
    lockXAxis: false,
    lockYAxis: false
}