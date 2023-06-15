import { useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import BadgerChatLoginContext from "../../contexts/BadgerChatLoginContext";
import { Button } from "react-bootstrap";

export default function BadgerLogin() {

    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerChatLoginContext);

    const login = () => {
        if (username.current.value === "" || password.current.value === "") {
            alert('You must provide both a username and password!')
            return
        }
        fetch('https://www.cs571.org/s23/hw6/api/login', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_c6b0ef60328ceef94599"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        }).then(res => {
            if (res.status === 200) {
                alert('Successfully Login!')
                setLoginStatus({
                    isLogin: true,
                    poster: username.current.value
                })
                navigate("/")
                return res.json();
            } 
            else if (res.status === 400) {
                alert("A request must contain a 'username' and 'password'")
                return
            }
            else if (res.status === 401) {
                alert("Incorrect password!")
                return
            }
            else if (res.status === 404) {
                alert("Incorrect username!")
                return
            } else {
                throw new Error()
            }
        }).catch(e => {
            alert('An error occured while making the request')
        })
    }

    return <>
        <h1>Login</h1>
        <label htmlFor="username">Username</label>
        <br/>
        <input id="username"
            style={{ 
                borderRadius: '6px', 
                border: '1.5px solid rgba(128, 128, 128, 0.5)', 
                padding: '10px', 
                width: '250px', 
                height: '40px', 
                fontSize: '14px' }} 
            placeholder="Please Enter your Username"
            ref={username}/>
        <br/><br/>
        <label htmlFor="password">Password</label>
        <br/>
        <input type="password"
            id="password"
            style={{ 
                borderRadius: '6px', 
                border: '1.5px solid rgba(128, 128, 128, 0.5)', 
                padding: '10px', 
                width: '250px', 
                height: '40px', 
                fontSize: '14px' }} 
            placeholder="Please Enter your Password" 
            ref={password}/>
        <br/>
        <Button onClick={login} style={{marginTop: "1rem"}}>Login</Button>
    </>
}