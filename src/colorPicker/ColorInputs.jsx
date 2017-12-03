
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import colorutil from 'color-util';

export default class ColorInputs extends React.Component {

    constructor(props) {

        super(props);

        this.onInputChange = this.onInputChange.bind(this);

        let color = colorutil.color(this.props.color);
        let inputValues = this.getInputValuesFromColor(color);

        this.state = {
            color: color,
            inputValues: inputValues
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.color !== this.props.color) {

            let color = colorutil.color(nextProps.color);
            let inputValues = this.getInputValuesFromColor(color);

            this.setState({
                color: color,
                inputValues: inputValues
            });
        }
    }

    getInputValuesFromColor(color) {

        return _.map(this.props.types, (type) => {

            return {
                type: type,
                value: color[type]
            };
        });
    }

    onInputChange(event) {

        let type = event.target.name;
        let value = event.target.value;
        let inputValues = this.state.inputValues;
        let inputObject = _.find(inputValues, ['type', type]);
        let isValid = colorutil[type].test(value);

        inputObject.value = value;

        this.setState({
            inputValues: inputValues
        });

        if (isValid) {

            let color = colorutil.color(value);

            this.props.onChange(color);
        }
    }

    renderInputs() {

        return _.map(this.state.inputValues, (inputObject) => {

            return (
                <input
                    key={inputObject.type}
                    name={inputObject.type}
                    type='text'
                    value={inputObject.value}
                    onChange={this.onInputChange} />
            );
        });
    }

    render() {

        return <div className='inputs'>
            {this.renderInputs()}
        </div>;
    }
}

ColorInputs.propTypes = {
    color: PropTypes.any,
    onChange: PropTypes.func,
    types: PropTypes.array
}

ColorInputs.defaultProps = {
    color: null,
    onChange: _.noop,
    types: ['hex']
}