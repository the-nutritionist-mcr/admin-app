import { Button } from "grommet";
import React from "react";
import { useHistory } from "react-router-dom";

interface MenuLinkProps {
  to: string;
}

const MenuButton: React.FC<MenuLinkProps> = (props) => {
  const history = useHistory();

  const onClick = (): void => {
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

export default MenuButton;
