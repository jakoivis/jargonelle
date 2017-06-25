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
    width: 5,
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
            grayScaleMatrix: [[0xFFFFFF, 0xFFFFFF],[0]]
        }
    }

    onGradientChange(color) {
        console.log("hue", ColorUtil.int.toHex(color));
        this.setState({
            grayScaleMatrix: [[0xFFFFFF, color], [0]],
            hueColor: color
        });
    }

    onGrayScaleChange(color) {
        console.log("gray", ColorUtil.int.toHex(color))
        // console.log("hue", ColorUtil.int.toHex(getClosestColor(color, verticalHue.gradient)));
        this.props.onChange(color);

        this.setState({
            grayScaleColor: color
        });
    }

    render() {
        return <div
            className={getClassName(this.props, 'color-picker')}>

            <ColorMatrix
                className='grayScale'
                width={200}
                colors={this.state.grayScaleMatrix} 
                onValueChange={this.onGrayScaleChange}>

                <Selection color={this.state.grayScaleColor} />

            </ColorMatrix>

            <ColorMatrix
                className='hue'
                height={verticalHue.height}
                width={verticalHue.width}
                colors={verticalHue.gradient}
                lockXAxis={verticalHue.lockXAxis}
                lockYAxis={verticalHue.lockYAxis}
                onChange={this.onGradientChange}>

                <Selection color={this.state.hueColor} />

            </ColorMatrix>
        </div>
    }
}

function Selection(props) {
    let color = ColorUtil.int.toHex(props.color);

    return <div 
        className='selection' 
        style={{backgroundColor: color}} />
}

ColorPicker.propTypes = {
    color: PropTypes.number,
    onChange: PropTypes.func
}

ColorPicker.defaultProps = {
    color: 0xFF0000,
    onChange: _.noop
}

function getClosestColor(color, hues) {
    hues = _.flattenDeep(hues);

    let c = ColorUtil.int.toObj(color);
    let m;
    let mDiff;

    _.forEach(hues, hue => {
        let o = ColorUtil.int.toObj(hue);

        if (!m) {
            m = o;
            mDiff = (o.r - c.r) + (o.g - c.g) + (o.b - c.b); 
        } else {
            let diff = (o.r - c.r) + (o.g - c.g) + (o.b - c.b);

            if(diff > mDiff) {
                m = o;
                mDiff = diff;
            }
        }
    });

    return ColorUtil.obj.toInt(m);
}