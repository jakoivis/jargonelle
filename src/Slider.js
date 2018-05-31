
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Bounds from 'hocs/Bounds';

class Slider extends React.Component {

    constructor(props) {

        super(props);

        let point = this.limitPoint(this.valueToPoint(this.props.value));
        let value = this.pointToValue(point);

        this.state = {...point, value, dragging: false};

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    componentDidMount() {

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {

        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    onMouseUp() {

        this.setState({dragging: false});
    }

    onMouseDown(event) {

        let point = this.calculatePointerPosition(event);
        let value = this.pointToValue(point);

        this.setState({...point, value, dragging: true});
        this.props.onChange(value);
    }

    onMouseMove(event) {

        if (this.state.dragging) {

            let point = this.calculatePointerPosition(event);
            let value = this.pointToValue(point);

            this.setState({...point, value});
            this.props.onChange(value);
        }
    }

    calculatePointerPosition(event) {

        let {orientation, bounds} = this.props;
        let w = bounds.width;
        let h = bounds.height;
        let x, y;

        if (orientation === 'horizontal') {
            
            x = event.clientX - bounds.left;
            y = h / 2;
        
        } else {
            
            y = event.clientY - bounds.top;
            x = w / 2;
        }

        return this.limitPoint({x, y});
    }

    limitPoint(point) {

        let {orientation, bounds} = this.props;
        let w = bounds.width;
        let h = bounds.height;
        let {x, y} = point;

        if (orientation === 'horizontal') {
            
            return {x: x < 0 ? 0 : x > w ? w : x, y};
        }

        return {y: y < 0 ? 0 : y > h ? h : y, x};
    }

    pointToValue(point) {

        let {max, min, bounds, orientation} = this.props;
        let size = bounds.height;
        let position = point.y;

        if (orientation === 'horizontal') {

            size = bounds.width;
            position = bounds.x;
        }

        return min + (position / size) * (max - min);
    }

    valueToPoint(value) {

        let {max, min, bounds, orientation} = this.props;

        if (orientation === 'horizontal') {

            return {
                x: ((value - min) / (max - min)) * bounds.width,
                y: bounds.height / 2
            }
        }

        return {
            y: ((value - min) / (max - min)) * bounds.height,
            x: bounds.width / 2
        }
    }

    render() {

        let dragging = this.state.dragging ? ' dragging' : '';

        return <div 
            className={`track ${this.props.orientation}`}
            onMouseDown={this.onMouseDown} 
            style={this.props.style}>

            <div
                className={`selection-container${dragging}`}
                style={{
                    left: this.state.x,
                    top: this.state.y
                }}>

                <div 
                    className='selection'
                    style={this.props.thumbStyle} />

            </div>

        </div>
    }
}

Slider.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number
    ]),
    min: PropTypes.oneOfType([
        PropTypes.number
    ]),
    max: PropTypes.oneOfType([
        PropTypes.number
    ]),
    style: PropTypes.object,
    thumbStyle: PropTypes.object,
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    onChange: PropTypes.func
}

Slider.defaultProps = {
    value: 0,
    min: 0,
    max: 1,
    style: {},
    thumbStyle: {},
    orientation: 'horizontal',
    onChange: _.noop
}

export default Bounds(Slider, {
    className: 'slider'
});