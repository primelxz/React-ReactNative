import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerNewsDetailScreen from '../screens/BadgerNewsDetailScreen';

const NewsStack = createNativeStackNavigator();

function BadgerStacks(props) {
    
    return (
        <NewsStack.Navigator>
            <NewsStack.Screen 
                name="Articles">
                    {() => <BadgerNewsScreen {...props} />}
            </NewsStack.Screen>
            <NewsStack.Screen name="Article" component={BadgerNewsDetailScreen} />
        </NewsStack.Navigator>
    );
}

export default BadgerStacks;