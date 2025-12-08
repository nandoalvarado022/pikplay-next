import styles from './custom_header.module.scss' // eslint-disable-line

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { IS_MOBILE } from '../../lib/variables'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import useCommonStore from '../../hooks/commonStore'
import { useChallengesList } from '../challengesList/useChallengeList'

const CustomHeader = React.memo(({ handleClickLogo }) => {
  const router = useRouter()
  const { leftMenuBar, leftMenuBar: { isShow: isShowLeftMenu }, setStoreValue } = useCommonStore((state) => state)
  const { nextVisualIndicator } = useChallengesList((state) => state)

  const handleMenuToggle = () => {
    router.push('#menu')
    setStoreValue('leftMenuBar', { ...leftMenuBar, isShow: !isShowLeftMenu })
    setTimeout(() => nextVisualIndicator(), 1000)
  }

  const images = [
    {
      original: '/images/banners/ps3-azul.jpeg',
      thumbnail: '/images/banners/ps3-azul.jpeg',
    },
    {
      original: '/images/banners/juanchofenix.jpeg',
      thumbnail: '/images/banners/juanchofenix.jpeg',
    },
  ]

  return (
    <div id={styles.CustomHeader}>
      <ul>
        <motion.button
          className={styles.hamburger}
          onClick={handleMenuToggle}
          whileTap={{ scale: 0.9 }}
          aria-label={isShowLeftMenu ? 'Cerrar menú' : 'Abrir menú'}
        >
          <motion.span
            animate={isShowLeftMenu ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            animate={isShowLeftMenu ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={isShowLeftMenu ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
        <motion.div
          whileTap={{ scale: 0.7 }}>
          <Image
            alt='Logo de Pikplay'
            className={styles.logo}
            height={43}
            onClick={handleClickLogo}
            src='/images/logos/logo.svg'
            width={160}
          />
          <div className={styles.slogan}>
            Compra y vende subiendo de nivel
          </div>
        </motion.div>
        {/* <span className={styles.beta}>Beta</span> */}
        {/* TODO Descomentar cuando se implementen los productos */}
        {/* <SearchBox
          inputText={inputText}
          isLoading={isLoading}
          results={results}
          setInputText={setInputText}
        /> */}
      </ul>
    </div>
  )
})

export default CustomHeader
