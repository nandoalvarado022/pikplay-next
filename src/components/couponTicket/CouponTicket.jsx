import React from 'react'
import styles from './couponTicket.module.scss'
import Image from 'next/image'
import Button from '../button/Button'

const CouponTicket = ({
  backgroundImage,
  description,
  discount,
  expirationDate,
  storeLogo,
  storeName,
}) => {
  const handleWhatsApp = () => {
    const message = `Hola, quiero información sobre el bono de ${discount} en ${storeName}`
    window.open(`https://api.whatsapp.com/send?phone=573204863547&text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div className={styles.couponTicket}>
      <div className={styles.leftSection} style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className={styles.storeInfo}>
          <div className={styles.logoContainer}>
            <Image
              src={storeLogo}
              alt={storeName}
              width={60}
              height={60}
              className={styles.storeLogo}
            />
          </div>
          <h3 className={styles.storeName}>{storeName}</h3>
        </div>
      </div>

      <div className={styles.divider}>
        <div className={styles.circle} />
        <div className={styles.dashedLine} />
        <div className={styles.circleBottom} />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.discountBadge}>
          {discount}
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.expiration}>
          <span className={styles.expirationLabel}>Válido hasta:</span>
          <span className={styles.expirationDate}>{expirationDate}</span>
        </div>
        <Button
          color="blue"
          realistic
          fullWidth
          onClick={handleWhatsApp}
        >
          Quiero este bono
        </Button>
      </div>

      {/* Decorative notches */}
      <div className={styles.notchTop} />
      <div className={styles.notchBottom} />
    </div>
  )
}

export default CouponTicket
