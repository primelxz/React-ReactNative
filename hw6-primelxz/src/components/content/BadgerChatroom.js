import React, { useEffect, useState, useContext, useRef } from "react"
import { Container, Button } from "react-bootstrap";
import BadgerMessage from './BadgerMessage';
import BadgerChatLoginContext from "../../contexts/BadgerChatLoginContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const title = useRef();
    const content = useRef();
    const [loginStatus, setLoginStatus] = useContext(BadgerChatLoginContext);

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    const createPost = () => {
        if (title.current.value === "" || content.current.value === "") {
            alert('You must provide both a title and content!')
            return
        }
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            },
            body: JSON.stringify({
                title: title.current.value,
                content: content.current.value
            })
        }).then(res => {
            if (res.status === 200) {
                alert('Successfully posted!')
                return res.json();
            } 
        }).then(json => {
            loadMessages();
        })
    }

    const isOwner = (user) => {
        if (user === loginStatus.poster) {
            return true;
        } else {
            return false;
        }
    }

    const deletePost = (messageId) => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${messageId}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            }
        }).then(res => {
            if (res.status === 200) {
                loadMessages();
                alert('Successfully deleted the post!')
                return res.json();
            } 
        })
    }

    useEffect(() => {
        loadMessages()
    }, [props]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            loginStatus.isLogin ? (
                <div>
                    <label htmlFor="title">Post Title</label>
                    <br/>
                    <input id="title"
                        style={{ 
                            borderRadius: '6px', 
                            border: '1.5px solid rgba(128, 128, 128, 0.5)', 
                            padding: '10px', 
                            width: '250px', 
                            height: '40px', 
                            fontSize: '14px' }} 
                        placeholder="Please Enter your Post Title"
                        ref={title}/>
                    <br/><br/>
                    <label htmlFor="content">Post Content</label>
                    <br/>
                    <input type="content"
                        id="content"
                        style={{ 
                            borderRadius: '6px', 
                            border: '1.5px solid rgba(128, 128, 128, 0.5)', 
                            padding: '10px', 
                            width: '250px', 
                            height: '40px', 
                            fontSize: '14px' }} 
                        placeholder="Please Enter your Post Content" 
                        ref={content}/>
                    <br/>
                    <Button onClick={createPost} style={{marginTop: "1rem"}}>Create Post</Button>
                </div>
            ) : (
                <p>You must be logged in to post!</p>
            )
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        <Container fluid>
                            {
                                messages.map(message => {
                                    return <BadgerMessage key= {message.id} {...message} isOwner={isOwner} deletePost={deletePost}/>
                                })
                            }
                    </Container>
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}