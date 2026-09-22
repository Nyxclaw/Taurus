import * as THREE from 'three'
import './style.css'

// ======================================================
// TYPES
// ======================================================

type DestinationId =
  | 'aldebaran'
  | 'hyades'
  | 'pleiades'
  | 'crab'

type DestinationType =
  | 'star'
  | 'cluster'
  | 'nebula'

type DestinationData = {
  id: DestinationId
  name: string
  subtitle: string
  type: DestinationType

  position: [number, number, number]

  astronomicalText: string
  personalText: string
}

type TaurusStarData = {
  name: string
  position: [number, number, number]
  color: number
  size: number
}

// ======================================================
// SCENE
// ======================================================

const scene = new THREE.Scene()

scene.background =
  new THREE.Color(0x010106)

// ======================================================
// CAMERA
// ======================================================

const camera =
  new THREE.PerspectiveCamera(
    58,
    window.innerWidth /
      window.innerHeight,
    0.1,
    1000
  )

const overviewCameraPosition =
  new THREE.Vector3(
    0,
    0,
    9
  )

const detailCameraPosition =
  new THREE.Vector3(
    0,
    0,
    4.8
  )

camera.position.copy(
  overviewCameraPosition
)

// ======================================================
// RENDERER
// ======================================================

const renderer =
  new THREE.WebGLRenderer({
    antialias: true,
    powerPreference:
      'high-performance'
  })

renderer.setSize(
  window.innerWidth,
  window.innerHeight
)

renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
)

renderer.outputColorSpace =
  THREE.SRGBColorSpace

document.body.appendChild(
  renderer.domElement
)

// ======================================================
// BACKGROUND STARFIELD
// ======================================================

const backgroundStarCount = 3000

const backgroundPositions =
  new Float32Array(
    backgroundStarCount * 3
  )

for (
  let i = 0;
  i < backgroundStarCount;
  i++
) {
  const index = i * 3

  backgroundPositions[index] =
    (Math.random() - 0.5) *
    120

  backgroundPositions[index + 1] =
    (Math.random() - 0.5) *
    120

  backgroundPositions[index + 2] =
    (Math.random() - 0.5) *
    120
}

const backgroundGeometry =
  new THREE.BufferGeometry()

backgroundGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    backgroundPositions,
    3
  )
)

const backgroundMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.055,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  })

const starField =
  new THREE.Points(
    backgroundGeometry,
    backgroundMaterial
  )

scene.add(starField)

// ======================================================
// DESTINATION DATA
// ======================================================

const destinations:
  Record<
    DestinationId,
    DestinationData
  > = {
  aldebaran: {
    id: 'aldebaran',

    name: 'Aldebaran',

    subtitle:
      'Alpha Tauri',

    type: 'star',

    position: [
      1.65,
      -0.15,
      0
    ],

    astronomicalText:
      'The brightest apparent star in Taurus. Aldebaran is an orange giant that visually marks one of the eyes of the constellation.',

    personalText:
      'Personal message about her eyes and the way her gaze feels will eventually appear here.'
  },

  hyades: {
    id: 'hyades',

    name: 'Hyades',

    subtitle:
      'Open star cluster',

    type: 'cluster',

    position: [
      1.05,
      -0.05,
      -0.15
    ],

    astronomicalText:
      'The Hyades form the prominent V-shaped group in the face of Taurus. Aldebaran appears in the same direction from Earth, although it is not actually a member of the cluster.',

    personalText:
      'Personal message about her intelligence, dedication and effort will eventually appear here.'
  },

  pleiades: {
    id: 'pleiades',

    name: 'Pleiades',

    subtitle:
      'Messier 45',

    type: 'cluster',

    position: [
      3.05,
      1.75,
      -0.3
    ],

    astronomicalText:
      'The Pleiades are a young open star cluster in Taurus, easily visible to the naked eye as a compact group of bright stars.',

    personalText:
      'Personal message about the warmth of her hugs will eventually appear here.'
  },

  crab: {
    id: 'crab',

    name: 'Crab Nebula',

    subtitle:
      'Messier 1',

    type: 'nebula',

    position: [
      -2.8,
      -1.25,
      -0.2
    ],

    astronomicalText:
      'The Crab Nebula is a supernova remnant in Taurus. It is the expanding debris of a stellar explosion observed from Earth in the year 1054.',

    personalText:
      'Personal message about the intensity of being close to her will eventually appear here.'
  }
}

