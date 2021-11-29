import React from 'react';
import ColorPicker from 'ColorPicker';

const Template = (args) => <ColorPicker {...args} />;

export const colorPicker = Template.bind({});
colorPicker.args = {
};

export default {
    title: 'Components/ColorPicker',
    component: ColorPicker,
    argTypes: {
    }
};