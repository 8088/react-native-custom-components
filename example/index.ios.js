/**
 * Sample React Native Custom Component
 * https://github.com/8088
 * @flow
 */
import { AppRegistry } from 'react-native';

import App from './app/';

global._isIOS=true;
global._isAndroid=false;

AppRegistry.registerComponent('CustomComponent', () => App);
