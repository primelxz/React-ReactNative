import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

function BadgerLoginScreen(props) {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <Text style={{ marginTop: 30 }}>Username</Text>
        <TextInput
            style={styles.textInput}
            clearTextOnFocus
            onChangeText={text => setUsername(text)}
            value={userName}
        />
        <Text style={{ marginTop: 10 }}>Password</Text>
        <TextInput
            style={styles.textInput}
            clearTextOnFocus
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
        />
        <Button color="crimson" title="Login" onPress={() => {
            if (userName.trim() === '' || password.trim() === '') {
                Alert.alert('Notice', 'Please enter both your Username and Password');
            } else {
                //Alert.alert("Hmmm...", "I should check the user's credentials first!");
                props.handleLogin(userName, password);
            }
        }} />
        <Button color="grey" title="Signup" onPress={() => {
            props.setIsRegistering(true);
            props.setIsAnonymous(false);
        }} />
        <Button color="grey" title="Continue as a guest" onPress={() => props.setIsAnonymous(true)} />
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        height: 40,
        width: 250,
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
    }
});

export default BadgerLoginScreen;