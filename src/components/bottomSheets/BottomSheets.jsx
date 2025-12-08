import useCommonStore from '@/hooks/commonStore'
import CloseButton from '../closeButton/CloseButton'
import styles from './bottomSheets.module.scss'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
  useDragControls,
} from 'framer-motion'
import { useEffect, useState } from 'react'

const BottomSheets = (props) => {
  const {
    backgroundBlocked = true,
    children,
    isBottomSheets,
    setIsBottomSheets,
    onClose,
    topLine = false,
  } = props

  const sheetVariants = {
    hidden: {
      y: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: {
      y: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const setStoreValue = useCommonStore((state) => state.setStoreValue)

  // Estado local para controlar la animación de salida
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  // motion value para controlar la traducción vertical del sheet
  const y = useMotionValue(0)
  const dragControls = useDragControls()

  // Animar entrada cuando se abre y manejar bloqueo de scroll
  useEffect(() => {
    if (typeof window === 'undefined') return

    if (isBottomSheets) {
      // resetear estado de animación de salida
      setIsAnimatingOut(false)

      // empezar desde abajo (fuera de pantalla)
      y.set(window.innerHeight)
      animate(y, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })

      // Prevenir pull-to-refresh
      const preventDefault = (e) => {
        // Permitir scroll dentro del bottomsheet
        const target = e.target
        const bottomSheet = document.getElementById('bottomsheet-root')
        if (bottomSheet?.contains(target) && target.scrollTop > 0) {
          return
        }
        e.preventDefault()
      }

      // Añadir listener para touchmove
      document.addEventListener('touchmove', preventDefault, { passive: false })

      // Cleanup
      return () => {
        onClose?.()
        document.removeEventListener('touchmove', preventDefault)
      }
    }
  }, [isBottomSheets, y])

  const hideBottomSheets = () => {
    // primero activamos la animación de salida
    setIsAnimatingOut(true)

    // después de la animación, actualizamos el estado
    setTimeout(() => {
      setStoreValue('isOpenLoginModal', false)
      if (typeof setIsBottomSheets === 'function') setIsBottomSheets(false)
    }, 300) // tiempo suficiente para que se vea la animación
    onClose?.()
  }

  // Umbral de cierre por drag en píxeles
  const DRAG_CLOSE_THRESHOLD = 150

  // evitar error si la prop no es una función
  const safeSetIsBottomSheets =
    typeof setIsBottomSheets === 'function' ? setIsBottomSheets : () => { }

  return (
    <>
      <AnimatePresence>
        {isBottomSheets && (
          <motion.div
            className={styles.BottomSheets}
            id="bottomsheet-root"
            style={{ y }}
            animate={
              isAnimatingOut ? { y: window?.innerHeight || 600 } : { y: 0 }
            }
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            drag="y"
            dragControls={dragControls}
            dragMomentum={false}
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: window?.innerHeight || 600 }}
            onDragEnd={async (e, info) => {
              if (
                info.offset.y > DRAG_CLOSE_THRESHOLD ||
                info.velocity.y > 500
              ) {
                // Iniciar animación de salida
                setIsAnimatingOut(true)
                hideBottomSheets()
              } else {
                // Volver a la posición inicial
                animate(y, 0, {
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                })
              }
            }}
          >
            {topLine && <motion.div
              id="draggable"
              className={styles.topLine}
              // el handle visual del drag
              onPointerDown={(e) => {
                e.preventDefault()
                dragControls.start(e)
              }}
            />}

            {/* content with simple fade-in from bottom */}
            <motion.div
              className={styles.content}
              // animación interna sólo de opacidad/posición visual
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {backgroundBlocked && isBottomSheets && (
          <motion.div
            className={styles.elementToClose}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => hideBottomSheets()}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default BottomSheets
