import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Auth from "./screens/Auth";
import TaskList from './screens/TaskList'

const MainRoutes = {
    Auth: {
        name: "Auth",
        screen: Auth
    },
    Home: {
        name: "Home",
        screen: TaskList
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
    initialRouteName: "Auth"
})

export default createAppContainer(MainNavigator)