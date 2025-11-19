'use client'

import cookieCutter from '@boiseitguru/cookie-cutter'
import React, { useState } from 'react'
// import LoginInterface from './LoginInterface'
import { useRouter } from 'next/router'
import useCommonStore from '../../hooks/commonStore'
import { loginSrv } from '../../services/user/user'
import { toast } from 'react-toastify'
import LoginInterface from './LoginInterface'
import { getExperiencesSrv } from '@/services/experience'

function Login(props) {
  const { env, setStoreValue, isOpenLoginModal: isOpen } = useCommonStore(state => state)
  const router = useRouter()
  const [isHuman, setIsHuman] = useState(env == 'dev')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isStore, setIsStore] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [name, setName] = useState(null)
  const [buttonText, setButtonText] = useState('Enviar código')

  const numberValidated = phoneNumber => phoneNumber.length === 10

  const handleTengoCodigo = () => {
    // const phoneNumber = document.getElementById('phoneLogin').value
    const formattedPhoneNumber = (phoneNumber || '').replace(/-/g, '');
    if (!phoneNumber || !formattedPhoneNumber || !numberValidated(formattedPhoneNumber)) {
      toast('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return
    }
    setButtonText('¡Play!')
    setIsCodeSent(true)
  }

  const validateLogin = async (loginCode) => {
    // Numero de telefono y código son necesarios
    const contryCode = '57'
    const formattedPhoneNumber = phoneNumber.replace(/-/g, '');
    const fullPhone = contryCode + formattedPhoneNumber

    try {
      setStoreValue('isFullLoading', true)
      const req = await loginSrv(null, fullPhone, parseInt(loginCode, 10))
      const { code, data: userLoggedData } = req
      if (code == 200) {
        const { token, uid } = userLoggedData
        const experiencesData = await getExperiencesSrv(null)
        const { currentPikcoins } = experiencesData
        setStoreValue({
          'currentPikcoins': currentPikcoins,
          'leftMenuBar': { isShow: false },
          'userLogged': userLoggedData,
        }, null, true)
        handleCloseDialog()
        if (!userLoggedData.name) router.push('/perfil/user-name')
        else router.push('?login=true')
      }

      else if (code == 400) {
        document.getElementById('verificationCode').value = ''
        toast('Código no valido')
        setButtonText('Validar código')
      }
      setStoreValue('isFullLoading', false)
    } catch (error) {
      console.log(error);
      setButtonText('Validar código')
      setStoreValue('isFullLoading', false)
    }
  }

  const handleEnviarCodigo = async () => {
    // setButtonText('Enviando...')
    const formattedPhoneNumber = (phoneNumber || '').replace(/-/g, '');
    if (!phoneNumber || !numberValidated(formattedPhoneNumber)) {
      toast('Debes escribir un número de celular válido, recuerda que a este número llegará el código de acceso')
      setButtonText('Enviar código')
      return false
    }

    setStoreValue('isFullLoading', true)

    const contryCode = '57'
    const fullPhone = contryCode + formattedPhoneNumber
    const req = await loginSrv(null, fullPhone, null, name, isStore)
    if (req.code == 200) {
      toast('¡Código enviado!, ahora solo debes colocarlo allí ⬇️')
      setButtonText('Validar')
      setIsCodeSent(true)
    } else {
      toast.error('Parece que tenemos lios al envíarte el código 😔')
    }
    setStoreValue('isFullLoading', false)
  }

  const handleCloseDialog = () => {
    setIsHuman(false)
    setIsCodeSent(false)
    setStoreValue('isOpenLoginModal', false)
  }

  const handleFixPhone = () => {
    setIsCodeSent(false)
    setButtonText('Enviar código')
  }

  const handleClickOpen = () => {
    setStoreValue('isOpenLoginModal', true)
  }

  const handleKeyUp = async (e) => {
    const code = e.target.value
    const verificationCode = document.getElementById('verificationCode').value
    if (verificationCode) Number(verificationCode)
    if (verificationCode < 999) return
    setButtonText('Validando...')
    validateLogin(code)
  }

  const onChangeReCaptcha = value => {
    value = !!value
    setIsHuman(value)
  }

  return (<LoginInterface
    {...{
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
      setIsCodeSent,
      setIsStore,
      setPhoneNumber,
      setName
    }}
  />)
}

export default Login
