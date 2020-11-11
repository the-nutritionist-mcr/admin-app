import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "grommet";

interface MenuLinkProps {
  to: string;
}

const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const history = useHistory();

  const onClick = () => {
    history.push(props.to);
  };

  return (
    <Button
      plain={true}
      onClick={onClick}
      hoverIndicator
      label={props.children}
    />
  );
};

export default MenuLink;
