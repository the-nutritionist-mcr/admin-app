import { Button } from "grommet";
import React from "react";
import { useHistory } from "react-router-dom";

interface MenuLinkProps {
  to?: string;
  onClick?: () => void;
  icon?: JSX.Element;
}

const MenuButton: React.FC<MenuLinkProps> = (props) => {
  const history = useHistory();

  const onClick = (): void => {
    if (props.to) {
      history.push(props.to);
    }

    props.onClick?.();
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
