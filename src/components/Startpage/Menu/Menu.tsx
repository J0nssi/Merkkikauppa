import React, { useState, useRef, useContext } from "react";
import { userContext } from "../../../userContext";
import axios from "axios";

import Hamburger from "./Hamburger";
import { StyledMenu, StyledLink } from "./Menu.styled";
import { useHistory } from "react-router-dom";
import { useOnClickOutside } from "./hooks";

axios.defaults.withCredentials = true;

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  const { user, setUser } = useContext(userContext);

  useOnClickOutside(node, () => setOpen(false));
  const history = useHistory();
  const navigateToRegister = () => history.push('/rekisteroidy');
  const navigateToLogin = () => history.push('/kirjaudu');
  const navigateToProfile = () => history.push('/profiili');
  const signOut = () => {
    axios.post('/auth/logout');
    setUser(null);
  };
  const navigateToAddListing = () => history.push('/myynti/lisaa');

  return (
    <div ref={node}>
      <StyledMenu open={open}>
        {user === null ?
          <>
            <StyledLink onClick={navigateToRegister}>Rekisteröidy</StyledLink>
            <StyledLink onClick={navigateToLogin}>Kirjaudu sisään</StyledLink>
          </> 
          :
          <>
            <StyledLink onClick={navigateToProfile}>Profiili</StyledLink>
            <StyledLink onClick={navigateToAddListing}>Lisää myynti-ilmoitus</StyledLink>
            <StyledLink onClick={signOut}>Kirjaudu Ulos</StyledLink>
          </>
        }

       
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
    </div>
  );
};

export default Menu;