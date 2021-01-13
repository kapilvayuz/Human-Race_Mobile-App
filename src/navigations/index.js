import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import AuthLoadingScreen from './AuthLoading'
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';

const RootNavigator = createSwitchNavigator(
  {
    AuthLoading:AuthLoadingScreen,
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(RootNavigator);