// ======================================================
// PRINCIPAL TAURUS STARS
// ======================================================

const taurusStars:
  TaurusStarData[] = [
  {
    name: 'Aldebaran',
    position: [
      1.65,
      -0.15,
      0
    ],
    color: 0xff7545,
    size: 0.18
  },

  {
    name: 'Theta Tauri',
    position: [
      1.05,
      -0.52,
      0
    ],
    color: 0xffedd4,
    size: 0.09
  },

  {
    name: 'Gamma Tauri',
    position: [
      0.7,
      0.25,
      0
    ],
    color: 0xf2f2e8,
    size: 0.09
  },

  {
    name: 'Delta Tauri',
    position: [
      0.95,
      0.05,
      0
    ],
    color: 0xffefd8,
    size: 0.08
  },

  {
    name: 'Ain',
    position: [
      0.05,
      1.05,
      0
    ],
    color: 0xfff0ca,
    size: 0.11
  },

  {
    name: 'Elnath',
    position: [
      -1.85,
      1.85,
      0
    ],
    color: 0xdde7ff,
    size: 0.14
  },

  {
    name: 'Tianguan',
    position: [
      -2.15,
      -1.45,
      0
    ],
    color: 0xdce7ff,
    size: 0.12
  },

  {
    name: 'Lambda Tauri',
    position: [
      0.45,
      0.55,
      0
    ],
    color: 0xe5ecff,
    size: 0.09
  },

  {
    name: 'Xi Tauri',
    position: [
      2.15,
      -1.0,
      0
    ],
    color: 0xf2f5ff,
    size: 0.075
  },

  {
    name: 'Omicron Tauri',
    position: [
      2.55,
      -1.35,
      0
    ],
    color: 0xffedd8,
    size: 0.07
  }
]

// ======================================================
// CONSTELLATION GROUP
// ======================================================

const overviewGroup =
  new THREE.Group()

scene.add(
  overviewGroup
)

// ======================================================
// CREATE PRINCIPAL STARS
// ======================================================

const starByName =
  new Map<
    string,
    THREE.Mesh
  >()

taurusStars.forEach(
  (starData) => {
    const geometry =
      new THREE.SphereGeometry(
        starData.size,
        24,
        24
      )

    const material =
      new THREE.MeshBasicMaterial({
        color:
          starData.color
      })

    const star =
      new THREE.Mesh(
        geometry,
        material
      )

    star.position.set(
      ...starData.position
    )

    overviewGroup.add(
      star
    )

    starByName.set(
      starData.name,
      star
    )
  }
)

// ======================================================
// CONSTELLATION LINES
// ======================================================

function connectStars(
  fromName: string,
  toName: string
) {
  const from =
    starByName.get(
      fromName
    )

  const to =
    starByName.get(
      toName
    )

  if (!from || !to) {
    return
  }

  const geometry =
    new THREE.BufferGeometry()
      .setFromPoints([
        from.position,
        to.position
      ])

  const material =
    new THREE.LineBasicMaterial({
      color: 0x61708c,
      transparent: true,
      opacity: 0.34
    })

  const line =
    new THREE.Line(
      geometry,
      material
    )

  overviewGroup.add(
    line
  )
}

connectStars(
  'Aldebaran',
  'Gamma Tauri'
)

connectStars(
  'Gamma Tauri',
  'Lambda Tauri'
)

