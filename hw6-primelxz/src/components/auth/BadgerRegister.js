import React from 'react';
import { useState } from "react"
import { Button } from "react-bootstrap";

export default function BadgerRegister() {

    const [username, setUsername] =useState("")
    const [password, setPassword] =useState("")
    const [repassword, setRePassword] =useState("")

    const createAccount = () => {
        if (username === "" || password === "" || repassword === "") {
            alert('You must provide both a username and password!')
            return
        }
        else if (password !== repassword) {
            alert('Your passwords do not match!')
            return
        }
        fetch('https://www.cs571.org/s23/hw6/api/register', {
            method: 'POST',
            credentials: "include",
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
                alert('Successfully registered!')
                return res.json();
            } 
            else if (res.status === 400) {
                alert("A request must contain a 'username' and 'password'")
                return
            }
            else if (res.status === 409) {
                alert("That username has already been taken!")
                return
            }
            else if (res.status === 413) {
                alert("'username' must be 64 characters or fewer and 'password' must be 128 characters or fewer")
                return
            } else {
                throw new Error()
            }
        }).catch(e => {
            alert('An error occured while making the request')
        })
    }

    return <>
        <h1>Register</h1>
        <form>
            <label htmlFor="username">Username</label>
            <br/>
            <input id="username" 
                value={username} 
                style={{ 
                    borderRadius: '6px', 
                    border: '1.5px solid rgba(128, 128, 128, 0.5)', 
                    padding: '10px', 
                    width: '250px', 
                    height: '40px', 
                    fontSize: '14px' }} 
                placeholder="Please Enter your Username"
                onChange={(e) => setUsername(e.target.value)}/>
            <br/><br/>
            <label htmlFor="password">Password</label>
            <br/>
            <input type="password"
                id="password" 
                value={password} 
                style={{ 
                    borderRadius: '6px', 
                    border: '1.5px solid rgba(128, 128, 128, 0.5)', 
                    padding: '10px', 
                    width: '250px', 
                    height: '40px', 
                    fontSize: '14px' }} 
                placeholder="Please Enter your Password" 
                onChange={(e) => setPassword(e.target.value)}/>
            <br/><br/>
            <label htmlFor="repassword">Reapeat Password</label>
            <br/>
            <input type="password"
                id="repassword" 
                value={repassword} 
                style={{ 
                    borderRadius: '6px', 
                    border: '1.5px solid rgba(128, 128, 128, 0.5)', 
                    padding: '10px', 
                    width: '250px', 
                    height: '40px', 
                    fontSize: '14px' }} 
                placeholder="Please Repeat your Password"
                onChange={(e) => setRePassword(e.target.value)}/>
        </form>
        <Button onClick={createAccount} style={{marginTop: "1rem"}}>Register</Button>
    </>
}