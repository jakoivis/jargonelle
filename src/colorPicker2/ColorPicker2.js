
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Slider from 'Slider';
import Canvas from 'Canvas';

import 'styles/ColorPicker2';

export default class ColorPicker2 extends React.Component {

    constructor(props) {

        super(props);

        let color = colorutil.color(this.props.color);

        this.state = {
            a: color.hsv.a,
            h: color.hsv.h,
            sv: {
                x: color.hsv.s,
                y: (1 - color.hsv.v)
            },
            color
        }
    }

    getColor({
        h = this.state.h,
        sv = this.state.sv,
        a = this.state.a
    } = {}) {

        return colorutil.color({
            h, a,
            s: sv.x,
            v: (1 - sv.y)
        });
    }

    render() {

        return <div className='jargonelle color-picker2'>

            <Slider
                className='alpha'
                value={this.state.a} 
                onChange={(a) => {
                    let color = this.getColor({a});
                    this.setState({a, color});
                    this.props.onChange(color);
                }} />

            <Slider
                className='hue'
                orientation='vertical' 
                value={this.state.h} 
                style={{backgroundColor:'#FF0000'}}
                onChange={(h) => {
                    let color = this.getColor({h});
                    this.setState({h, color});
                    this.props.onChange(color);
                }} />
            
            <Canvas
                className='saturation-value'
                value={this.state.sv} 
                style={{backgroundColor: this.state.color.hue().hex}}
                onChange={(sv) => {
                    let color = this.getColor({sv});
                    this.setState({sv, color});
                    this.props.onChange(color);
                }} />
        </div>
    }
}

ColorPicker2.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func
}

ColorPicker2.defaultProps = {
    color: 0xFF0000,
    // onChange: _.noop
}