connectStars(
  'Lambda Tauri',
  'Ain'
)

connectStars(
  'Ain',
  'Elnath'
)

connectStars(
  'Aldebaran',
  'Theta Tauri'
)

connectStars(
  'Theta Tauri',
  'Tianguan'
)

connectStars(
  'Aldebaran',
  'Xi Tauri'
)

connectStars(
  'Xi Tauri',
  'Omicron Tauri'
)

// ======================================================
// OVERVIEW CLUSTER MARKERS
// ======================================================

function createSmallCluster(
  position:
    [number, number, number],
  count: number,
  spread: number,
  color: number
) {
  const group =
    new THREE.Group()

  group.position.set(
    ...position
  )

  for (
    let i = 0;
    i < count;
    i++
  ) {
    const size =
      0.025 +
      Math.random() *
      0.035

    const geometry =
      new THREE.SphereGeometry(
        size,
        12,
        12
      )

    const material =
      new THREE.MeshBasicMaterial({
        color
      })

    const star =
      new THREE.Mesh(
        geometry,
        material
      )

    star.position.set(
      (
        Math.random() -
        0.5
      ) * spread,

      (
        Math.random() -
        0.5
      ) * spread,

      (
        Math.random() -
        0.5
      ) * 0.3
    )

    group.add(
      star
    )
  }

  overviewGroup.add(
    group
  )

  return group
}

createSmallCluster(
  destinations.hyades.position,
  18,
  0.85,
  0xf4e7d2
)

createSmallCluster(
  destinations.pleiades.position,
  14,
  0.58,
  0xdceaff
)

// ======================================================
// CRAB OVERVIEW MARKER
// ======================================================

const crabMarkerGeometry =
  new THREE.SphereGeometry(
    0.11,
    24,
    24
  )

const crabMarkerMaterial =
  new THREE.MeshBasicMaterial({
    color: 0x9cb4d6,
    transparent: true,
    opacity: 0.6
  })

const crabMarker =
  new THREE.Mesh(
    crabMarkerGeometry,
    crabMarkerMaterial
  )

crabMarker.position.set(
  ...destinations.crab.position
)

overviewGroup.add(
  crabMarker
)

// ======================================================
// TOUCH / CLICK TARGETS
// ======================================================

const hitTargets:
  THREE.Mesh[] = []

function createHitTarget(
  destination:
    DestinationData,
  radius = 0.42
) {
  const geometry =
    new THREE.SphereGeometry(
      radius,
      16,
      16
    )

  const material =
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false
    })

  const hitTarget =
    new THREE.Mesh(
      geometry,
      material
    )

  hitTarget.position.set(
    ...destination.position
  )

  hitTarget.userData = {
    destinationId:
      destination.id
  }

  overviewGroup.add(
    hitTarget
  )

  hitTargets.push(
    hitTarget
  )
}

createHitTarget(
  destinations.aldebaran,
  0.46
)

createHitTarget(
  destinations.hyades,
  0.58
)

createHitTarget(
  destinations.pleiades,
  0.55
)

createHitTarget(
  destinations.crab,
  0.48
)

// ======================================================
// DETAIL ROOT GROUP
// ======================================================

const detailGroup =
  new THREE.Group()

detailGroup.visible =
  false

scene.add(
  detailGroup
)

// ======================================================
// DETAIL: ALDEBARAN
// ======================================================

const aldebaranDetail =
  new THREE.Group()

const aldebaranSphere =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      1.18,
      64,
      64
    ),

    new THREE.MeshBasicMaterial({
      color: 0xff6c35
    })
  )

aldebaranDetail.add(
  aldebaranSphere
)

const aldebaranGlow =
  new THREE.Mesh(
    new THREE.SphereGeometry(
      1.38,
      64,
      64
    ),

    new THREE.MeshBasicMaterial({
      color: 0xff3518,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide
    })
  )

