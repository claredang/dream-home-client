import React, { useState, useEffect } from "react";
import "./Button.css";

const Button = ({ children, link, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const ButtonComponent = link ? "a" : "button";

  const [href, setHref] = useState(link);

  useEffect(() => {
    setHref(link);
  }, [link]);

  return (
    <ButtonComponent href={href} onClick={handleClick} className="button-main">
      {children}
    </ButtonComponent>
  );
};

export default Button;
