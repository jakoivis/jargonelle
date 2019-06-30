import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, array, boolean} from '@storybook/addon-knobs/react';
import Gradient from 'Gradient';

storiesOf('Gradient', module)
    .addDecorator(withKnobs)
    .add('Gradient', () => (
        <Gradient
            />
    ));


