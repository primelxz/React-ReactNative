import { useContext } from 'react';
import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

import BadgerCard from '../BadgerCard';
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";

function BadgerNewsScreen(props) {

    const navigation = useNavigation();
    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

    if (!props) {
        return null;
    }

    function handlePress(news) {
        navigation.push('Article', { article: news });
    }

    return <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {
            Object.values(props).map((article, index) => {
                if (article.tags.some(tag => prefs[tag] === false)){
                    return null;
                }
                return <BadgerCard
                    key={article.id}
                    title={article.title}
                    img={article.img}
                    onPress={() => handlePress(article)}
                    {...article} />
            })
        }
        {
            Object.values(prefs).every(pref => !pref) && (
                <View style={{ padding: 20 }}>
                    <Text>No articles fit your preferences</Text>
                </View>
            )
        }
    </ScrollView>
}

export default BadgerNewsScreen;