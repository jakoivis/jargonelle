import React from 'react';
import ColorInputs from 'ColorInputs';

const Template = (args) => <ColorInputs {...args} />;

export const colorInputs = Template.bind({});
colorInputs.args = {
    types: ['hex', 'cssrgb'],
    color: '#00ff00'
};

export const AnotherExample = Template.bind({});
AnotherExample.args = {...colorInputs.args }

export default {
    title: 'Components/ColorInputs',
    component: ColorInputs,
    argTypes: {
        onChange: {
            action: 'onChange',
        }
    }
};