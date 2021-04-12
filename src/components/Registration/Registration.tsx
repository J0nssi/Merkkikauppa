import axios from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useHistory } from "react-router";
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
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



axios.defaults.withCredentials = true;

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Merkkikauppa
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

const Registration = () => {

    const history = useHistory();

    const classes = useStyles();
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
        const payload = {
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
                history.push('/kirjaudu')
            } else {
                alert("Rekisteröityminen epäonnistui.")
            }
        })
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Rekisteröidy
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nimi"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Sähköposti"
                                    name="email"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Salasana"
                                    type="password"
                                    id="password"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="city"
                                    label="Kaupunki"
                                    name="city"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone_number"
                                    label="Puhelinnumero"
                                    name="phone_number"
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
                            Rekisteröidy
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Onko sinulla jo käyttäjä? Kirjaudu sisään
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
  );

        </>
    )
}

export default Registration;