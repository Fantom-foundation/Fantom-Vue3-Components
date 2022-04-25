import { config } from '@vue/test-utils';
import { findByTestIdPlugin } from './findByTestId.js';
import { findByTestCodePlugin } from './findByTestCode.js';

config.plugins.VueWrapper.install(findByTestIdPlugin);
config.plugins.VueWrapper.install(findByTestCodePlugin);
