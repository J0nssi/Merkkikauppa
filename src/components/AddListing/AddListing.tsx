import axios from "axios";
import { useState, MouseEvent, ChangeEvent, useContext } from "react";
import { Redirect } from "react-router";
import { userContext } from "../../userContext";


axios.defaults.withCredentials = true;

const AddListing = () => {

    const [urlState, setUrlState] = useState("");

    const { user } = useContext(userContext);

    const [state, setState] = useState({
        'title': "",
        'description': "",
        'price': 0,
        'item_count': 1,
        'urls': new Array<string>()
    })

    // Lisäämislomakkeen tietojen tallennus tilaan
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }

    // Lisää myynti-ilmoitus napin painaminen
    const handleSubmitClick = (e: MouseEvent) => {
        e.preventDefault();
        const payload = {
            "title": state.title,
            "description": state.description,
            "price": state.price,
            "item_count": state.item_count,
            "urls": state.urls
        };
        axios.post("/listing/add", payload).then(async (response) => {
            console.log(response.data);
            if (response.status === 200) {
                console.log("LISTING ADD SUCCESSFUL");
            } else {
                alert("LISTING ADD FAILED");
            }
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    // Kuvan url muuttuu, tarkista onko url kuva-url
    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrlState(e.target.value);
    }

    // Lisää kuvan url myynti-ilmoituslomakkeeseen
    const handleUrlSubmit = (e: MouseEvent) => {
        e.preventDefault();
        // Imagetester
        var tester=new Image();
        // On successfull validation
        tester.onload= () => {
            console.log("Adding image: " + urlState);
            setState(prevState => ({
                ...prevState,
                "urls": prevState.urls.concat(urlState)
            }));
        }
        // On failed validation
        tester.onerror=() => {
            console.warn("INVALID IMAGE URL")
        };
        // Test
        tester.src=urlState;
    }


    // Jos käyttäjätietoja ei ole vielä ehditty hakea, ei näytetä mitään.
    if(user === undefined) return <></>

    // Jos käyttäjä ei ole kirjautunut sisään, ohjataan hänet kirjautumissivulle
    if(user === null) return <Redirect to={"/"}/>
    
    return (
        <>
            <form style={{display: "flex", flexDirection: "column", maxWidth: "500px", margin: "0 auto"}}>
                <h1>Lisää myynti-ilmoitus</h1>
                <form>
                    <ul id="url_list">
                        {state.urls.map(url => { return (<img src={url} alt="pic_placeholder" style={{width: "200px"}}/>) })}
                    </ul>
                    <input placeholder="Kuvan url" type="url" id="image_url" onChange={handleUrlChange} style={{width: "99%"}}/>
                    <button type="submit" id="btnAddUrl" disabled={urlState.length <= 0} onClick={handleUrlSubmit} style={{display: "block", margin: "auto", width: "100%"}}>
                        Lisää kuvan url
                    </button>
                </form>
                <input placeholder="Otsikko" id="title" type="text" onChange={handleChange} />
                <textarea placeholder="Kuvaus" id="description" rows={3} onChange={handleChange} />
                <input placeholder="Hinta" id="price" type="number" min="0" onChange={handleChange} style={{width: "30%"}}/>
                <input placeholder="Määrä" id="item_count" type="number" min="1" onChange={handleChange} style={{width: "30%"}}/>
                <button type="submit" onClick={handleSubmitClick}>Lisää</button>
            </form>
        </>
    )
}

export default AddListing;