import React from 'react';
import SnapDragGrid from 'SnapDragGrid';

const Template = (args) => <SnapDragGrid {...args}
    width={150}
    height={150}
    data={[
        {x:0, y:0}, {x:1, y:0},
        {x:0.5, y:0.5},
        {x:0, y:1}, {x:1, y:1}]} />;

export const snapDragGrid = Template.bind({});
snapDragGrid.args = {
};

export default {
    title: 'Components/SnapDragGrid',
    component: SnapDragGrid,
    argTypes: {
    }
};
