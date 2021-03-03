import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";

axios.defaults.withCredentials = true;

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    })


    // Logintietojen tallennus tilaan
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const  {id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    // Logintietojen lähetys backendiin
    const handleSubmitClick = (e: MouseEvent) => {
        e.preventDefault();
        const payload =  {
            "email": state.email,
            "password": state.password,
        }
        axios.post('/auth/login', payload).then((response) => {
            if (response.status === 200) {
                console.log("LOGIN SUCCESSFUL");
            }
        })
    }


    return(
        <>
            <h1>Kirjaudu sisään</h1>
            <form>
                <input type="email" name="email" id="email" placeholder="Sähköposti" onChange={handleChange} required/>
                <input type="password" name="password" id="password" placeholder="Salasana" onChange={handleChange} required/>
                <button type="submit" onClick={handleSubmitClick}>Kirjaudu</button>
            </form>
        </>
    )
}

export default Login;