import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, boolean} from '@storybook/addon-knobs/react';
import SnapDragGrid from 'SnapDragGrid';

storiesOf('SnapDragGrid', module)
    .addDecorator(withKnobs)
    .add('SnapDragGrid', () => (
        <SnapDragGrid
                width={150}
                height={150}
                data={[
                    {x:0, y:0}, {x:1, y:0},
                    {x:0.5, y:0.5},
                    {x:0, y:1}, {x:1, y:1}]}
                />
    ));
