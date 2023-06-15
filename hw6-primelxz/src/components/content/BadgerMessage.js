import React from "react"
import { Button } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    const isPoster = props.isOwner(props.poster);

    const deleteMessage = () => {
        props.deletePost(props.id)
    }

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {
            isPoster ? (
                <Button variant="danger" onClick={deleteMessage} style={{background: "#e03848"}}>Delete Post</Button>
            ) : (null)
        }
    </>
}

export default BadgerMessage;