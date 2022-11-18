import React, { useContext, useEffect, useState } from "react";
import { KKPrimaryButton } from "../../components/KKButton";
import {BsGoogle} from 'react-icons/bs'
import { Link, redirect, useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'
import axios from "axios";
import AuthContext from "../../AuthContext";
import logo from "./logo.png"


const Login = () => {
    const {email, setEmail, token} = useContext(AuthContext)
    const clientId = "126423619621-gekc6bfvs9hhcd8defjd6b9k9j0kab1p.apps.googleusercontent.com"
    const [loginMsg, setLoginMsg] = useState();
    const navigate = useNavigate()
    
    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: 'email'
            });
         };
         gapi.load('client:auth2', initClient);
     });

    useEffect(() => {
        if (token != '') {
            navigate('/')
        }
    }, [token])

    const onSuccess = (res) => {
        console.log('success:', res.profileObj.email);
        setEmail(res.profileObj.email)
        setLoginMsg("OAuth Success, mencoba login ke server popapp")
    };

    const onFailure = (err) => {
        console.log('failed:', err);
    };



    return (
        <>
            <div id="login" className="mt-20 text-center mx-auto md:rounded-2xl md:mt-20 md:bg-slate-200 md:p-14 md:w-96">
            <img src={logo} alt="Logo" className="mx-auto mt-20 w-72 md:mt-0"/>
                <h1 className="text-center  font-bold text-3xl mt-10">LOGIN</h1>

                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                    render={renderProp => (
                        <div className="mt-10">
                            <button {...renderProp} className="inline-flex bg-button hover:bg-teal-500 p-3 rounded-xl"> <BsGoogle size={13} className="mt-1 mr-1"/>Klik disini untuk login</button>                   
                        </div>
                    )}
                />

                <p className="text-center text-[1rem] mt-3">
                    Tidak bisa login google SMK? <Link to="alt" className="text-button hover:text-teal-500 font-bold underline">klik di sini</Link>
                </p>

            </div>
        </>
    )
}

export default Login; 