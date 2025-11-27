import Button from "@/components/button/Button";
import styles from "./landingStoreLead.module.scss";

import Header from "@/components/layout/Head";
import Layout from "@/components/layout/Layout";
import useCommonStore from "@/hooks/commonStore";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const LandingStoreLead = () => {
  const router = useRouter();
  const { userLogged, setStoreValue } = useCommonStore((state) => state);

  const handleMallorquinEvent = () => {
    if (!userLogged?.uid) {
      setStoreValue("isOpenLoginModal", true);
      setStoreValue("leftMenuBar", { isShow: false });
    } else {
      Router.push("/mallorquin-event");
    }
  };

  return (
    <Layout title="Feria Mallorquín" description="Participa en la Feria Mallorquín y juega a la trivia para ganar premios. Inscribe tu comercio y agradece a tus clientes por ser fieles a tu marca.">
      <div className={styles.LandingStoreLeadPage}>
        <Header />
        <main className={styles.LandingStoreLead}>
          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.bg}></div>
            <div className={styles.content}>
              <div className={styles.heroBadges}>
                <span className={styles.badge}>Feria Mallorquín</span>
                <span className={`${styles.badge} ${styles.badgeRed}`}>
                  Juega a la trivia aquí
                </span>
              </div>
              <h1 className={styles.heroTitle} onClick={handleMallorquinEvent}>
                Inscribe tu <span className={styles.highlight}>comercio</span>{" "}
                en
                <br />
                Ciudad Mallorquín
              </h1>
            </div>
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
                <h2 className={`${styles.benefitsTitle} ${styles.first}`}>
                  Agradece a tus clientes por ser
                  <span className={styles.highlight}>fieles a tu marca</span>
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
                  atención de clientes, expandir tu target y
                  crecer juntos gracias a otros comercios
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
                  <br />
                  <strong>gratis</strong>, sigue haciendo un
                  <br />
                  producto genial y nosotros nos
                  <br />
                  ocupados de hacerte llegar a<br />
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
            <Button color="secondary" realistic>
              Quiero las capacitaciones
            </Button>
          </center>
          <p className={styles.subtitle}>
            <b>Anima</b> a tus clientes, vuelvelos <b>recurrentes</b>{" "}
            ofreciendoles dinamicas <b>gaming</b> para que se “enganchen” y
            sigan <b>comprando</b>.
          </p>

          {/* Benefit Card 3 */}
          <div
            className={`${styles.benefitCard} ${styles.second} ${styles.cardPurple}`}
          >
            <div className={styles.cardContent}>
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
  );
};

export default LandingStoreLead;
