import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function App() {

  const[total, setTotal] = useState(0);
  const[num, setNum] = useState("");

  function add() {
    let sum = total + parseFloat(num);
    setTotal(sum);
    setNum("");
  }

  function reset() {
    Alert.alert("Reset", "Your total has been reset.")
    setTotal(0);
    setNum("");
  }

  return (
    // Reference: https://reactnative.dev/https://stackoverflow.com/questions/29685421/hide-keyboard-in-react-native/textinput
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text>Your total is {total}</Text>
        {/* Reference: https://reactnative.dev/docs/textinput */}
        <TextInput
          style={styles.input}
          onChangeText={setNum}
          value={num}
          placeholder="Enter a value"
          keyboardType="numeric"
        />
        <Button title='Add' onPress={add}></Button>
        <Button title='Reset' onPress={reset}></Button>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 110,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
