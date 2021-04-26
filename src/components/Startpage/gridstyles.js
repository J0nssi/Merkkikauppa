import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& > *': {
        maxWidth: '100%',
        margin: theme.spacing(1),
        },
    },
    media: {
        height: 0,
        paddingTop: '70%', //16:9
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    footer: {
        paddingTop: '70%',
    }
}));