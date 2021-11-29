import React from 'react';
import Canvas from 'Canvas';

const Template = (args) => <Canvas {...args} style={{
        width: '300px',
        height: '150px'
    }} />;

export const canvas = Template.bind({});
canvas.args = {
    trackStyle:{
        backgroundColor: '#444'
    },
};

export const CanvasAnother = Template.bind({});
CanvasAnother.args = {...canvas.args }

export default {
    title: 'Components/Canvas',
    component: Canvas,
    argTypes: {
        onChange: {
            action: 'onChange',
        },
        onDragChange: {
            action: 'onDragChange',
        },
    }
};