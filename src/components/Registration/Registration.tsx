import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";

axios.defaults.withCredentials = true;


const Registration = () => {
    const [state, setState] = useState({
        email: "",
        password: "",
        name: "",
        phone_number: "",
        city: ""
    });

    // Rekisteröintitietojen tallennus tilaan
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    // Luo käyttäjä napin painaminen
    const handleSubmitClick = (e: MouseEvent) => {
        e.preventDefault();
        const payload =  {
            "email": state.email,
            "password": state.password,
            "name": state.name,
            "phone_number": state.phone_number,
            "city": state.city
        }
        axios.post('/auth/register', payload).then(async (response) => {
            console.log(response.data)
            if (response.status === 200) {
                console.log("REGISTER SUCCESSFUL");   
            }
        })
    }

    return (
        <>
            <h1>Rekisteröidy</h1>
            <form>
                <input type="email" name="email" id="email" placeholder="Sähköposti" onChange={handleChange} required />
                <input type="password" name="password" id="password" placeholder="Salasana" onChange={handleChange} required />
                <input type="name" name="name" id="name" placeholder="Nimi" onChange={handleChange} required />
                <input type="phone_number" name="phone_number" id="phone_number" onChange={handleChange} placeholder="Puhelinnumero" required />
                <input type="city" name="city" id="city" placeholder="Kaupunki" onChange={handleChange} required />
                <button type="submit" onClick={handleSubmitClick}>Luo käyttäjä</button>
            </form>
        </>
    )
}

export default Registration;