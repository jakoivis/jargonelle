
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
            rgb: this.props.rgb,
            hex: ColorUtil.rgb.toHex(this.props.rgb)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.rgb !== this.props.rgb) {
            this.setState({
                rgb: nextProps.rgb,
                hex: ColorUtil.rgb.toHex(nextProps.rgb)
            });
        }
    }

    onHexChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let rgb = ColorUtil.hex.toRgb(value);

        if (rgb) {
            this.setState({
                rgb: rgb,
                hex: value
            });

            this.props.onChange(rgb);

        } else {
            this.setState({
                hex: value
            });
        }
    }

    onRgbChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        let rgb = _.clone(this.state.rgb);

        rgb[name] = value;

        this.setState({
            rgb: rgb,
            hex: ColorUtil.rgb.toHex(rgb)
        });
    }

    render() {
        return <div>
            <input name='hex' type='text' value={this.state.hex} onChange={this.onHexChange} />
            <input name='r' type='text' value={this.state.rgb.r} onChange={this.onRgbChange} />
            <input name='g' type='text' value={this.state.rgb.g} onChange={this.onRgbChange} />
            <input name='b' type='text' value={this.state.rgb.b} onChange={this.onRgbChange} />
        </div>;
    }
}

RgbInputs.propTypes = {
    rgb: PropTypes.object,
    onChange: PropTypes.func
}

RgbInputs.defaultProps = {
    rgb: {r:0, g: 0, b: 0},
    onChange: _.noop
}