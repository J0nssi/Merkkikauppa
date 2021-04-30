import axios from "axios";
import { ChangeEvent, MouseEvent, useState, useContext } from "react";
import { useHistory, Redirect } from "react-router";
import { userContext } from '../../userContext';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


axios.defaults.withCredentials = true;

const Login = () => {

    const history = useHistory();

    let {user, setUser} = useContext(userContext);

    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        password: ""
    })


    // Logintietojen tallennus tilaan
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    // Logintietojen lähetys backendiin
    const handleSubmitClick = (e: MouseEvent) => {
        e.preventDefault();
        const payload = {
            "email": state.email,
            "password": state.password,
        }
        axios.post('/auth/login', payload).then((response) => {
            if (response.status === 200) {
                console.log("LOGIN SUCCESSFUL");

                axios.get('/auth/refresh-token').then(refreshResponse => {
                    console.log(refreshResponse.data)
                }).catch((error) => console.log("error occured"))

                axios.get('/auth/user').then((userRes) => {
                    console.log(userRes.data);
                    setUser(userRes.data);
                    history.push('/');
                }).catch((error) => {
                    console.log(error)
                })
            }
        }).catch(({ response }) => {
            if (response.status === 400) {
                console.log("LOGIN FAILED");
                alert("Kirjautuminen epäonnistui.")
            }
        })
    }

    const navigateToMain = () => {
        history.push('/');//navigoi painalluksesta etsivulle
    }

    // Jos käyttäjä on kirjautunut sisään, ohjataan hänet kirjautumissivulle
    if (user) return (<Redirect to={"/"} />)

    return (
        <>
            <div className="top">
                <a onClick={() => navigateToMain()} style={{ cursor: 'pointer' }}>
                    <h1>MERKKIKAUPPA</h1>
                </a>
                <img src='/MerkkikauppaW.png' alt="MK" width="100px" height="100px"></img>
            </div><br /><br />
            
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Kirjaudu sisään
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Sähköposti"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Salasana"
                            type="password"
                            id="password"
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSubmitClick}
                        >
                            Kirjaudu sisään
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/rekisteroidy" variant="body2">
                                    {"Eikö sinulla ole käyttäjää? Rekisteröidy"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    )
}

export default Login;