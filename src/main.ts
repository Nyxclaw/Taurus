import type {
  DestinationData
} from '../types'

export function createInterface() {
  const root =
    document.createElement(
      'div'
    )

  root.className =
    'ui-root'

  root.innerHTML = `
    <div class="overview-ui">

      <div class="project-title">
        <span>TAURO</span>

        <small>
          Explora la constelación
        </small>
      </div>

      <div class="progress">
        <span class="progress-text">
          0 / 4 explorados
        </span>
      </div>

    </div>

    <!-- ==================================================
         DESTINATION PANEL
         ================================================== -->

    <section class="detail-panel">

      <div class="detail-content">

        <p
          class="detail-kicker"
        ></p>

        <h1
          class="detail-title"
        ></h1>

        <p
          class="detail-astronomy"
        ></p>

        <div
          class="detail-divider"
        ></div>

        <blockquote
          class="detail-personal"
        ></blockquote>

        <p
          class="detail-attribution"
        ></p>

        <div
          class="detail-actions"
        >

          <button
            class="more-button"
            type="button"
          >
            Conocer más
          </button>

          <button
            class="back-button"
            type="button"
          >
            ← Regresar
          </button>

        </div>

      </div>

      <!-- ==============================================
           MORE INFO
           ============================================== -->

      <div class="more-content">

        <p class="more-kicker">
          POR QUÉ ME RECUERDA A TI
        </p>

        <p
          class="more-personal"
        ></p>

        <div
          class="detail-divider"
        ></div>

        <p class="more-kicker">
          CÓMO OBSERVARLO
        </p>

        <p
          class="more-observation"
        ></p>

        <div
          class="detail-actions"
        >

          <button
            class="more-back-button"
            type="button"
          >
            ← Volver
          </button>

        </div>

      </div>

    </section>

    <!-- ==================================================
         FINAL MESSAGE
         ================================================== -->

    <section class="final-panel">

      <div class="final-content">

        <div class="final-opening">

          <blockquote class="final-quote">
            “I’ll search the skies for you.”
          </blockquote>

          <p class="final-attribution">
            STARSET — Die For You
          </p>

        </div>

        <div class="final-divider"></div>

        <div class="final-message">

          <p>
            Quise hacer esto porque a veces me cuesta
            encontrar una forma sencilla de decir todo
            lo que pienso y siento por ti.
          </p>

          <p>
            El cielo siempre ha sido algo que admiro
            muchísimo, así que supongo que terminé
            haciendo lo que me resulta más natural:
            buscar ahí arriba alguna manera de
            explicarlo. Entre estrellas, cúmulos y cosas
            que están a años luz de nosotros, terminé
            encontrando pequeñas partes de todo aquello
            que me recuerda a ti.
          </p>

          <p>
            Tu mirada, las cosas que admiro de ti,
            lo bien que se siente estar cerca de ti y
            esa intensidad que algunos momentos contigo
            consiguen dejar después.
          </p>

          <p>
            Quizá por eso me gusta pensar en todo esto
            como distancias que poco a poco se vuelven
            más pequeñas. Cosas que inicialmente parecen
            lejanas hasta que encuentras una manera de
            acercarte a ellas.
          </p>

          <p>
            Cuatro objetos probablemente no sean
            suficientes para decir todo lo que me
            gustaría. Y quizá nunca encuentre una
            estrella, una nebulosa o una constelación
            capaz de explicarlo por completo.
          </p>

          <p>
            Pero creo que eso también me gusta.
            Significa que todavía quedan muchas cosas
            por descubrir, muchas noches para mirar
            hacia arriba y muchas formas nuevas de
            intentar decirte lo que a veces me cuesta
            expresar con palabras.
          </p>

        </div>

        <div class="final-secondary-quote">

          <blockquote>
            “This is the start of something new.”
          </blockquote>

          <p>
            Sleep Token — Telomeres
          </p>

        </div>

        <p class="final-ending">
          Y si voy a seguir buscando respuestas
          en el cielo, me gustaría hacerlo contigo.
        </p>

        <button
          class="final-back-button"
          type="button"
        >
          ← Volver al cielo
        </button>

      </div>

    </section>

    <!-- ==================================================
         REOPEN LETTER
         ================================================== -->

    <button
      class="letter-button"
      type="button"
      aria-label="Volver a leer la carta"
    >
      Carta
    </button>

    <!-- ==================================================
         PORTRAIT NOTICE
         ================================================== -->

    <div class="rotate-notice">

      <div class="rotate-icon">
        ↻
      </div>

      <p>
        Gira tu dispositivo
      </p>

      <small>
        Sag2 está diseñado para verse en horizontal.
      </small>

    </div>
  `

  document.body.appendChild(
    root
  )

  // ==================================================
  // ELEMENTS
  // ==================================================

  const overview =
    root.querySelector(
      '.overview-ui'
    ) as HTMLElement

  const detailPanel =
    root.querySelector(
      '.detail-panel'
    ) as HTMLElement

  const detailContent =
    root.querySelector(
      '.detail-content'
    ) as HTMLElement

  const moreContent =
    root.querySelector(
      '.more-content'
    ) as HTMLElement

  const finalPanel =
    root.querySelector(
      '.final-panel'
    ) as HTMLElement

  const finalContent =
    root.querySelector(
      '.final-content'
    ) as HTMLElement

  const kicker =
    root.querySelector(
      '.detail-kicker'
    ) as HTMLElement

  const title =
    root.querySelector(
      '.detail-title'
    ) as HTMLElement

  const astronomy =
    root.querySelector(
      '.detail-astronomy'
    ) as HTMLElement

  const personal =
    root.querySelector(
      '.detail-personal'
    ) as HTMLElement

  const attribution =
    root.querySelector(
      '.detail-attribution'
    ) as HTMLElement

  const morePersonal =
    root.querySelector(
      '.more-personal'
    ) as HTMLElement

  const moreObservation =
    root.querySelector(
      '.more-observation'
    ) as HTMLElement

  const progress =
    root.querySelector(
      '.progress-text'
    ) as HTMLElement

  const backButton =
    root.querySelector(
      '.back-button'
    ) as HTMLButtonElement

  const moreButton =
    root.querySelector(
      '.more-button'
    ) as HTMLButtonElement

  const moreBackButton =
    root.querySelector(
      '.more-back-button'
    ) as HTMLButtonElement

  const finalBackButton =
    root.querySelector(
      '.final-back-button'
    ) as HTMLButtonElement

  const letterButton =
    root.querySelector(
      '.letter-button'
    ) as HTMLButtonElement

  // ==================================================
  // DESTINATION CONTENT
  // ==================================================

  function showDetail(
    destination:
      DestinationData
  ) {
    kicker.textContent =
      destination.subtitle

    title.textContent =
      destination.name

    astronomy.textContent =
      destination.astronomicalText

    personal.textContent =
      destination.personalText

    attribution.textContent =
      destination.personalAttribution

    morePersonal.textContent =
      destination.moreInfo.personal

    moreObservation.textContent =
      destination.moreInfo.observation

    closeMoreInfo()
  }

  // ==================================================
  // PROGRESS
  // ==================================================

  function setProgress(
    visited: number,
    total: number
  ) {
    progress.textContent =
      `${visited} / ${total} explorados`
  }

  // ==================================================
  // OVERVIEW
  // ==================================================

  function hideOverview() {
    overview.classList.add(
      'hidden'
    )
  }

  function showOverview() {
    overview.classList.remove(
      'hidden'
    )
  }

  // ==================================================
  // DETAIL PANEL
  // ==================================================

  function openDetailPanel() {
    detailPanel.classList.add(
      'visible'
    )
  }

  function closeDetailPanel() {
    detailPanel.classList.remove(
      'visible'
    )

    closeMoreInfo()
  }

  // ==================================================
  // MORE INFO
  // ==================================================

  function openMoreInfo() {
    detailContent.classList.add(
      'hidden'
    )

    moreContent.classList.add(
      'visible'
    )
  }

  function closeMoreInfo() {
    detailContent.classList.remove(
      'hidden'
    )

    moreContent.classList.remove(
      'visible'
    )
  }

  // ==================================================
  // FINAL MESSAGE
  // ==================================================

  function openFinalPanel() {
    hideOverview()

    finalPanel.classList.add(
      'visible'
    )

    // Always reopen the letter from the beginning.
    finalContent.scrollTop =
      0

    requestAnimationFrame(
      () => {
        finalContent.scrollTop =
          0
      }
    )
  }

  function closeFinalPanel() {
    finalPanel.classList.remove(
      'visible'
    )

    showOverview()
  }

  // ==================================================
  // LETTER BUTTON
  // ==================================================

  function showLetterButton() {
    letterButton.classList.add(
      'visible'
    )
  }

  function hideLetterButton() {
    letterButton.classList.remove(
      'visible'
    )
  }

  return {
    root,

    backButton,
    moreButton,
    moreBackButton,
    finalBackButton,
    letterButton,

    showDetail,
    setProgress,

    hideOverview,
    showOverview,

    openDetailPanel,
    closeDetailPanel,

    openMoreInfo,
    closeMoreInfo,

    openFinalPanel,
    closeFinalPanel,

    showLetterButton,
    hideLetterButton
  }
}

export type AppInterface =
  ReturnType<
    typeof createInterface
  >