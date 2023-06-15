import { StyleSheet, Text, View, Button, Modal, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import BadgerChatMessage from "./BadgerChatMessage";
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {

    const [messages, setMessages] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_c6b0ef60328ceef94599",
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    }

    useEffect(() => {
        loadMessages();
    }, []);

    const createPost = () => {
        if (title === "" || body === "") {
            alert('You must provide both a title and content!')
            return
        }

        SecureStore.getItemAsync(props.username).then(result => {
            if (result) {
                const authorization = `Bearer ${result}`;
                console.log(authorization)
                fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
                    method: 'POST',
                    headers: {
                        "Authorization": authorization,
                        "Content-Type": "application/json",
                        "X-CS571-ID": "bid_c6b0ef60328ceef94599"
                    },
                    body: JSON.stringify({
                        title: title,
                        content: body
                    })
                }).then(res => {
                    if (res.status === 200) {
                        alert('Successfully posted!')
                        return res.json();
                    } else {
                        console.log(res.status)
                    }
                }).then(json => {
                    loadMessages();
                }).catch(e => {
                    Alert.alert('Notice', 'An error occured while making the request');
                })
            } else {
                Alert.alert('Error', 'No credentials!');
            }
        })
    }

    return <View style={{ flex: 1 }}>
        {
            messages.length > 0 ?
                <>
                    {
                        <ScrollView>
                            {
                                messages.map(message => {
                                    return <BadgerChatMessage key={message.id} {...message} />
                                })
                            }
                        </ScrollView>
                    }
                </>
                :
                <>
                    <Text>There are no messages in this chatroom yet!</Text>
                </>
        }

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 20 }}>Create A Post</Text>
                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Title</Text>
                        <TextInput
                            style={styles.textInput}
                            clearTextOnFocus
                            onChangeText={text => setTitle(text)}
                            value={title}
                        />
                        <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>Body</Text>
                        <TextInput
                            style={styles.bodyInput}
                            clearTextOnFocus
                            onChangeText={text => setBody(text)}
                            value={body}
                            multiline={true}
                        />
                        <Button color="crimson" title="Create Post" onPress={() => {
                            createPost();
                            setModalVisible(!modalVisible);
                        }} />
                        <Button color="grey" title="Cancel" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
        <View>
            {
                props.isAnonymous ?
                    <>
                        <Button color="grey" title="Refresh" onPress={() => {
                            loadMessages();
                            Alert.alert('Refresh', 'Posts refreshed!');
                            }} />
                    </>
                    :
                    <>
                        <Button color="crimson" title="Add Post" onPress={() => setModalVisible(true)} />
                        <Button color="grey" title="Refresh" onPress={() => {
                            loadMessages();
                            Alert.alert('Refresh', 'Posts refreshed!');
                            }} />
                    </>
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        transparent: true,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textInput: {
        height: 40,
        width: 250,
        borderWidth: 1,
        marginBottom: 5,
        padding: 10,
    },
    bodyInput: {
        height: 200,
        width: 250,
        borderWidth: 1,
        marginBottom: 5,
        padding: 10,
    }
});

export default BadgerChatroomScreen;