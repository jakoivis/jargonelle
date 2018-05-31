
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Bounds from 'hocs/Bounds';

class HsvCanvas extends React.Component {

    constructor(props) {

        super(props);

        let color = colorutil.color(this.props.color);
        let hue = color.hue();

        this.state = {
            ...this.colorToXY(color),
            hue, color,
            dragging: false
        };

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

        this.setState({
            dragging: false
        });
    }

    onMouseDown(event) {

        let point = this.calculatePointerPosition(event);
        let color = this.xyToColor(point);

        this.setState({
            ...point,
            color,
            dragging: true
        });

        this.props.onChange(color);
    }

    onMouseMove(event) {

        if (this.state.dragging) {

            let point = this.calculatePointerPosition(event);
            let color = this.xyToColor(point);

            this.setState({...point, color});
            this.props.onChange(color);
        }
    }

    calculatePointerPosition(event) {

        let orientation = this.props.orientation;
        let bounds = this.props.bounds;
        let w = bounds.width;
        let h = bounds.height;
        let y = h / 2;
        let x = w / 2;

        if (orientation !== 'horizontal') {
            
            y = event.clientY - bounds.top;
            y = y < 0 ? 0 : y > h ? h : y;
        }

        if (orientation !== 'vertical') {
            
            x = event.clientX - bounds.left;
            x = x < 0 ? 0 : x > w ? w : x;
        }

        return {x, y};
    }

    xyToColor(point) {

        let bounds = this.props.bounds;
        let normalizedX = point.x / bounds.width;
        let normalizedY = 1 - (point.y / bounds.height);

        return colorutil.color({h: 0, s: normalizedX, v: normalizedY})
            .hueFromColor(this.state.hue);
    }

    colorToXY(color) {

        let bounds = this.props.bounds;

        return {
            x: color.hsv.s * bounds.width,
            y: (1 - color.hsv.v) * bounds.height
        };
    }

    render() {

        let dragging = this.state.dragging ? ' dragging' : '';

        return <div 
            className='track' 
            onMouseDown={this.onMouseDown} 
            style={{backgroundColor: this.state.hue.hex}}>

            <div
                className={`selection-container${dragging}`}
                style={{
                    left: this.state.x,
                    top: this.state.y
                }}>

                <div 
                    className='selection'
                    style={{backgroundColor: this.state.color.hex}} />

            </div>

        </div>
    }
}

HsvCanvas.propTypes = {
    color: PropTypes.any,
    orientation: PropTypes.oneOf(['vertical', 'horizontal', 'both']),
    onChange: PropTypes.func
}

HsvCanvas.defaultProps = {
    color: '#ff0000',
    orientation: 'both',
    onChange: _.noop
}

export default Bounds(HsvCanvas, {
    className: 'hsv-canvas'
});