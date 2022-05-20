import { config } from '@vue/test-utils';
import { findByTestIdPlugin } from './findByTestId.js';
import { findByTestCodePlugin } from './findByTestCode.js';
import { openComboboxPlugin, selectComboboxItemPlugin } from './FCombobox/FCombobox.js';
import { removeAttributesPlugin } from './removeAttributes/removeAttributes.js';

const { VueWrapper } = config.plugins;

VueWrapper.install(findByTestIdPlugin);
VueWrapper.install(findByTestCodePlugin);
VueWrapper.install(openComboboxPlugin);
VueWrapper.install(selectComboboxItemPlugin);
VueWrapper.install(removeAttributesPlugin);
