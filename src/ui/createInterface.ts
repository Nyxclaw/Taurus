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

    <section class="detail-panel">

      <!-- =============================================
           MAIN DESTINATION CONTENT
           ============================================= -->

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

      <!-- =============================================
           MORE INFO
           ============================================= -->

      <div class="more-content">

        <p
          class="more-kicker"
        >
          POR QUÉ ME RECUERDA A TI
        </p>

        <p
          class="more-personal"
        ></p>

        <div
          class="detail-divider"
        ></div>

        <p
          class="more-kicker"
        >
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

    <!-- ===============================================
         PORTRAIT NOTICE
         =============================================== -->

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

    // Always begin on the main view.
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

  return {
    root,

    backButton,
    moreButton,
    moreBackButton,

    showDetail,
    setProgress,

    hideOverview,
    showOverview,

    openDetailPanel,
    closeDetailPanel,

    openMoreInfo,
    closeMoreInfo
  }
}

export type AppInterface =
  ReturnType<
    typeof createInterface
  >