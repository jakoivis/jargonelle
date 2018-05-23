
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import HsvCanvas from 'colorPicker2/HsvCanvas.js';

export default class HsvPicker extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            x: this.props.x,
            y: this.props.y,
            dragging: false
        };

        this.onChange = this.onChange.bind(this);
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

    componentWillReceiveProps(nextProps) {

        if (nextProps.x !== this.props.x) {

            this.setState({
                x: nextProps.x,
            });
        }

        if (nextProps.y !== this.props.y) {

            this.setState({
                y: nextProps.y
            });
        }
    }

    onChange(color, x, y) {

        this.setState({
            x: x,
            y: y
        });

        this.props.onChange(color, x, y);
    }

    onMouseUp() {

        this.setState({
            dragging: false
        });
    }

    onMouseDown(event) {

        this.setState({
            ...this.calculatePointerPosition(event),
            dragging: true
        });
    }

    onMouseMove(event) {

        console.log(event);
        if (this.state.dragging) {

            this.setState(this.calculatePointerPosition(event));
        }
    }

    calculatePointerPosition(event) {

        let bounds = event.target.getBoundingClientRect();
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;
        let w = bounds.width;
        let h = bounds.height;

        y = y < 0 ? 0 : y > h ? h : y;
        x = x < 0 ? 0 : x > w ? w : x;

        return {x, y};
    }

    render() {


        let draggerClassName = 'selection-container' + 
            (this.state.dragging ? ' dragging' : '');

        return <div 
            className='hsv-picker'
            onMouseDown={this.onMouseDown}>

            <HsvCanvas hue={this.props.hue} />

            <div
                className={draggerClassName}
                style={{
                    left: this.state.x,
                    top: this.state.y
                }}>

                <div className='selection' />

            </div>

        </div>;
    }
}

HsvPicker.propTypes = {
    hue: PropTypes.string,
    // x: PropTypes.number,
    // y: PropTypes.number
}

HsvPicker.defaultProps = {
    hue: '#ff0000',
    // x: 0,
    // y: 0
}