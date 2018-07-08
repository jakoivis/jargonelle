
import React from 'react';

export const CanvasDefaultThumb = props => (
    <div className='thumb default-thumb' style={props.thumbStyle} />
);

CanvasDefaultThumb.toString = () => 'CanvasDefaultThumb';

export const TriangleThumbVertical = props => (
    <svg className='triangle-thumb'>
        <polygon points='0,0 0,16 10,8'/>
    </svg>
);

TriangleThumbVertical.toString = () => 'TriangleThumbVertical';

export const TriangleThumbHorizontal = props => (
    <svg className='triangle-thumb'>
        <polygon points='0,10 16,10 8,0'/>
    </svg>
);

TriangleThumbHorizontal.toString = () => 'TriangleThumbHorizontal';