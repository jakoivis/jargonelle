
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

import Gradient from 'colorPicker/Gradient';

import getClassName from 'util/getClassName';

import 'styles/colorPicker/GradientPicker';

export default class GradientPickerGrid extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            positions: this.props.positions || []
        };

        this.onChange = this.onChange.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        let positionsChanged = nextProps.positions !== this.props.positions;

        if (positionsChanged) {

            this.setState({
                positions: nextProps.positions
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

    renderThumb(position) {

        let element = React.createElement(this.props.thumbComponent);

        return <div
            key={position.x + ';' + position.y}
            className="selection-container"
            style={{
                left: position.x * this.props.width,
                top: position.y * this.props.height
            }}>

            {element}

        </div>
    }

    render() {

        return <div
            className={getClassName('gradient-picker-grid', this.props, this.state)}>

            <Gradient
                {...this.props}
                onChange={this.onChange}
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown} />

            {
                _.map(this.state.positions, this.renderThumb)
            }

        </div>;
    }
}

function DefaultThumb(props) {

    return <div className='selection' />
}

GradientPickerGrid.propTypes = {
    thumbComponent: PropTypes.func,
    positions: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    )
}

GradientPickerGrid.defaultProps = {
    thumbComponent: DefaultThumb,
    positions: []
}