aldebaranDetail.add(
  aldebaranGlow
)

// ======================================================
// DETAIL: CLUSTER FACTORY
// ======================================================

function createDetailCluster(
  count: number,
  spread: number,
  color: number
) {
  const group =
    new THREE.Group()

  for (
    let i = 0;
    i < count;
    i++
  ) {
    const size =
      0.035 +
      Math.random() *
      0.065

    const sphere =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          size,
          16,
          16
        ),

        new THREE.MeshBasicMaterial({
          color
        })
      )

    sphere.position.set(
      (
        Math.random() -
        0.5
      ) * spread,

      (
        Math.random() -
        0.5
      ) * spread,

      (
        Math.random() -
        0.5
      ) * 1.4
    )

    group.add(
      sphere
    )
  }

  return group
}

const hyadesDetail =
  createDetailCluster(
    70,
    2.7,
    0xffedd6
  )

const pleiadesDetail =
  createDetailCluster(
    55,
    2.0,
    0xdceaff
  )

// ======================================================
// DETAIL: CRAB PLACEHOLDER
// ======================================================

const crabDetail =
  new THREE.Group()

for (
  let i = 0;
  i < 9;
  i++
) {
  const radius =
    0.45 +
    i * 0.075

  const cloud =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        radius,
        32,
        32
      ),

      new THREE.MeshBasicMaterial({
        color:
          i % 2 === 0
            ? 0x6686aa
            : 0xa06070,

        transparent: true,

        opacity:
          0.045,

        wireframe:
          false
      })
    )

  cloud.scale.set(
    1.55,
    0.85 +
      i * 0.025,
    0.7
  )

  cloud.rotation.z =
    i * 0.17

  crabDetail.add(
    cloud
  )
}

// ======================================================
// DETAIL VISUAL LOOKUP
// ======================================================

const detailVisuals:
  Record<
    DestinationId,
    THREE.Object3D
  > = {
  aldebaran:
    aldebaranDetail,

  hyades:
    hyadesDetail,

  pleiades:
    pleiadesDetail,

  crab:
    crabDetail
}

Object.values(
  detailVisuals
).forEach(
  visual => {
    visual.visible =
      false

    detailGroup.add(
      visual
    )
  }
)

detailGroup.position.set(
  -1.35,
  0,
  0
)

// ======================================================
// USER INTERFACE
// ======================================================

const interfaceRoot =
  document.createElement(
    'div'
  )

interfaceRoot.className =
  'ui-root'

