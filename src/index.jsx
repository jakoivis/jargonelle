import ReactDOM from 'react-dom';
import React from 'react';
import ColorUtil from 'color-util';
import ColorPicker from './ColorPicker.jsx';
import './styles/samples.styl';

class Components extends React.Component {

    constructor(props) {
        super(props);

        this.onColorChange.bind(this);
    }

    onColorChange(color) {
        document.body.style.backgroundColor = ColorUtil.int.toHex(color);
    }

    render() {
        return <div>
            <ColorPicker
                onChange={this.onColorChange}
                color={0x125569}
                className='' />
        </div>
    }
}

let div = document.createElement('div');
document.body.appendChild(div)

ReactDOM.render(<Components/>, div);