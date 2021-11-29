import React from 'react';
import Slider from 'Slider';

const Template = (args) => <Slider {...args} />;

export const slider = Template.bind({});
slider.args = {
    style:{
        width: '300px',
        height: '15px'
    },
    trackStyle:{
        backgroundColor: '#444'
    }
};

export const SliderAnother = Template.bind({});
SliderAnother.args = {...slider.args }

export default {
    title: 'Components/Slider',
    component: Slider,
    argTypes: {
        onChange: {
            action: 'onChange',
        },
        onDragChange: {
            action: 'onDragChange',
        },
    }
};