/**
 * @format
 */

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as encoding from 'text-encoding';
import Buffer from 'buffer';

global.Buffer = Buffer.Buffer;


AppRegistry.registerComponent(appName, () => App);
