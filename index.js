/**
 * @format
 */
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto'
import { AppRegistry } from 'react-native';
import App from './App';
import { Buffer } from 'buffer'
import { name as appName } from './app.json';
import * as encoding from 'text-encoding'

global.Buffer = Buffer;

AppRegistry.registerComponent(appName, () => App);
