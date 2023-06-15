import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";
import { useState } from "react";

function BadgerRegisterScreen(props) {

    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
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
        <Text style={{ marginTop: 10 }}>Confirm Password</Text>
        <TextInput
            style={styles.textInput}
            clearTextOnFocus
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry
        />
        <Button color="crimson" title="Signup" onPress={() => {
            if (userName.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                Alert.alert('Notice', 'Please fill in all the blank');
            } 
            else if(password.trim() !== confirmPassword.trim()) {
                Alert.alert('Notice', 'Passwords does not match');
            }else {
                props.handleSignup(userName, password);
            }
        }} />
        <Button color="grey" title="Nevermind!" onPress={() => props.setIsRegistering(false)} />
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

export default BadgerRegisterScreen;