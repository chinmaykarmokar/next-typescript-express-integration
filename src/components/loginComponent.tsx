import React, { useState, useEffect } from "react";
import Home from "../pages/home";
import { useRouter } from 'next/router'
import axios from "axios";

const LoginComponent: React.FC = () => {
    const router = useRouter();
    const [name,setName] = useState();

    const handleLoginInfo = (event: any) => {
        setName(event.target.value)
    }

    const loginHandler = (event: any) => {
        event.preventDefault();

        const config = {     
            headers: { 'content-type': 'application/json' }
        }

        const nameOfUser = {
            name: name
        }

        axios.post("http://localhost:3000/api/auth/login", nameOfUser, config)
            .then((res) => {
                localStorage.setItem("token", res.data.accessToken);
                console.log(res.data);

                if (res?.data?.accessToken) {
                    router.push("/home");
                }
                else {
                    router.push("/");
                }

                setTimeout(() => {
                    localStorage.removeItem("token");
                    router.push("/");
                    console.log(localStorage.token)
                }, 60000)
            })
            .catch((err) => {
                console.log(err);

                // router.push("/");
            })
    }

    return (
        <>
            <h1>Login to your account.</h1>
            <input onChange={handleLoginInfo}/>
            <button onClick={loginHandler}>Login</button>
        </>
    )
}

export default LoginComponent;