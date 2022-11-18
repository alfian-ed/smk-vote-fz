import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthContext from "./AuthContext"

const AuthProvider = ({children, isProtected = false}) => {
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [loginResult, setLogin] = useState(null)
    // const url = 'https://vote-backend.greenfield-26de5c7e.eastasia.azurecontainerapps.io/api'
    const url = 'http://localhost:5203/api'
    const navigate = useNavigate()

    const setPresistedToken = (token) =>{
        setToken(token)
        localStorage.setItem('token', token)
    } 

    useEffect(() => {
        (async () => {
            if (email != "") {
                const login = await axios.post(`${url}/Auth?email=${email}`)
                .then(res => {
                    return res.data
                })
                setLogin(login)
                setToken(login.token)
            }
        })()
    }, [email])

    useEffect(() => {
        if(isProtected && token == '') {
            navigate('/login')
        }
    })

    return (
        <AuthContext.Provider value={{
            email, setEmail, loginResult, token, url
        }}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider