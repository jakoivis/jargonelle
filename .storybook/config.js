import { configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setAddon(JSXAddon);
configure(loadStories, module);
