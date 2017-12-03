
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import ColorInputs from './ColorInputs.jsx';
import HueGrayscaleMatrix from './HueGrayscaleMatrix.jsx';
import HueSliderPalette from './HueSliderPalette.jsx';

import ClickOutside from '../ClickOutside.jsx';

const HUE_GRADIENT = colorutil.rgb.hueColors();
const HUE_MATRIX = [colorutil.rgb.hueColors()];

class ColorPickerPanel extends React.Component {

    constructor(props) {

        super(props);

        this.onHueChange = this.onHueChange.bind(this);
        this.onHueGrayScaleChange = this.onHueGrayScaleChange.bind(this);
        this.onInputsChange = this.onInputsChange.bind(this);

        let color = colorutil.color(this.props.color);
        let hue = color.hue();

        this.state = {
            color: color,
            hue: hue
        }
    }

    onHueChange(hue) {

        let newColor = this.state.color.hueFromColor(hue);

        this.setState({
            color: newColor,
            hue: hue
        });

        this.props.onChange(newColor);
    }

    onHueGrayScaleChange(color) {

        this.setState({
            color: color
        });

        this.props.onChange(color);
    }

    onInputsChange(color) {

        this.setState({
            color: color,
            hue: color.hue()
        });

        this.props.onChange(color);
    }

    render() {

        return <div
            className='color-picker-panel'>

            <HueSliderPalette
                height={280}
                width={10}
                color={this.state.hue}
                onChange={this.onHueChange}>

                <HueSelection />

            </HueSliderPalette>

            <div className='right'>

                <HueGrayscaleMatrix
                    className='gray-scale'
                    width={200}
                    height={200}
                    hue={this.state.hue}
                    color={this.state.color}
                    onChange={this.onHueGrayScaleChange}>

                    <GrayScaleSelection color={this.state.color} />

                </HueGrayscaleMatrix>

                <ColorInputs
                    color={this.state.color}
                    onChange={this.onInputsChange}
                    types={['hex', 'cssrgb']} />

            </div>

        </div>
    }
}

function GrayScaleSelection(props) {

    return <div
        className='selection'
        style={{backgroundColor: props.color.hex}} />
}

function HueSelection() {

    return <svg className="selection">

        <polygon points="0,0 0,16 10,8"/>

    </svg>
}

ColorPickerPanel.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func
};

ColorPickerPanel.defaultProps = {
    color: 0xFF0000,
    onChange: _.noop
};

export default ClickOutside(ColorPickerPanel);