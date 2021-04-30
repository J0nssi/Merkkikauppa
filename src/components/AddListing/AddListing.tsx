import axios from "axios";
import { useState, MouseEvent, ChangeEvent, useContext } from "react";
import { Redirect } from "react-router";
import { userContext } from "../../userContext";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";



axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const AddListing = () => {

    const classes = useStyles();

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

    const history = useHistory();
    const navigateToMain = () => {
        history.push('/');//navigoi painalluksesta etsivulle
      }

    // Jos käyttäjätietoja ei ole vielä ehditty hakea, ei näytetä mitään.
    if(user === undefined) return <></>

    // Jos käyttäjä ei ole kirjautunut sisään, ohjataan hänet kirjautumissivulle
    if(user === null) return <Redirect to={"/"}/>
    
    return (
        <>
            {/*<form style={{display: "flex", flexDirection: "column", maxWidth: "500px", margin: "0 auto"}}>
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
                <button type="submit" onClick={handleSubmitClick}>Lisää</button>*/}
                        <a onClick={() => navigateToMain()} style={{ cursor: 'pointer', display: "flex"}}>
                        <h1>MERKKIKAUPPA</h1>
                        <img src='/MerkkikauppaW.png' alt="MK" width="100px" height="100px"></img>
                        </a>
                <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Lisää myynti-ilmoitus
                    </Typography>
                    <form className={classes.form} noValidate> 
                    <ul id="url_list">
                        {state.urls.map(url => { return (<img src={url} alt="pic_placeholder" style={{width: "200px"}}/>) })}
                    </ul>
                    <input placeholder="Kuvan url" type="url" id="image_url" onChange={handleUrlChange} style={{width: "100%"}}/>
                    <Button
                            type="submit"
                            id="btnAddUrl"
                            disabled={urlState.length <= 0}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleUrlSubmit}
                        >
                            Lisää kuvan url
                        </Button>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Merkin nimi"
                                    type="text"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    multiline
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Kuvaus merkistä"
                                    rows="3"                               
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="price"
                                    label="Hinta"
                                    type="number"
                                    InputProps={{
                                        inputProps: { 
                                            max: 999, min: 0
                                        }
                                    }}
                                    style={{width: "50%"}}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="item_count"
                                    label="Määrä"
                                    type="number"
                                    InputProps={{
                                        inputProps: { 
                                            max: 999, min: 1
                                        }
                                    }}
                                    style={{width: "50%"}}
                                    onChange={handleChange}
                                />
                            </Grid>
                            
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmitClick}
                        >
                            Lisää
                        </Button>
                    </form>
                </div>

            </Container>
        </>
    )
}

export default AddListing;