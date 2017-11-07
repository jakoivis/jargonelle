
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import getClassName from './util/getClassName.js';

import ColorUtil from 'color-util';

export default class RgbInputs extends React.Component {

    constructor(props) {
        super(props);

        this.onRgbChange =this.onRgbChange.bind(this);
        this.onHexChange =this.onHexChange.bind(this);

        this.state = {
            rgb: ColorUtil.any.toRgbString(this.props.color),
            hex: ColorUtil.any.toHex(this.props.color)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.color !== this.props.color) {

            this.setState({
                rgb: ColorUtil.rgb.toRgbString(nextProps.color),
                hex: ColorUtil.rgb.toHex(nextProps.color)
            });
        }
    }

    onHexChange(event) {
        let value = event.target.value;

        if (ColorUtil.hex.test(value)) {
            this.setState({
                rgb: ColorUtil.hex.toRgbString(value),
                hex: value
            });

            this.props.onChange(ColorUtil.hex.toRgb(value));

        } else {
            this.setState({
                hex: value
            });
        }
    }

    onRgbChange(event) {
        let value = event.target.value;

        if (ColorUtil.rgbString.test(value)) {
            this.setState({
                rgb: value,
                hex: ColorUtil.rgbString.toHex(value)
            });

            this.props.onChange(ColorUtil.rgbString.toRgb(value));

        } else {
            this.setState({
                rgb: value
            });
        }
    }

    render() {
        let hex = _.toUpper(this.state.hex);
        let rgb = this.state.rgb;


        return <div>
            <input name='hex' type='text' value={hex} onChange={this.onHexChange} />
            <input name='rgb' type='text' value={rgb} onChange={this.onRgbChange} />
        </div>;
    }
}

RgbInputs.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func,
    hex: PropTypes.bool,
    rgb: PropTypes.bool,
    hsv: PropTypes.bool,
    hsl: PropTypes.bool
}

RgbInputs.defaultProps = {
    color: 0,
    onChange: _.noop,
    hex: true,
    rgb: true,
    hsv: false,
    hsl: false
}