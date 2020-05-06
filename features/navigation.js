import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./HomeScreen";
import { createAppContainer } from "react-navigation";
import AsteroidDetails from "./AsteroidDetails";

const AppStack = createStackNavigator({
    Home: HomeScreen,
    Detail: AsteroidDetails
})
const AppContainer = createAppContainer(AppStack)

export default AppContainer;