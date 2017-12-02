
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Gradient from './Gradient.jsx';

import getClassName from '../util/getClassName.js';

import '../styles/colorPicker/GradientPicker.styl';

export default class GradientPicker extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            x: this.props.x,
            y: this.props.y
        };

        this.onChange = this.onChange.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        let xChanged = nextProps.x !== this.props.x;
        let yChanged = nextProps.y !== this.props.y;

        if (xChanged) {

            this.setState({
                x: nextProps.x,
            });
        }

        if (yChanged) {

            this.setState({
                y: nextProps.y
            })
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
            css: {
                dragging: false
            }
        });
    }

    onMouseDown() {

        this.setState({
            css: {
                dragging: true
            }
        });
    }

    render() {

        return <div
            className={getClassName('gradient-picker', this.props, this.state)}>

            <Gradient
                {...this.props}
                onChange={this.onChange}
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown} />

            <div
                className="selection-container"
                style={{
                    left: this.state.x,
                    top: this.state.y
                }}>

                {this.props.children}

            </div>

        </div>;
    }
}

GradientPicker.propTypes = {
    x: PropTypes.number,
    y: PropTypes.number
}

GradientPicker.defaultProps = {
    x: 0,
    y: 0
}