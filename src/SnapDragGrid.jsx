
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import './styles/SnapDragGrid.styl';

export default class SnapDragGrid extends React.Component {

    constructor(props) {

        super(props);

        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onGridMouseDown = this.onGridMouseDown.bind(this);
        this.onPointMouseDown = this.onPointMouseDown.bind(this);

        this.keyCounter = 0;
        this.activePointKey = null;

        let pointData = _.map(this.props.data, (point) => {

            this.keyCounter += 1;

            return {
                key: String(this.keyCounter),
                x: point.x * this.props.width,
                y: point.y * this.props.height,
                visible: true
            }
        });

        this.state = {
            pointData: pointData,
            xLineData: this.getLineData(pointData, 'x'),
            yLineData: this.getLineData(pointData, 'y'),
            activePointKey: null
        };
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

        this.setState(() => {

            return {
                activePointKey: key
            }
        });
    }

    onMouseUp(event) {

        let position = this.getMousePosition(event);

        if (this.isPositionOutsideBounds(position, this.props.removeDistance)) {

            this.removeActivePoint();
        }

        this.setState(() => {

            return {
                activePointKey: null
            }
        });

        this.updateLines();
    }

    onMouseMove(event) {

        if (this.state.activePointKey) {

            this.updateActivePoint(event);
            this.updateLines();
        }
    }

    // TODO: keys will be updated whenever point is dragged
    getLineData(pointData, axis, activePointKey=null) {

        return _.chain(pointData)
            .filter(point => point.key !== activePointKey)
            .map(point => {

                this.keyCounter += 1;

                let line = {
                    key: String(this.keyCounter)
                };

                line[axis] = point[axis];

                return line;
            })
            .uniqBy(axis)
            .value();
    }

    updateLines() {

        this.setState((prevState) => {

            return {
                xLineData: this.getLineData(prevState.pointData, 'x', prevState.activePointKey),
                yLineData: this.getLineData(prevState.pointData, 'y', prevState.activePointKey)
            }
        });
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

            dataItem.visible = !this.isPositionOutsideBounds(
                position, this.props.removeDistance);

            this.props.onChange(pointData);

            this.setState(() => {

                return {
                    pointData: pointData
                }
            });
        }
    }

    getSnapLine(position, axis) {

        let snapDistance = this.props.snapDistance;
        let lineData = this.state[axis + 'LineData'];

        return _.find(lineData, (line) => {

            return position[axis] !== line[axis] &&
                position[axis] > line[axis] - snapDistance &&
                position[axis] < line[axis] + snapDistance;
        });
    }

    createNewActivePoint(event) {

        this.keyCounter += 1;

        let key = String(this.keyCounter);
        let pointData = _.cloneDeep(this.state.pointData);
        let position = this.getMousePosition(event);
        let limitedPosition = this.limitPositionToBounds(position);

        pointData.push({
            key: key,
            x: limitedPosition.x,
            y: limitedPosition.y,
            visible: !this.isPositionOutsideBounds(
                position, this.props.removeDistance)
        });

        this.setState(() => {

            return {
                pointData: pointData,
                activePointKey: key
            }
        });
    }

    removeActivePoint() {

        let pointData = _.cloneDeep(this.state.pointData);

        _.remove(pointData, (point) => {

            return point.key === this.state.activePointKey;
        });

        this.setState(() => {

            return {
                pointData: pointData
            }
        });
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

    isPositionOutsideBounds(position, padding) {

        let w = this.props.width;
        let h = this.props.height;
        let x = position.x;
        let y = position.y;

        return y < -padding  || y > h + padding ||
            x < -padding || x > w + padding;
    }

    // onChange(color, x, y) {

    //     this.setState({
    //         x: x,
    //         y: y
    //     });

    //     this.props.onChange(color, x, y);
    // }

    // onMouseUp() {

    //     this.setState({
    //         css: {
    //             dragging: false
    //         }
    //     });
    // }

    // onMouseDown() {

    //     this.setState({
    //         css: {
    //             dragging: true
    //         }
    //     });
    // }

    renderLines() {

        let lines = _.map(this.state.xLineData, (line) => {

            return <div
                key={line.key}
                className='xline'
                style={{
                    left: line.x
                }} />
        });

        return lines.concat(_.map(this.state.yLineData, (line) => {

            return <div
                key={line.key}
                className='yline'
                style={{
                    top: line.y
                }}/>
        }));
    }

    renderPoints() {

        let childComponent = this.props.pointComponent;

        return _.map(this.state.pointData, point => {

            if (!point.visible) {

                return null;
            }

            return <div
                className='selection-container'
                onMouseDown={this.onPointMouseDown}
                data-key={point.key}
                key={point.key}
                style={{
                    top: point.y,
                    left: point.x
                }}>

                {React.createElement(childComponent)}

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

function DefaultPointContent() {

    return <div className='selection' />
}

SnapDragGrid.propTypes = {
    pointComponent: PropTypes.func,
    removeDistance: PropTypes.number,
    snapDistance: PropTypes.number,
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
    data: [],
    onChange: _.noop
}