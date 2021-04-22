import './Profile.css'
import { useContext } from 'react';
import { Redirect } from 'react-router';
import { userContext } from '../../userContext';

const Profile = () => {

    let { user } = useContext(userContext);


    // Jos käyttäjätietoja ei ole vielä ehditty hakea, ei näytetä mitään.
    if(user === undefined) return <></>
    
    // Jos käyttäjä ei ole kirjautunut sisään, ohjataan hänet kirjautumissivulle.
    if(user === null) return <Redirect to={"/kirjaudu"}/>

    return (
        <>
            <div id="profiili">
                <img src="https://tullinpultti.fi/files/2013/10/profiilikuva-mies-e1476433226681.jpg" alt="Profiilikuva" />
                <h1>{user?.name}</h1>
            </div>
        </>
    )
}
export default Profile;