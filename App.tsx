import React, {FunctionComponent} from 'react';
import {LogBox, Text} from 'react-native';
import 'react-native-gesture-handler';
import {TextInput} from 'react-native';
import 'react-native-reanimated';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import AuthStack from './src/app/(auth)/AuthStack';
import {store, persistor} from './src/redux/store';

LogBox.ignoreAllLogs();
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;
(TextInput as any).defaultProps.underlineColorAndroid = 'transparent';

const App: FunctionComponent<any> = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthStack />
    </PersistGate>
  </Provider>
);

export default App;
 
