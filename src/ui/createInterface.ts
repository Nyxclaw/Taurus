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
        <span>TAURUS</span>

        <small>
          Explore the constellation
        </small>
      </div>

      <div class="progress">
        <span class="progress-text">
          0 / 4 explored
        </span>
      </div>

    </div>

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

        <p
          class="detail-personal"
        ></p>

        <div
          class="detail-actions"
        >

          <button
            class="more-button"
            type="button"
          >
            Learn more
          </button>

          <button
            class="back-button"
            type="button"
          >
            ← Return
          </button>

        </div>

      </div>

    </section>

    <div class="rotate-notice">

      <div class="rotate-icon">
        ↻
      </div>

      <p>
        Rotate your device
      </p>

      <small>
        Sag2 is designed for landscape mode.
      </small>

    </div>
  `

  document.body.appendChild(
    root
  )

  const overview =
    root.querySelector(
      '.overview-ui'
    ) as HTMLElement

  const detailPanel =
    root.querySelector(
      '.detail-panel'
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
  }

  function setProgress(
    visited: number,
    total: number
  ) {
    progress.textContent =
      `${visited} / ${total} explored`
  }

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

  function openDetailPanel() {
    detailPanel.classList.add(
      'visible'
    )
  }

  function closeDetailPanel() {
    detailPanel.classList.remove(
      'visible'
    )
  }

  return {
    root,

    backButton,
    moreButton,

    showDetail,
    setProgress,

    hideOverview,
    showOverview,

    openDetailPanel,
    closeDetailPanel
  }
}

export type AppInterface =
  ReturnType<
    typeof createInterface
  >