import styles from "./button.module.scss";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button as MuiButton } from '@mui/material';

const Button = (props) => {
  const {
    animation = false,
    border,
    children,
    className: classNameProp,
    color,
    databutton,
    disabled,
    fullWidth,
    isLink,
    id,
    onClick,
    outline,
    style,
    shine,
    realistic,
    textColor,
    width,
    loading = false,
  } = props;
  const [isPressed, setIsPressed] = useState(false);
  const className = `${classNameProp} ${animation ? styles.animation : null}`;

  // return <MuiButton variant="contained" fullWidth loading={true}>{children}</MuiButton>;

  return (
    <motion.span
      className={`
      ButtonComponent
      ${styles.ButtonComponent}
      ${fullWidth ? styles.fullWidth : ""}
      ${realistic ? styles.realistic : ""}
      ${shine ? styles.shine : ""}
      ${border ? styles.border : ""}
      ${styles[color]}
      ${className}
      ${outline ? styles.outline : ""}
      ${isLink ? styles.link : ""}
      ${fullWidth ? styles.fullWidth : ""}
      ${disabled ? styles.disabled : ""}
      ${isPressed ? styles.pressed : ""}
    `}
      databutton={databutton}
      id={id}
      onClick={disabled ? null : onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={style}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      <MuiButton loading={true}>{children}</MuiButton>
    </motion.span>
  );
};

export default Button;
