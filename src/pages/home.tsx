import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import axios from "axios";

const Home: React.FC = () => {
    const router = useRouter();
    const [studentDetails, setStudentDetails] = useState<any>();
    const [status, setStatus] = useState(false);

    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        console.log(token?.valueOf);

        setTimeout(() => {
            localStorage.removeItem("token");
            router.push("/");
            console.log(localStorage.token)
        }, 60000)

        if (token?.valueOf === undefined) {
            console.log("Your session has expired");
        }

        else {
            const config = {
                headers: {'authorization': `Bearer ${token}`}
            }

            useEffect(() => {
                axios.get("http://localhost:3000/api/students", config)
                .then((res) => {
                    setStudentDetails(res.data);
                    setStatus(true);
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
            },[])
        }
    }

    const logoutHandler = () => {
        if (typeof window !== 'undefined') {
            setTimeout(() => {
                localStorage.removeItem("token");
                router.push("/");
            },1000)
        }
    }
    
    console.log(studentDetails);

    return(
        (typeof window !== 'undefined' && localStorage.getItem('token')) ?
        <>
            <h1>Name: {(studentDetails != null) ? studentDetails?.name : " "}</h1>
            <h1>Age: {(studentDetails != null) ? studentDetails.age : " "}</h1>
            <h1>Hobbies: {(studentDetails != null)? studentDetails.hobby : " "}</h1>
            <button onClick={logoutHandler}>Logout</button>
        </>
        :
        <>
            <h1>You are not authorized.</h1>
        </>
    )
}

export default Home;