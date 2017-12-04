
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Gradient from './colorPicker/Gradient.jsx';
import ColorPicker from './colorPicker/ColorPicker.jsx';

import './styles/GradientGrid.styl';

export default class GradientGrid extends React.Component {

    constructor(props) {

        super(props);

        let gradientData;
        let gradient = this.createGradient((data) => {
            gradientData = data;
        });

        this.state = {
            data: gradientData
        };

        console.log(gradientData);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    renderGrid() {

        let result = [];

        _.forEach(this.state.data, (row) => {

            result = result.concat(_.map(row.colors, (color) => {

                return <Thumb
                    key={color.x + ';' + row.y}
                    x={color.x * this.props.width}
                    y={row.y * this.props.height}
                    color={colorutil.color(color)}
                    />
            }));
        });

        return result;
    }

    createGradient(dataCallback) {

        return colorutil[this.props.colorType].gradient({
            colors: this.props.colors,
            type: this.props.type,
            defaultColor: this.props.defaultColor,
            width: this.props.width,
            height: this.props.height,
            centerX: this.props.centerX,
            centerY: this.props.centerY,
            scale: this.props.scale,
            scaleX: this.props.scaleX,
            scaleY: this.props.scaleY,
            translateX: this.props.translateX,
            translateY: this.props.translateY,
            centralize: this.props.centralize,
            rotation: this.props.rotation,
            repeatX: this.props.repeatX,
            repeatY: this.props.repeatY,
            onValidationComplete: dataCallback
        });
    }

    render() {

        return <div className='gradient-grid'>

            <Gradient {...this.props} colors={this.state.data} />

            <div className='grid'
                style={{
                    width: this.props.width,
                    height: this.props.height
                }}>

                {this.renderGrid()}

            </div>

        </div>
    }
}

function Thumb(props) {

    return <div
        className='selection-container'
        onClick={props.onClick}
        style={{
            top: props.y,
            left: props.x
        }}>

        <div
            className='selection'
        />

    </div>
}

GradientGrid.propTypes = {
    colorType: PropTypes.oneOf(['rgb', 'hsv', 'hsl']),
    // lockYAxis: PropTypes.bool,
    // lockXAxis: PropTypes.bool,
    // onChange: PropTypes.func,
    // onMouseDown: PropTypes.func,
    // onMouseUp: PropTypes.func,

    colors: PropTypes.array,
    type: PropTypes.string,
    defaultColor: PropTypes.object,
    width: PropTypes.number,
    height: PropTypes.number,
    centerX: PropTypes.number,
    centerY: PropTypes.number,
    scale: PropTypes.number,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    translateX: PropTypes.number,
    translateY: PropTypes.number,
    centralize: PropTypes.bool,
    rotation: PropTypes.number,
    repeatX: PropTypes.func,
    repeatY: PropTypes.func
}


GradientGrid.defaultProps = {
    colorType: 'rgb',
    // lockXAxis: false,
    // lockYAxis: false,
    // onChange: _.noop,
    // onMouseDown: _.noop,
    // onMouseUp: _.noop,

    colors: [
        colorutil.rgb.hueColors(),
        [{r: 0, g: 0, b: 0, a: 0}]
    ],
    type: 'linear',
    defaultColor: null,
    width: 100,
    height: 100,
    centerX: 0,
    centerY: 0,
    scale: 1,
    scaleX: null,
    scaleY: null,
    translateX: 0,
    translateY: 0,
    centralize: false,
    rotation: 0,
    repeatX: colorutil.repeat.repeat,
    repeatY: colorutil.repeat.repeat
}