interfaceRoot.innerHTML = `
  <div class="overview-ui">
    <div class="project-title">
      <span>TAURUS</span>
      <small>Explore the constellation</small>
    </div>

    <div class="progress">
      <span class="progress-text">
        0 / 4 explored
      </span>
    </div>
  </div>

  <section class="detail-panel">
    <div class="detail-content">

      <p class="detail-kicker"></p>

      <h1 class="detail-title"></h1>

      <p class="detail-astronomy"></p>

      <div class="detail-divider"></div>

      <p class="detail-personal"></p>

      <div class="detail-actions">
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
  interfaceRoot
)

const overviewUI =
  interfaceRoot.querySelector(
    '.overview-ui'
  ) as HTMLElement

const detailPanel =
  interfaceRoot.querySelector(
    '.detail-panel'
  ) as HTMLElement

const detailKicker =
  interfaceRoot.querySelector(
    '.detail-kicker'
  ) as HTMLElement

const detailTitle =
  interfaceRoot.querySelector(
    '.detail-title'
  ) as HTMLElement

const detailAstronomy =
  interfaceRoot.querySelector(
    '.detail-astronomy'
  ) as HTMLElement

const detailPersonal =
  interfaceRoot.querySelector(
    '.detail-personal'
  ) as HTMLElement

const progressText =
  interfaceRoot.querySelector(
    '.progress-text'
  ) as HTMLElement

const backButton =
  interfaceRoot.querySelector(
    '.back-button'
  ) as HTMLButtonElement

const moreButton =
  interfaceRoot.querySelector(
    '.more-button'
  ) as HTMLButtonElement

// ======================================================
// VISITED STATE
// ======================================================

const visitedDestinations =
  new Set<DestinationId>()

function updateProgress() {
  progressText.textContent =
    `${visitedDestinations.size} / 4 explored`
}

// ======================================================
// APP STATE
// ======================================================

type ViewState =
  | 'overview'
  | 'entering'
  | 'detail'
  | 'leaving'

let viewState:
  ViewState =
  'overview'

let currentDestination:
  DestinationId |
  null =
  null

let transitionProgress =
  0

const transitionDuration =
  1.65

const cameraStart =
  new THREE.Vector3()

const cameraEnd =
  new THREE.Vector3()

const overviewScaleStart =
  new THREE.Vector3()

const overviewScaleEnd =
  new THREE.Vector3()

// ======================================================
// EASING
// ======================================================

function easeInOutCubic(
  value: number
) {
  return value < 0.5
    ? 4 *
      value *
      value *
      value

    : 1 -
      Math.pow(
        -2 * value + 2,
        3
      ) / 2
}

// ======================================================
// RAYCASTER
// ======================================================

const raycaster =
  new THREE.Raycaster()

const pointer =
  new THREE.Vector2()

function updatePointer(
  event: PointerEvent
) {
  pointer.x =
    (
      event.clientX /
      window.innerWidth
    ) * 2 - 1

  pointer.y =
    -(
      event.clientY /
      window.innerHeight
    ) * 2 + 1
}

function getDestinationAtPointer():
  DestinationId |
  null {
  raycaster.setFromCamera(
    pointer,
    camera
  )

  const hits =
    raycaster.intersectObjects(
      hitTargets,
      false
    )

  if (
    hits.length === 0
  ) {
    return null
  }

  return hits[0]
    .object
    .userData
    .destinationId
}

// ======================================================
// DETAIL VIEW
// ======================================================

function showDestinationVisual(
  id: DestinationId
) {
  Object.entries(
    detailVisuals
  ).forEach(
    ([key, visual]) => {
      visual.visible =
        key === id
    }
  )
}

function updateDetailContent(
  destination:
    DestinationData
) {
  detailKicker.textContent =
    destination.subtitle

  detailTitle.textContent =
    destination.name

  detailAstronomy.textContent =
    destination.astronomicalText

  detailPersonal.textContent =
    destination.personalText
}

// ======================================================
// ENTER DESTINATION
// ======================================================

function enterDestination(
  id: DestinationId
) {
  if (
    viewState !==
    'overview'
  ) {
    return
  }

  currentDestination =
    id

  visitedDestinations.add(
    id
  )

  updateProgress()

  const destination =
    destinations[id]

  updateDetailContent(
    destination
  )

  showDestinationVisual(
    id
  )

  detailGroup.visible =
    true

  viewState =
    'entering'

  transitionProgress =
    0

  cameraStart.copy(
    camera.position
  )

  cameraEnd.copy(
    detailCameraPosition
  )

  overviewScaleStart.copy(
    overviewGroup.scale
  )

  overviewScaleEnd.set(
    0.02,
    0.02,
    0.02
  )

  overviewUI.classList.add(
    'hidden'
  )

  document.body.style.cursor =
    'default'
}

// ======================================================
// LEAVE DESTINATION
// ======================================================

function leaveDestination() {
  if (
    viewState !==
    'detail'
  ) {
    return
  }

  viewState =
    'leaving'

  transitionProgress =
    0

  detailPanel.classList.remove(
    'visible'
  )

  cameraStart.copy(
    camera.position
  )

  cameraEnd.copy(
    overviewCameraPosition
  )

  overviewScaleStart.copy(
    overviewGroup.scale
  )

  overviewScaleEnd.set(
    1,
    1,
    1
  )
}

// ======================================================
// POINTER EVENTS
// ======================================================

window.addEventListener(
  'pointermove',
  event => {
    if (
      viewState !==
      'overview'
    ) {
      return
    }

    updatePointer(
      event
    )

    const destination =
      getDestinationAtPointer()

    document.body.style.cursor =
      destination
        ? 'pointer'
        : 'default'
  }
)

window.addEventListener(
  'pointerdown',
  event => {
    if (
      viewState !==
      'overview'
    ) {
      return
    }

    updatePointer(
      event
    )

    const destination =
      getDestinationAtPointer()

    if (destination) {
      enterDestination(
        destination
      )
    }
  }
)

// ======================================================
// UI BUTTONS
// ======================================================

backButton.addEventListener(
  'click',
  leaveDestination
)

moreButton.addEventListener(
  'click',
  () => {
    if (
      !currentDestination
    ) {
      return
    }

    const destination =
      destinations[
        currentDestination
      ]

    alert(
      `More detailed information about ${destination.name} will be added in the astronomy-information phase.`
    )
  }
)

// ======================================================
// RESIZE
// ======================================================

function resize() {
  camera.aspect =
    window.innerWidth /
    window.innerHeight

  camera.updateProjectionMatrix()

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  )

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  )
}

window.addEventListener(
  'resize',
  resize
)

// ======================================================
// ANIMATION
// ======================================================

const clock =
  new THREE.Clock()

function animate() {
  requestAnimationFrame(
    animate
  )

  const delta =
    clock.getDelta()

  const elapsed =
    clock.elapsedTime

  // ------------------------------------------
  // Ambient starfield movement
  // ------------------------------------------

  starField.rotation.y =
    elapsed *
    0.0018

  // ------------------------------------------
  // Detail visual movement
  // ------------------------------------------

  aldebaranSphere.rotation.y +=
    delta * 0.1

  aldebaranDetail.rotation.z =
    Math.sin(
      elapsed * 0.12
    ) * 0.02

  hyadesDetail.rotation.y +=
    delta * 0.018

  pleiadesDetail.rotation.y +=
    delta * 0.025

  crabDetail.rotation.z +=
    delta * 0.012

  // ------------------------------------------
  // ENTER
  // ------------------------------------------

  if (
    viewState ===
    'entering'
  ) {
    transitionProgress +=
      delta /
      transitionDuration

    const normalized =
      Math.min(
        transitionProgress,
        1
      )

    const eased =
      easeInOutCubic(
        normalized
      )

    camera.position.lerpVectors(
      cameraStart,
      cameraEnd,
      eased
    )

    overviewGroup.scale
      .lerpVectors(
        overviewScaleStart,
        overviewScaleEnd,
        eased
      )

    if (
      normalized >= 1
    ) {
      overviewGroup.visible =
        false

      viewState =
        'detail'

      detailPanel.classList.add(
        'visible'
      )
    }
  }

  // ------------------------------------------
  // LEAVE
  // ------------------------------------------

  if (
    viewState ===
    'leaving'
  ) {
    transitionProgress +=
      delta /
      transitionDuration

    const normalized =
      Math.min(
        transitionProgress,
        1
      )

    const eased =
      easeInOutCubic(
        normalized
      )

    camera.position.lerpVectors(
      cameraStart,
      cameraEnd,
      eased
    )

    overviewGroup.visible =
      true

    overviewGroup.scale
      .lerpVectors(
        overviewScaleStart,
        overviewScaleEnd,
        eased
      )

    if (
      normalized >= 1
    ) {
      viewState =
        'overview'

      detailGroup.visible =
        false

      overviewUI.classList.remove(
        'hidden'
      )

      currentDestination =
        null
    }
  }

  renderer.render(
    scene,
    camera
  )
}

animate()