import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Login.css"

export const Register = () => {
    const [credentials, syncAuth] = useState({
        username: "",
        email: "",
        employee: false
    })
    const { register } = useAuth()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        const newUser = {
            username: credentials.username,
            email: credentials.email,
            employee: credentials.employee
        }
        // register() takes a user object as argument
        // returns a fetch().then() chain of promises
        // POSTs user object to database/users 
        // base64 encodes the userObject and saves to localSotrage as the kennel_token
        // is this the desired functionality? shouldn't only logging in set the kennel_token?
        register(newUser).then(() => {
            history.push("/liquorcabinet")
        })
    }

    const handleUserInput = (event) => {
        // adds the inputs to the state
        const copy = {...credentials}
        // credentials/copy should have properties username, lastName, email, and employee
        copy[event.target.id] = event.target.value
        syncAuth(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for drinkbook</h1>
                <fieldset>
                    <label htmlFor="username"> Username </label>
                    <input type="text" onChange={handleUserInput}
                        id="username"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input type="email" onChange={handleUserInput}
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...credentials }
                                if (event.target.value === "on") {
                                    copy.employee = true
                                }
                                else {
                                    copy.employee = false
                                }
                                syncAuth(copy)
                            }
                        }
                        defaultChecked={credentials.employee}
                        type="checkbox" name="employee" id="employee" />
                    <label htmlFor="employee"> Employee account? </label>
                </fieldset>

                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}
