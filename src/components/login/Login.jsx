import styles from "./login.module.scss"

import Button from "../button/Button"
import { TextField } from "@mui/material"

const Login = () => {
    return (
        <div className={styles.Login}>
            <div className={styles.header}>
                <div className={styles.text}>
                    Te damos puntos por comprar en comercios del barrio
                </div>
            </div>
            <div className={styles.content}>
                <h2>Ingresa tu número de telefono</h2>
                <p>Te enviaremos un código de verificación por SMS</p>
                <span className={styles.textFieldContent}>
                    <TextField
                        autoComplete={false}
                        className={styles.inputCode}
                        // disabled={buttonText == 'Validando...' ? true : false}
                        fullWidth
                        id='verificationCode'
                        label={`Tu número de telefono`}
                        margin='dense'
                        // onChange={handleKeyUp}
                        // onKeyUp={handleKeyUp}
                        type='number'
                    />
                    <img src="/images/icons/phone-icon.svg" alt="Icono de telefono" />
                </span>
                <Button>Envíar código</Button>
                <p>
                    Al aceptar ingresar estas de acuerdo con nuestra politica de tratamiento de datos
                    <input type="checkbox" />
                </p>
                <p>
                    <Button>Ingresar con google</Button>
                    <Button>Soy un un comercio</Button>
                </p>
            </div>
        </div>
    )
}

export default Login