import React, { useContext } from "react"
import { ScrollView } from "react-native";

import BadgerPreferenceSwitch from "../BadgerPreferenceSwitch";
import BadgerPreferencesContext from "../../contexts/BadgerPreferencesContext";

function BadgerPreferencesScreen(props) {

    const [prefs, setPrefs] = useContext(BadgerPreferencesContext);

    function handleToggle(prefName, isOn) {
        if (prefs[prefName] !== isOn){
            setPrefs({
                ...prefs,
                [prefName]: !prefs[prefName]
            })
        } else {
            return;
        }
    }

    return <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        {
            Object.entries(prefs).map(([prefName, initVal]) => {
                //console.log([prefName, initVal])
                return <BadgerPreferenceSwitch
                    key={prefName}
                    prefName={prefName}
                    initVal={initVal}
                    handleToggle={(prefName, isOn) => handleToggle(prefName, isOn)}
                />
            })
        }
    </ScrollView>
}

export default BadgerPreferencesScreen;