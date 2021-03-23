import React, { useState, useRef } from "react";

import Hamburger from "./Hamburger";
import { StyledMenu, StyledLink } from "./Menu.styled";
import { useHistory } from "react-router-dom";
import { useOnClickOutside } from "./hooks";

const Menu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useOnClickOutside(node, () => setOpen(false));
  const history = useHistory();
  const navigateToRegister = () => history.push('/rekisteroidy');//eg.history.push('/login');
  const navigateToLogin = () => history.push('/kirjaudu');//eg.history.push('/login');

  return (
    <div ref={node}>
      <StyledMenu open={open}>
        <StyledLink onClick={navigateToRegister}>Rekisteröidy</StyledLink>
        <StyledLink onClick={navigateToLogin}>Kirjaudu sisään</StyledLink>
        <StyledLink onClick={() => close()}>Profiili</StyledLink>
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
    </div>
  );
};

export default Menu;