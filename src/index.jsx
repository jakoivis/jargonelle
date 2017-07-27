import ReactDOM from 'react-dom';
import React from 'react';
import ColorUtil from 'color-util';
import ColorPicker from './ColorPicker.jsx';
import ColorMatrix from './ColorMatrix.jsx';
import HSVGrayscaleMatrix from './HSVGrayscaleMatrix.jsx';
import './styles/samples.styl';
import './styles/common.styl';

class Components extends React.Component {

    constructor(props) {
        super(props);

        this.onColorChange.bind(this);
    }

    onColorChange(color) {
        document.body.style.backgroundColor = ColorUtil.int.toHex(color);
    }
// <ColorPicker
//                 onChange={this.onColorChange}
//                 color={0x125569}
//                 className='' />
    render() {
        return <div>
            <HSVGrayscaleMatrix onChange={function(rgb, matrix, matryxy) {
                console.log(rgb, matrix, matryxy)
            }}/>
        </div>
    }
}

let div = document.createElement('div');
document.body.appendChild(div)

ReactDOM.render(<Components/>, div);