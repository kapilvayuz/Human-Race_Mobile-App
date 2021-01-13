import {createStackNavigator} from 'react-navigation-stack';

import SignUpScreen from '../scenes/SignUp/index';
import TnCScreen from '../scenes/TnC/index'
import EmailnUser from '../scenes/EMnUN/index'
import OTPScreen from '../scenes/OTP/index'
import AddImage from '../scenes/ImageAdd/index'

import Categories from '../scenes/Categories/index'
import CreatePass from '../scenes/CreateForgotPassword/index'
import ForgetPass from '../scenes/ForgotPassword/index'
import Location from '../scenes/Location/index'
import Signin from '../scenes/SignIn/index'


const AuthNavigatorConfig = {
  initialRouteName: 'SignUp',
  header: null,
  headerMode: 'none',


};

const RouteConfigs = {
  SignUp: SignUpScreen,
  TnC:TnCScreen,
  EMnUN:EmailnUser,
  OTP:OTPScreen,
  AddImg:AddImage,

  Loc: Location,
  Category: Categories,
  SignIn: Signin,
  Forgot: ForgetPass,
  CForgot: CreatePass,
  
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;
