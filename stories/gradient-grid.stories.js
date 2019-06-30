
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, boolean} from '@storybook/addon-knobs/react';
import GradientGrid from 'GradientGrid';

storiesOf('GradientGrid', module)
    .addDecorator(withKnobs)
    .add('GradientGrid', () => (
        <GradientGrid
            width={150}
            height={150}
            colors={
                [[{r:255}, {g:255}],[{b:255}, {r:255, g: 255}]]
            }/>
    ));

