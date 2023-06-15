import { Alert } from "react-native";
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';
import BadgerConversionScreen from './components/BadgerConversionScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [key, setKey] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    fetch('https://cs571.org/s23/hw10/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_c6b0ef60328ceef94599",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, []);

  function handleLogin(username, password) {
    fetch('https://cs571.org/s23/hw10/api/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_c6b0ef60328ceef94599"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (res.status === 200) {
        setIsLoggedIn(true);
        setIsAnonymous(false);
        return res.json();
      }
      else if (res.status === 401) {
        Alert.alert('Incorrect Login', 'Please try again.');
        return;
      }
      else if (res.status === 404) {
        Alert.alert('Notice', 'That user does not exist!');
        return;
      } else {
        throw new Error()
      }
    }).then(json => {
      if (json) {
        SecureStore.setItemAsync(json.user.username, json.token);
        setKey(json.user.username);
      }
    }).catch(e => {
      Alert.alert('Notice', 'An error occured while making the request');
      return;
    })
  }

  function handleSignup(username, password) {
    fetch('https://cs571.org/s23/hw10/api/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_c6b0ef60328ceef94599"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => {
      if (res.status === 200) {
        Alert.alert('Notice', 'Successfully registered!');
        setIsLoggedIn(true);
        setIsAnonymous(false);
        return res.json();
      }
      else if (res.status === 409) {
        Alert.alert('Notice', 'That username has already been taken!');
        return;
      } else {
        throw new Error()
      }
    }).then(json => {
      if (json) {
        SecureStore.setItemAsync(json.user.username, json.token);
        setKey(json.user.username);
      }
    }).catch(e => {
      Alert.alert('Notice', 'An error occured while making the request');
    })
  }

  function handleLogout() {
    SecureStore.deleteItemAsync(key);
    setKey('');
    setIsLoggedIn(false);
    setIsRegistering(false);
    setIsAnonymous(false);
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} username={key} isAnonymous={isAnonymous}/>}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Logout">
            {(props) => <BadgerLogoutScreen handleLogout={handleLogout} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} setIsAnonymous={setIsAnonymous} />
  } else if (isAnonymous) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isAnonymous={isAnonymous} />}
              </ChatDrawer.Screen>
            })
          }
          <ChatDrawer.Screen name="Signup">
            {(props) => <BadgerConversionScreen setIsRegistering={setIsRegistering} setIsAnonymous={setIsAnonymous} />}
          </ChatDrawer.Screen>
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsAnonymous={setIsAnonymous} />
  }
}


