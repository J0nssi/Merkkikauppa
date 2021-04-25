import './Profilepage.css'
import axios from "axios";
import { useHistory } from "react-router";
import { useState, useEffect } from 'react';
import { IUser } from "../../../server/models/userModel";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Profilepage = () => {

    const history = useHistory();
    const [user, setUser] = useState<IUser>();
    const useStyles = makeStyles({
      paper: {
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
      root: {
        maxWidth: 500,
      },
      
    });
    const classes = useStyles();

    useEffect(() => {
        const getUser = async () => {
          return await axios.get(`/auth/user`)
            .then(response => {
              console.log(response.data)
              const user = response.data;
              setUser(user);
            })
            .catch(err => console.log(err));
            history.push('/');
        }
        getUser();
      }, [])

    return(
      <div className={classes.paper}>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="Profiili"
          height="400"
          image="/profilepic.png"
          title="Profiili"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Nimi: {user?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Kaupunki: {user?.city}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Puhelinnumero: {user?.phone_number}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            Sähköposti: {user?.email}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          </Typography>
        </CardContent>
    </Card>
    </div>
    )
}

export default Profilepage