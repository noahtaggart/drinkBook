import Settings from "../repositories/Settings";

const useAuth = () => {

    const isAuthenticated = () => localStorage.getItem("drink_token") !== null
        || sessionStorage.getItem("drink_token") !== null

    const register = (user) => {
        return fetch(`${Settings.remoteURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(_ => _.json())
            .then(response => {
                    localStorage.setItem("drink_token", response.id)
                }
            )
    }

    const login = (email) => {
        return fetch(`${Settings.remoteURL}/users?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(_ => _.json())
            .then(matchingUsers => {
                if (matchingUsers.length > 0) {
                    localStorage.setItem("drink_token", matchingUsers.id)
                    return true
                }
                return false
            })
    }

    const logout = () => {
        console.log("*** Toggling auth state and removing credentials ***")
        localStorage.removeItem("drink_token")
        sessionStorage.removeItem("drink_token")
    }

    const currentUser = () => {
        const user = parseInt(localStorage.getItem("drink_token"))
        return user
    }


    return { isAuthenticated, logout, login, register, currentUser }
}

export default useAuth

