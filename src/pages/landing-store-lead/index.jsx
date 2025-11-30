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
                Revisa como va el Ranking<br />
                Feria Mallorquín
              </Button>
            </center>
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
          <div className={styles.titleWrapper}>
            <img
              alt="Estrellas"
              className={`${styles.starsBackground} levitate`}
              src="/images/icons/stars.svg"
            />
            <h2 className={`${styles.benefitsTitle} ${styles.forYou}`}>
              Lo que tenemos
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
