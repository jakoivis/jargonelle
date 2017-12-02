
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import ColorInputs from './ColorInputs.jsx';
import HueGrayscaleMatrix from './HueGrayscaleMatrix.jsx';
import HueSliderPalette from './HueSliderPalette.jsx';
import ColorPickerPanel from './ColorPickerPanel.jsx';

import getClassName from '../util/getClassName.js';

import '../styles/colorPicker/ColorPicker.styl';

export default class ColorPicker extends React.Component {

    constructor(props) {

        super(props);

        this.onSwatchClick = this.onSwatchClick.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);

        this.state = {
            color: colorutil.color(this.props.color),
            visible: false
        }
    }

    onSwatchClick() {

        this.setState({
            visible: !this.state.visible
        });
    }

    onClickOutside() {

        this.setState({
            visible: false
        });
    }

    onColorChange(color) {

        this.setState({
            color: color
        });
    }

    render() {

        return <div className='color-picker'>
            <ColorSwatch
                onClick={this.onSwatchClick}
                color={this.state.color}>

            </ColorSwatch>

            {
                this.state.visible &&

                <ColorPickerPanel
                    onClickOutside={this.onClickOutside}
                    onChange={this.onColorChange}
                    color={this.state.color}
                    className='' />
            }

        </div>
    }
}

function ColorSwatch(props) {

    return <div
        className='color-picker-swatch'
        onClick={props.onClick}
        style={{
            backgroundColor: props.color.hex
        }} />
}

ColorPicker.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func
}

ColorPicker.defaultProps = {
    color: 0xFF0000,
    onChange: _.noop
}