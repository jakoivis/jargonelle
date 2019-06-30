
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import 'styles/SnapDragGrid.styl';

export default class SnapDragGrid extends React.Component {

    constructor(props) {

        super(props);

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onGridMouseDown = this.onGridMouseDown.bind(this);
        this.onPointMouseDown = this.onPointMouseDown.bind(this);

        let pointData = _.map(this.props.data, point => {

            // visible: used to toggle point visibility to indicate
            //      that it's being removed when dragged out of grid
            // x, y: point position on local coordiates
            // key: used as a key for react components
            return {
                ...point,
                visible: true,
                key: this.getNextKey(),
                x: point.x * this.props.width,
                y: point.y * this.props.height
            };
        });

        this.state = {
            pointData: pointData,
            xLineData: this.getLineData(pointData, 'x'),
            yLineData: this.getLineData(pointData, 'y'),
            activePointKey: null
        };
    }

    getNextKey() {

        this.keyCounter = (this.keyCounter || 0) + 1;

        return String(this.keyCounter);
    }

    componentDidMount() {

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    componentWillUnmount() {

        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    onGridMouseDown(event) {

        let className = event.target.getAttribute('class');

        if (className !== 'points') {
            return;
        }

        this.createNewActivePoint(event);
    }

    onPointMouseDown(event) {

        const key = event.currentTarget.dataset.key;

        this.setState(() => ({
            activePointKey: key
        }));

        this.updateLines();
    }

    onMouseUp(event) {

        let position = this.getMousePosition(event);

        if (this.isPositionOutsideBounds(position)) {

            this.removeActivePoint();
        }

        this.setState(() => ({
            activePointKey: null
        }));

        this.updateLines();
    }

    onMouseMove(event) {

        if (this.state.activePointKey) {

            this.updateActivePoint(event);
        }
    }

    /**
     * Generate line data from point data
     *
     * @param      {Array}  pointData       The point data
     * @param      {String}  axis           x or y indicating the axis
     * @param      {String}  [activePointKey]  filter away active point if specified
     * @return     {Array}
     */
    getLineData(pointData, axis, activePointKey=null) {

        return _.chain(pointData)
            .filter(point => point.key !== activePointKey)
            .map(point => ({
                key: this.getNextKey(),
                [axis]: point[axis]
            }))
            .uniqBy(axis)
            .value();
    }

    updateLines() {

        this.setState(prevState => ({
            xLineData: this.getLineData(prevState.pointData, 'x', prevState.activePointKey),
            yLineData: this.getLineData(prevState.pointData, 'y', prevState.activePointKey)
        }));
    }

    updateActivePoint(event) {

        let pointData = _.cloneDeep(this.state.pointData);
        let dataItem = _.find(pointData, ['key', this.state.activePointKey]);

        if (dataItem) {

            let position = this.getMousePosition(event);
            let limitedPosition = this.limitPositionToBounds(position);

            let xSnapLine = this.getSnapLine(position, 'x');
            let ySnapLine = this.getSnapLine(position, 'y');

            dataItem.x = xSnapLine ? xSnapLine.x : limitedPosition.x;
            dataItem.y = ySnapLine ? ySnapLine.y : limitedPosition.y;

            dataItem.visible = !this.isPositionOutsideBounds(position);

            pointData = _.sortBy(pointData, ['y', 'x']);

            let callbackData = _.map(pointData, point => ({
                ...point,
                x: point.x / this.props.width,
                y: point.y / this.props.height
            }));

            this.props.onChange(callbackData);

            this.setState(() => ({
                pointData: pointData
            }));
        }
    }

    getSnapLine(position, axis) {

        let snapDistance = this.props.snapDistance;
        let lineData = this.state[axis + 'LineData'];

        return _.find(lineData, line => {

            return position[axis] !== line[axis] &&
                position[axis] > line[axis] - snapDistance &&
                position[axis] < line[axis] + snapDistance;
        });
    }

    createNewActivePoint(event) {

        let pointData = _.cloneDeep(this.state.pointData);
        let position = this.getMousePosition(event);
        let limitedPosition = this.limitPositionToBounds(position);
        let newItem = this.props.createNewPointData(limitedPosition.x, limitedPosition.y);

        newItem = newItem || {};
        newItem.key = this.getNextKey();
        newItem.x = limitedPosition.x;
        newItem.y = limitedPosition.y;
        newItem.visible = !this.isPositionOutsideBounds(position);

        pointData.push(newItem);

        this.setState(() => ({
            pointData: pointData,
            activePointKey: newItem.key
        }));
    }

    removeActivePoint() {

        let pointData = _.cloneDeep(this.state.pointData);

        _.remove(pointData, point => {

            return point.key === this.state.activePointKey;
        });

        this.setState(() => ({
            pointData: pointData
        }));
    }

    getMousePosition(event) {

        let bounds = this.root.getBoundingClientRect();
        let x = event.clientX - bounds.left;
        let y = event.clientY - bounds.top;

        return {
            x: x,
            y: y
        };
    }

    limitPositionToBounds(position) {

        let x = position.x;
        let y = position.y;
        let w = this.props.width;
        let h = this.props.height;

        return {
            y: y < 0 ? 0 : y > h ? h : y,
            x: x < 0 ? 0 : x > w ? w : x
        };
    }

    isPositionOutsideBounds(position) {

        let w = this.props.width;
        let h = this.props.height;
        let x = position.x;
        let y = position.y;
        let padding = this.props.removeDistance;

        return y < -padding  || y > h + padding ||
            x < -padding || x > w + padding;
    }

    renderLines() {

        let xlines = _.map(this.state.xLineData, line => {

            return <div
                key={line.key}
                className='xline'
                style={{
                    left: line.x
                }} />
        });

        let ylines = _.map(this.state.yLineData, line => {

            return <div
                key={line.key}
                className='yline'
                style={{
                    top: line.y
                }}/>
        });

        return [...xlines, ...ylines];
    }

    renderPoints() {

        return _.map(this.state.pointData, point => {

            if (!point.visible) {
                return null;
            }

            let isDragging = this.state.activePointKey === point.key;
            let className = 'selection-container';

            if (isDragging) {
                className += ' dragging';
            }

            return <div
                className={className}
                onMouseDown={this.onPointMouseDown}
                data-key={point.key}
                key={point.key}
                style={{
                    top: point.y,
                    left: point.x
                }}>

                {React.createElement(this.props.pointComponent, point)}

            </div>
        });
    }

    render() {

        return <div
            ref={root => this.root = root}
            className='snap-drag-grid'
            onMouseDown={this.onGridMouseDown}
            style={{
                width: this.props.width,
                height: this.props.height
            }}>

            <div className='content'>

                <div className='lines'>

                    {this.renderLines()}

                </div>

                <div className='points'>

                    {this.renderPoints()}

                </div>

            </div>

        </div>
    }
}

function DefaultPointContent(props) {

    return <div
        className='selection' />
}

SnapDragGrid.propTypes = {
    pointComponent: PropTypes.func,
    removeDistance: PropTypes.number,
    snapDistance: PropTypes.number,
    createNewPointData: PropTypes.func,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    ),
    onChange: PropTypes.func
}

SnapDragGrid.defaultProps = {
    pointComponent: DefaultPointContent,
    removeDistance: 50,
    snapDistance: 8,
    createNewPointData: _.noop,
    data: [],
    onChange: _.noop
}