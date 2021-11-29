import React from 'react';
import GradientGrid from 'GradientGrid';

const Template = (args) => <GradientGrid {...args}
    width={150}
    height={150}
    colors={
        [[{r:255}, {g:255}],[{b:255}, {r:255, g: 255}]]
    } />;

export const gradientGrid = Template.bind({});
gradientGrid.args = {
};

export default {
    title: 'Components/GradientGrid',
    component: GradientGrid,
    argTypes: {
    }
};

