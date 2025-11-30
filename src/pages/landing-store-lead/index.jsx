import React from 'react'
import Button from '@/components/button/Button'
import styles from './landingStoreLead.module.scss'

import Header from '@/components/layout/Head'
import Layout from '@/components/layout/Layout'
import useCommonStore from '@/hooks/commonStore'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import WordChallenge from '@/components/wordChallenge/WordChallenge'
import RankingComponent from '@/components/ranking/Ranking'
import BottomSheets from '@/components/bottomSheets/BottomSheets'
import GalleryComponent from '@/components/gallery/Gallery'
import CouponTicket from '@/components/couponTicket/CouponTicket'

const LandingStoreLead = () => {
  const router = useRouter()
  const [showTrivia, setShowTrivia] = React.useState(false)
  const [currentText, setCurrentText] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const { userLogged, setStoreValue } = useCommonStore((state) => state)
  const [isShowRanking, setIsShowRanking] = React.useState(false)
  const RANKING_FERIA_MALLORQUIN = 8
  const messages = [
    'El agradecimiento es la memoria del corazón',
    // "Agradece a tus clientes por ser fieles a tu marca",
    'Convierte cada compra en una experiencia memorable',
  ]

  const galleryItems = ['https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/gallery%2Fganadores%202.webp?alt=media&token=e6f32157-8171-4e43-9437-1d39203a71c6', 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/gallery%2Fganadores%203.webp?alt=media&token=e6925fa5-857f-44fe-b55e-5e842fab00f5', 'https://firebasestorage.googleapis.com/v0/b/pikplay-72843.firebasestorage.app/o/gallery%2Fganadores.webp?alt=media&token=ff5ed6e3-8a49-4e37-8ec0-5725f5717e31']

  const coupons = [
    {
      storeLogo: '/images/users/falamusique/logo.jpg',
      backgroundImage: '/images/backgrounds/bg-falamusique.jpg',
      storeName: 'Fallamusique',
      description: 'Gratis primera clase',
      discount: '100% OFF',
      expirationDate: '31 Dic 2025',
    },
    {
      storeLogo: '/images/users/falamusique/logo.jpg',
      backgroundImage: '/images/backgrounds/bg-falamusique.jpg',
      storeName: 'Falamusique',
      description: 'Obtén 10% de descuento en tu primera mensualidad',
      discount: '10% OFF',
      expirationDate: '31 Dic 2025',
    },
    {
      storeLogo: '/images/users/serviya/logo.png',
      backgroundImage: '/images/users/serviya/servicios.png',
      storeName: 'ServiYA',
      description: 'Obtén $20.000 de descuento en tu primer servicio',
      discount: '$20.000 OFF',
      expirationDate: '31 Dic 2025',
    },
    {
      storeLogo: '/images/users/lexgo/logo.jpg',
      backgroundImage: '/images/users/lexgo/portada.jpg',
      storeName: 'Lexgo',
      description: 'Obtén 30% de descuento en registro de marca y constitucion de sociedad',
      discount: '30% OFF',
      expirationDate: '31 Dic 2025',
    }
  ]

  const [currentCoupon, setCurrentCoupon] = React.useState(0)
  const [touchStartCoupon, setTouchStartCoupon] = React.useState(0)
  const [touchEndCoupon, setTouchEndCoupon] = React.useState(0)

  const handleTouchStartCoupon = (e) => {
    setTouchStartCoupon(e.targetTouches[0].clientX)
  }

  const handleTouchMoveCoupon = (e) => {
    setTouchEndCoupon(e.targetTouches[0].clientX)
  }

  const handleTouchEndCoupon = () => {
    if (!touchStartCoupon || !touchEndCoupon) return
    const distance = touchStartCoupon - touchEndCoupon
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentCoupon < coupons.length - 1) {
      setCurrentCoupon(currentCoupon + 1)
    }
    if (isRightSwipe && currentCoupon > 0) {
      setCurrentCoupon(currentCoupon - 1)
    }

    setTouchStartCoupon(0)
    setTouchEndCoupon(0)
  }

  React.useEffect(() => {
    const currentMessage = messages[currentIndex]
    const typingSpeed = isDeleting ? 50 : 50
    const pauseTime = isDeleting ? 500 : 30000

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentMessage) {
        // Pausar antes de empezar a borrar
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && currentText === '') {
        // Cambiar al siguiente mensaje
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % messages.length)
      } else {
        // Escribir o borrar caracteres
        setCurrentText(
          isDeleting
            ? currentMessage.substring(0, currentText.length - 1)
            : currentMessage.substring(0, currentText.length + 1)
        )
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentIndex])

  const handleMallorquinEvent = () => {
    if (!userLogged?.uid) {
      setStoreValue('isOpenLoginModal', true)
      setStoreValue('leftMenuBar', { isShow: false })
    } else {
      setShowTrivia(true)
    }
  }

  return (
    <Layout
      title="Feria Mallorquín"
      description="Participa en la Feria Mallorquín y juega a la trivia para ganar premios. Inscribe tu comercio y agradece a tus clientes por ser fieles a tu marca."
    >
      <div className={styles.LandingStoreLeadPage}>
        {showTrivia && (
          <WordChallenge
            onCloseCallback={() => setShowTrivia(false)}
            sellerUid={186}
          />
        )}
        <BottomSheets
          isBottomSheets={isShowRanking}
          onClose={() => setIsShowRanking(false)}
        >
          {/* Ranking */}
          <RankingComponent
            callbackParticipar={() => setIsShowRanking(false)}
            isButtonJoinRanking
            isPointsByExperience={false}
            rankingId={RANKING_FERIA_MALLORQUIN}
          />
        </BottomSheets>
        <Header />
        <main className={styles.LandingStoreLead}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.bg}></div>
            <div className={styles.content}>
              <div className={styles.heroBadges}>
                <span className={styles.badge}>Feria Mallorquín</span>
                <span
                  className={`${styles.badge} ${styles.badgeRed}`}
                  onClick={handleMallorquinEvent}
                >
                  Juega a la trivia aquí
                </span>
              </div>
              <h1 className={styles.heroTitle} onClick={handleMallorquinEvent}>
                Inscribe tu <span className={styles.highlight}>comercio</span>{' '}
                en
                <br />
                Ciudad Mallorquín
              </h1>
            </div>
          </section>

          <section>
            <center className="m-b-20">
              <Button
                color="blue"
                realistic
                onClick={() => setIsShowRanking(true)}
              >
                Ranking Feria Mallorquín
              </Button>
            </center>
          </section>

          <section>
            <GalleryComponent items={galleryItems} title="Eventos anteriores" />
          </section>

          {/* Benefits Section */}
          <section className={styles.benefits}>
            <div className={styles.benefitsHeader}>
              <img
                alt="Regalo"
                className={`${styles.giftIcon} levitate`}
                src="/images/icons/gift.svg"
              />
              <div className={styles.titleWrapper}>
                <img
                  alt="Estrellas"
                  className={`${styles.starsBackground} levitate`}
                  src="/images/icons/stars.svg"
                />
                <h2
                  className={`${styles.benefitsTitle} ${styles.first} ${styles.typing}`}
                >
                  {currentText}
                  <span className={styles.cursor}>|</span>
                </h2>
              </div>
              {/* <img
                alt="Monedas"
                className={styles.coinsIcon}
                src="/images/icons/coin.svg"
              />
              <img
                alt="Moneda"
                className={styles.cardIcon}
                src="/images/icons/coin.svg"
              /> */}
            </div>

            {/* Benefit Card 1 */}
            <div className={`${styles.benefitCard} ${styles.cardOrange}`}>
              <div className={styles.cardContent}>
                <p className={styles.cardText}>
                  Sabemos que tienes un&nbsp;
                  <strong>producto fenomenal</strong>, que ¿pasaría si hicieras
                  algo más especial a tus clientes?
                </p>
              </div>
              <img
                alt="Trofeo"
                className={styles.cardIcon}
                src="/images/icons/trofeo.svg"
              />
            </div>

            {/* Benefit Card 2 */}
            <div className={`${styles.benefitCard} ${styles.cardPurple}`}>
              <img
                alt="Juego"
                className={`${styles.cardIconLeft} levitate`}
                src="/images/icons/gif-purple-open.svg"
              />
              <div className={styles.cardContent}>
                <p className={styles.cardText}>
                  Únete a este <strong>juego</strong> donde aprenderás sobre
                  atención de clientes, expandir tu target y crecer juntos
                  gracias a otros comercios
                </p>
              </div>
            </div>

            {/* Benefit Card 3 */}
            <div
              className={`${styles.benefitCard} ${styles.second} ${styles.cardOrange}`}
            >
              <div className={styles.cardContent}>
                <p className={styles.cardText}>
                  Vincula tu comercio totalmente
                  <strong>gratis</strong>, sigue haciendo un producto genial y
                  nosotros nos ocupados de hacerte llegar a<br />
                  más personas
                </p>
              </div>
              <div className={styles.coins}>
                <img
                  alt="Moneda"
                  className={styles.cardIcon}
                  src="/images/icons/coin.svg"
                />
              </div>
            </div>
          </section>

          {/* Brands Section */}
          {/* <section className={styles.brands}>
            <div className={styles.brandsGrid}>
              <img
                src="/images/landing-store/mcdonalds-logo.png"
                alt="McDonald's"
              />
              <img
                src="/images/landing-store/starbucks-logo.png"
                alt="Starbucks"
              />
              <img src="/images/landing-store/kfc-logo.png" alt="KFC" />
              <img src="/images/landing-store/pepsi-logo.png" alt="Pepsi" />
            </div>
          </section> */}
          <section className={styles.couponsSection}>
            <h2 className={styles.sectionTitle}>Bonos de aliados</h2>
            <div className={styles.couponsCarousel}>
              <div
                className={styles.couponsSlides}
                style={{ transform: `translateX(-${currentCoupon * 100}%)` }}
                onTouchStart={handleTouchStartCoupon}
                onTouchMove={handleTouchMoveCoupon}
                onTouchEnd={handleTouchEndCoupon}
              >
                {coupons.map((coupon, idx) => (
                  <div key={idx} className={styles.couponSlide}>
                    <CouponTicket {...coupon} />
                  </div>
                ))}
              </div>
              <div className={styles.couponsDots}>
                {coupons.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`${styles.dot} ${currentCoupon === idx ? styles.active : ''}`}
                    onClick={() => setCurrentCoupon(idx)}
                    aria-label={`Ir al cupón ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <div className={styles.titleWrapper}>
            <img
              alt="Estrellas"
              className={`${styles.starsBackground} levitate`}
              src="/images/icons/stars.svg"
            />
            <h2 className={`${styles.benefitsTitle} ${styles.forYou}`}>
              Lo que tenemos<br />
              <span className={styles.highlight}>para ti</span>
              <img src="/images/icons/pepe-guinio.svg" />
            </h2>
          </div>
          <center>
            <Button color="secondary" realistic onClick={() => window.open('https://api.whatsapp.com/send?phone=573204863547&text=Hola, quiero información sobre las capacitaciones', '_blank')}>
              Quiero las capacitaciones
            </Button>
          </center>
          <p className={styles.subtitle}>
            <b>Anima</b> a tus clientes, vuelvelos <b>recurrentes</b>{' '}
            ofreciendoles dinamicas <b>gaming</b> para que se “enganchen” y
            sigan <b>comprando</b>.
          </p>

          {/* Benefit Card 3 */}
          <div
            className={`${styles.benefitCard} ${styles.second} ${styles.cardPurple} ${styles.second}`}
          >
            <div className={`${styles.cardContent} flex`}>
              <img src="images/icons/trofeo-hand-bg-purple.svg" style={{ width: '80px' }} />
              <p className={styles.cardText}>
                Accede a un <b>programa de lealtad</b> agradeciento a tus
                clientes por sus compras, pregunta por el <b>aquí</b>.
              </p>
            </div>
          </div>

          <div className={`${styles.benefitCard} ${styles.cardOrange}`}>
            <div className={styles.cardContent}>
              <p className={styles.cardText}>
                Accede a nuestras capacitaciones
                <br />
                <ul>
                  <li>
                    Crear <strong>link de pagos</strong>
                  </li>
                  <li>
                    <strong>Campañas de marketing</strong>
                  </li>
                  <li>
                    <strong>Gamificar</strong> procesos de venta y retener
                    usuarios
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default LandingStoreLead
