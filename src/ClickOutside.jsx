
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

export default (Component) => class ClickOutside extends React.Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {

        document.removeEventListener('click', this.handleClick);
    }

    handleClick(event) {

        if (this.component) {

            let rootNode = ReactDOM.findDOMNode(this.component);

            if (rootNode && !rootNode.contains(event.target)) {

                if (this.props.onClickOutside) {

                    this.props.onClickOutside();
                }
            }
        }
    }

    render() {

        return <Component
            ref={(component) => {this.component = component; }}
            {...this.props}
        />
    }
}