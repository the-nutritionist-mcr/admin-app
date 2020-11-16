import { Button } from "grommet";
import React from "react";
import { useHistory } from "react-router-dom";

interface MenuLinkProps {
  to: string;
  icon?: JSX.Element;
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
      icon={props.icon}
      label={props.children}
    />
  );
};

export default MenuButton;
