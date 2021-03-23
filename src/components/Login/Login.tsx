import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useHistory } from "react-router";

axios.defaults.withCredentials = true;

const Login = () => {
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const history = useHistory();

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

                axios.get('/auth/refresh-token').then(refreshResponse => {
                    console.log(refreshResponse.data)
                }).catch((error) => console.log("error occured"))

                axios.get('/auth/is-logged-in').then((userRes) =>{
                    console.log(userRes.data);
                    history.push('/');
                }).catch((error) => {
                    console.log(error)
                })
            }
        }).catch(({response}) => {
            if(response.status === 400) {
                console.log("LOGIN FAILED");
                alert("Kirjautuminen epäonnistui.")
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