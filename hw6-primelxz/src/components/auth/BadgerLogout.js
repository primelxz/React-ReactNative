import React, { useEffect, useContext } from 'react';
import BadgerChatLoginContext from "../../contexts/BadgerChatLoginContext";

export default function BadgerLogout() {

    const [loginStatus, setLoginStatus] = useContext(BadgerChatLoginContext);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoginStatus({
                isLogin: false,
                poster: ""
            })
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}