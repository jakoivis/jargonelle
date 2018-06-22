
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Slider from 'Slider';
import Canvas from 'Canvas';
import ColorInputs from 'ColorInputs';

import 'styles/common';
import 'styles/ColorPicker';

export default class ColorPicker extends React.Component {

    constructor(props) {

        super(props);

        let color = colorutil.color(this.props.color);

        this.state = this.colorToState(color);
    }

    stateToColor({
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

    colorToState(color) {

        return {
            a: color.hsv.a,
            h: color.hsv.h,
            sv: {
                x: color.hsv.s,
                y: (1 - color.hsv.v)
            },
            color
        }
    }

    render() {

        return <div 
            className='jargonelle color-picker' 
            style={this.props.style}>

            <Slider
                className='hue'
                orientation='vertical' 
                value={this.state.h} 
                style={{backgroundColor:'#FF0000'}}
                thumb={TriangleThumbVertica}
                onChange={(h) => {
                    let color = this.stateToColor({h});
                    this.setState({h, color});
                    this.props.onChange(color);
                }} />

            <div className='content'>

                <Canvas
                    className='saturation-value'
                    value={this.state.sv} 
                    style={{backgroundColor: this.state.color.hue().hex}}
                    thumbStyle={{backgroundColor: this.state.color.hex}}
                    onChange={(sv) => {
                        let color = this.stateToColor({sv});
                        this.setState({sv, color});
                        this.props.onChange(color);
                    }} />

                {
                    this.props.alpha && 

                    <Slider
                        className='alpha'
                        value={this.state.a} 
                        thumb={TriangleThumbHorizontal}
                        onChange={(a) => {
                            let color = this.stateToColor({a});
                            this.setState({a, color});
                            this.props.onChange(color);
                        }} />
                }

                <ColorInputs 
                    color={this.state.color}
                    types={this.props.inputs}
                    onChange={color => {
                        this.setState(this.colorToState(color));
                        this.props.onChange(color);
                    }} />

            </div>
        </div>
    }
}

const TriangleThumbVertica = props => (
    <svg className='triangle-thumb'>
        <polygon points='0,0 0,16 10,8'/>
    </svg>
);

const TriangleThumbHorizontal = props => (
    <svg className='triangle-thumb'>
        <polygon points='0,10 16,10 8,0'/>
    </svg>
);

ColorPicker.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func,
    inputs: PropTypes.array,
    alpha: PropTypes.bool,
    style: PropTypes.object
}

ColorPicker.defaultProps = {
    color: '#ff0000',
    onChange: _.noop,
    inputs: [],
    alpha: false,
    style: {}
}
