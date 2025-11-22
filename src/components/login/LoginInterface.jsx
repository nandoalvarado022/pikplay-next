import styles from "./login.module.scss";

import cookieCutter from "@boiseitguru/cookie-cutter";
import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "../button/Button";
import Link from "next/link";
import Image from "next/image";
import { InputAdornment, MenuItem, Select } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function LoginInterface({
  buttonText,
  env,
  isCodeSent,
  isHuman,
  isOpen,
  handleClickOpen,
  handleEnviarCodigo,
  handleKeyUp,
  handleCloseDialog,
  handleFixPhone,
  handleTengoCodigo,
  onChangeReCaptcha,
  phoneNumber,
  setPhoneNumber,
  setName,
  setIsStore,
}) {
  const [contry, setContry] = useState("57");
  const [activeTab, setActiveTab] = useState("buyer");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const galleryImages = React.useMemo(
    () => ["/images/login/heladeria.jpg", "/images/login/barberia.jpg"],
    []
  );

  const onboardingName =
    typeof window != "undefined" ? localStorage.getItem("onboardingName") : "";
  const buttonsBlocked = !isHuman && env != "dev";

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < galleryImages.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;

    // Eliminar todos los caracteres que no sean dígitos
    const digits = input.replace(/\D/g, "");

    // Formatear el número de teléfono
    let formattedNumber = digits;

    if (digits.length > 3 && digits.length <= 6) {
      formattedNumber = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else if (digits.length > 6) {
      formattedNumber = `${digits.slice(0, 3)}-${digits.slice(
        3,
        6
      )}-${digits.slice(6, 10)}`;
    }

    setPhoneNumber(formattedNumber);
  };

  useEffect(() => {
    setName(onboardingName);
    const element = document.querySelector("#loginModal__name");
    if (element) element.value = onboardingName;
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(id);
  }, [galleryImages.length]);

  return (
    <div className={styles.LoginComponent}>
      {/* Galerry */}
      <div className={styles.gallery} aria-label="Galería de beneficios">
        <div
          className={styles.slides}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {galleryImages.map((src, idx) => (
            <div
              className={styles.slide}
              key={src}
              aria-hidden={currentSlide !== idx}
            >
              <Image
                src={src}
                alt={
                  idx === 0
                    ? "Regalos y recompensas"
                    : idx === 1
                    ? "Monedas Pikcoins"
                    : "Notificaciones activas"
                }
                width={240}
                height={140}
                style={{ objectFit: "contain", width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
        <div
          className={styles.dots}
          role="tablist"
          aria-label="Control de galería"
        >
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`${styles.dot} ${
                currentSlide === idx ? styles.active : ""
              }`}
              aria-label={`Ir a la imagen ${idx + 1}`}
              aria-selected={currentSlide === idx}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tabs}>
          <div
            className={`${styles.item} ${
              activeTab === "buyer" ? styles.selected : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsStore(true);
              setActiveTab("buyer");
            }}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setActiveTab("buyer")
            }
          >
            Soy comprador
            <img src="/images/icons/shopping-cart.svg" alt="carrito" />
          </div>
          <div
            className={`${styles.item} ${
              activeTab === "merchant" ? styles.selected : ""
            }`}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsStore(true);
              setActiveTab("merchant");
            }}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && setActiveTab("merchant")
            }
          >
            Soy un comercio
            <img src="/images/icons/store.svg" />
          </div>
        </div>
        {/* <span className={styles.subtitle}>Solo con tu número de teléfono </span> */}
        {/* puedes crear tu cuenta y empezar a ganar <b>¡Pikcoins!</b> */}
        {/* <Image className='main-image' alt="Imagen de login chica viendo Pikcoins en su telefono" src="images/elements/girl-coin.png" height={200} width={200} style={{ display: 'block', margin: '0 auto' }} /> */}
        {/* Fields */}
        {/* {!isCodeSent && <TextField
          defaultValue={onboardingName}
          fullWidth
          id="loginModal__name"
          label='¿Como te gustaria que te llamemos?'
          margin='dense'
          onKeyUp={e => setName(e.target.value)}
          type='text'
        />} */}
        <h2>Ingresa tu número de teléfono</h2>
        <div>Te enviaremos un mensaje a whatsap con un código de ingreso</div>
        <br />
        <div
          className={styles.contryAndPhone}
          style={{ display: isCodeSent ? "none" : "flex" }}
        >
          <Select
            className="selectCountry"
            class="selectCountry"
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={contry}
            onChange={(event) => setContry(event.target.value)}
            label="Pais"
            style={{
              height: "56px",
              marginRight: "10px",
              marginTop: "8px",
              width: "120px",
            }}
          >
            <MenuItem value="57">
              <Image
                height="42"
                width="40"
                className={styles.icon_colombia}
                src="/images/icons/colombia.png"
                alt=""
              />
            </MenuItem>
            <MenuItem value="54">
              <Image
                height="42"
                width="40"
                className={styles.icon_colombia}
                src="/images/icons/argentina_flag.webp"
                alt=""
              />
            </MenuItem>
            <MenuItem value="52">
              <Image
                height="42"
                width="40"
                className={styles.icon_colombia}
                src="/images/icons/mexico_flag.png"
                alt=""
              />
              {/* <em>+57</em> */}
            </MenuItem>
          </Select>
          <TextField
            // onKeyUp={e => setPhone(e.target.value)}
            onChange={handleInputChange}
            margin="dense"
            id="phoneLogin"
            label="Número de celular"
            type="text"
            fullWidth
            value={phoneNumber}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <img src="/images/icons/cel-icon.svg" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        {/* {!isCodeSent && env != 'dev' && (
          <center className={`${styles.capchaContent}`}>
            <ReCAPTCHA
              sitekey='6Ldyz98eAAAAAFCJEbBSdSRqNu4Kn1XqZugCi9Qg'
              onChange={onChangeReCaptcha}
            />
          </center>
        )} */}
        {isCodeSent && (
          <>
            <TextField
              autoComplete={false}
              className={styles.inputCode}
              disabled={buttonText == "Validando..." ? true : false}
              fullWidth
              id="verificationCode"
              label={`Coloca aquí tu código`}
              margin="dense"
              onChange={handleKeyUp}
              onKeyUp={handleKeyUp}
              type="number"
            />
            <small>
              <a
                className="link"
                href="https://api.whatsapp.com/send?phone=573204863547&text=Tengo problemas al recibir mi código de ingreso"
                target="_BLANK"
                rel="noreferrer"
              >
                Tengo problemas al recibir mi código de ingreso
              </a>
            </small>
          </>
        )}
        <div className={styles.actions}>
          {isCodeSent && (
            <Button onClick={handleFixPhone} color="link">
              Corregir número
            </Button>
          )}
          {/* <Button onClick={handleCloseDialog} color='normal'>
          Cancelar
        </Button> */}
          {/* {!isCodeSent && (
          <Button
            onClick={!buttonsBlocked ? handleTengoCodigo : null}
            color={!buttonsBlocked ? 'link' : 'normal'}>
            Tengo código
          </Button>
        )} */}
          <Button
            color={!buttonsBlocked ? "blue" : "normal"}
            onClick={!isCodeSent && !buttonsBlocked ? handleEnviarCodigo : null}
            realistic
          >
            {buttonText}
          </Button>
        </div>
        <small className={styles.terminosCondiciones}>
          Al ingresar en Pikplay aceptas nuestros &nbsp;
          <Link href="/terminos-y-condiciones" as="/terminos-y-condiciones">
            términos y condiciones
          </Link>
          {/* &nbsp;es posible que te enviemos notificaciones por sms, que puedes
        desactivar cuando quieras. */}
        </small>
      </div>
    </div>
  );
}
