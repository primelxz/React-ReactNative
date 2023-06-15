import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';

import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen';
import BadgerStacks from "./BadgerStacks";

const BadgerNewsTabs = createBottomTabNavigator();

function BadgerTabs(props) {
    return <BadgerNewsTabs.Navigator>
        <BadgerNewsTabs.Screen
            name="AllArticles"
            options={{
                headerShown: false,
                tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faNewspaper} color={color} />),
                tabBarActiveTintColor: 'red',
            }}
        >
            {() => <BadgerStacks {...props} />}
        </BadgerNewsTabs.Screen>
        <BadgerNewsTabs.Screen
            name="Preferences"
            component={BadgerPreferencesScreen}
            options={{
                tabBarIcon: ({ color }) => (<FontAwesomeIcon icon={faGear} color={color} />),
                tabBarActiveTintColor: 'red',
            }}
        />
    </BadgerNewsTabs.Navigator>
}

export default BadgerTabs;