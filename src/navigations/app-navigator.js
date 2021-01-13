import {createStackNavigator} from 'react-navigation-stack';
import FeedScreen from '../scenes/Feed/index'
import VideoRecording from '../scenes/VidRec/index'
import VidSelec from '../scenes/VidSelec/index'
import ChallengeSubmit from '../scenes/ChallengeForm/index'
import ProfileScreen from "../scenes/Profile/index"
import FollowerScreen from "../scenes/Followers/index"
import SingleUserScreen from '../scenes/SingleUser/index'
import SearchScreen from "../scenes/Search/index"
import CoinScreen from "../scenes/Coins/index"
import EditUserScreen from "../scenes/edituser/index"

const TabNavigatorConfig = {
  initialRouteName: 'Feed',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Feed:FeedScreen,
  VideoRec:VideoRecording,
  VidSelec:VidSelec,
  ChalSub:ChallengeSubmit,
  Profile: ProfileScreen,
  Followers: FollowerScreen,
  SingleUser: SingleUserScreen,
  Search: SearchScreen,
  EditUser: EditUserScreen,
  Coins: CoinScreen
  
}

const AppNavigator = createStackNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;
