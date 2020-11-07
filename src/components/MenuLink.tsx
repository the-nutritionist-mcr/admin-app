import React from "react";
import { useHistory } from "react-router-dom";
import { Link, majorScale } from "evergreen-ui";

interface MenuLinkProps {
  to: string;
}

const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const history = useHistory();

  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    history.push(props.to);
  };

  return (
    <Link
      marginLeft={majorScale(2)}
      marginRight={majorScale(2)}
      href={props.to}
      onClick={onClick}
    >
      {props.children}
    </Link>
  );
};

export default MenuLink;
