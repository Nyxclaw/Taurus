import * as THREE from 'three'
import './style.css'

// ==================================================
// SCENE
// ==================================================

const scene = new THREE.Scene()

scene.background = new THREE.Color(0x020207)


// ==================================================
// CAMERA
// ==================================================

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const overviewCameraPosition =
  new THREE.Vector3(0, 0, 8)

const detailCameraPosition =
  new THREE.Vector3(0, 0, 4.6)

camera.position.copy(
  overviewCameraPosition
)


// ==================================================
// RENDERER
// ==================================================

const renderer = new THREE.WebGLRenderer({
  antialias: true
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

document.body.appendChild(
  renderer.domElement
)


// ==================================================
// BACKGROUND STAR FIELD
// ==================================================

const starCount = 2500

const starPositions =
  new Float32Array(
    starCount * 3
  )

for (
  let i = 0;
  i < starCount;
  i++
) {

  const index =
    i * 3

  starPositions[index] =
    (Math.random() - 0.5) * 100

  starPositions[index + 1] =
    (Math.random() - 0.5) * 100

  starPositions[index + 2] =
    (Math.random() - 0.5) * 100
}

const starGeometry =
  new THREE.BufferGeometry()

starGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(
    starPositions,
    3
  )
)

const starMaterial =
  new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.06,
    sizeAttenuation: true
  })

const starField =
  new THREE.Points(
    starGeometry,
    starMaterial
  )

scene.add(starField)


// ==================================================
// TAURUS DATA
// ==================================================

type TaurusStarData = {
  name: string
  position: [number, number, number]
  color: number
  size: number
  interactive?: boolean
}

const taurusStars: TaurusStarData[] = [

  {
    name: 'Aldebaran',
    position: [1.7, -0.15, 0],
    color: 0xff6b32,
    size: 0.22,
    interactive: true
  },

  {
    name: 'Theta Tauri',
    position: [1.0, -0.55, 0],
    color: 0xffecd1,
    size: 0.10
  },

  {
    name: 'Lambda Tauri',
    position: [0.60, 0.35, 0],
    color: 0xe6edff,
    size: 0.11
  },

  {
    name: 'Ain',
    position: [0.05, 1.05, 0],
    color: 0xfff2d8,
    size: 0.13
  },

  {
    name: 'Elnath',
    position: [-1.75, 1.75, 0],
    color: 0xdde8ff,
    size: 0.15
  },

  {
    name: 'Zeta Tauri',
    position: [-1.95, -1.35, 0],
    color: 0xdce7ff,
    size: 0.13
  }
]


// ==================================================
// TAURUS GROUP
// ==================================================

const taurusGroup =
  new THREE.Group()

scene.add(
  taurusGroup
)


// ==================================================
// CREATE TAURUS STARS
// ==================================================

const taurusStarMeshes:
  THREE.Mesh[] = []

taurusStars.forEach(
  (starData) => {

    const geometry =
      new THREE.SphereGeometry(
        starData.size,
        32,
        32
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
      starData.position[0],
      starData.position[1],
      starData.position[2]
    )

    star.userData = {
      name:
        starData.name,

      interactive:
        starData.interactive
        ?? false
    }

    taurusGroup.add(
      star
    )

    taurusStarMeshes.push(
      star
    )
  }
)


// ==================================================
// STAR LOOKUP
// ==================================================

const starByName =
  new Map<
    string,
    THREE.Mesh
  >()

taurusStarMeshes.forEach(
  (star) => {

    starByName.set(
      star.userData.name,
      star
    )
  }
)


// ==================================================
// CONSTELLATION LINES
// ==================================================

function createConstellationLine(
  from: THREE.Vector3,
  to: THREE.Vector3
) {

  const geometry =
    new THREE.BufferGeometry()
      .setFromPoints([
        from,
        to
      ])

  const material =
    new THREE.LineBasicMaterial({
      color: 0x4b5870,
      transparent: true,
      opacity: 0.50
    })

  const line =
    new THREE.Line(
      geometry,
      material
    )

  taurusGroup.add(
    line
  )
}

function connectStars(
  starA: string,
  starB: string
) {

  const a =
    starByName.get(
      starA
    )

  const b =
    starByName.get(
      starB
    )

  if (!a || !b) {
    return
  }

  createConstellationLine(
    a.position,
    b.position
  )
}


// ==================================================
// TAURUS SHAPE
// ==================================================

connectStars(
  'Aldebaran',
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
  'Zeta Tauri'
)


// ==================================================
// DETAIL ALDEBARAN
// ==================================================

const detailAldebaranGeometry =
  new THREE.SphereGeometry(
    1.2,
    64,
    64
  )

const detailAldebaranMaterial =
  new THREE.MeshBasicMaterial({
    color: 0xff6b32
  })

const detailAldebaran =
  new THREE.Mesh(
    detailAldebaranGeometry,
    detailAldebaranMaterial
  )

detailAldebaran.position.set(
  -1.35,
  0,
  0
)

detailAldebaran.visible =
  false

scene.add(
  detailAldebaran
)


// ==================================================
// TEMPORARY GLOW
// ==================================================

const detailGlowGeometry =
  new THREE.SphereGeometry(
    1.38,
    64,
    64
  )

const detailGlowMaterial =
  new THREE.MeshBasicMaterial({
    color: 0xff3517,
    transparent: true,
    opacity: 0.10,
    side: THREE.BackSide
  })

const detailGlow =
  new THREE.Mesh(
    detailGlowGeometry,
    detailGlowMaterial
  )

detailGlow.position.copy(
  detailAldebaran.position
)

detailGlow.visible =
  false

scene.add(
  detailGlow
)


// ==================================================
// HTML DETAIL PANEL
// ==================================================

const detailPanel =
  document.createElement('div')

detailPanel.className =
  'detail-panel'

detailPanel.innerHTML = `
  <div class="detail-content">
    <p class="detail-kicker">
      TAURUS
    </p>

    <h1>
      Aldebaran
    </h1>

    <p class="detail-description">
      The brightest star in Taurus.
      This is only temporary content
      while we build the final
      astronomical presentation.
    </p>

    <button
      class="back-button"
      type="button"
    >
      ← Return
    </button>
  </div>
`

document.body.appendChild(
  detailPanel
)

const backButton =
  detailPanel.querySelector(
    '.back-button'
  ) as HTMLButtonElement


// ==================================================
// RAYCASTING
// ==================================================

const raycaster =
  new THREE.Raycaster()

const pointer =
  new THREE.Vector2()

function updatePointer(
  clientX: number,
  clientY: number
) {

  pointer.x =
    (
      clientX /
      window.innerWidth
    ) * 2 - 1

  pointer.y =
    -(
      clientY /
      window.innerHeight
    ) * 2 + 1
}

function getInteractiveStar() {

  raycaster.setFromCamera(
    pointer,
    camera
  )

  const intersections =
    raycaster.intersectObjects(
      taurusStarMeshes,
      false
    )

  for (
    const intersection
    of intersections
  ) {

    const object =
      intersection.object

    if (
      object.userData
        .interactive
    ) {
      return object
    }
  }

  return null
}


// ==================================================
// APP STATE
// ==================================================

type ViewState =
  | 'overview'
  | 'entering'
  | 'detail'
  | 'leaving'

let viewState:
  ViewState =
  'overview'

let transitionProgress =
  0

const transitionDuration =
  1.8

const cameraStartPosition =
  new THREE.Vector3()

const cameraTargetPosition =
  new THREE.Vector3()

const taurusStartScale =
  new THREE.Vector3()

const taurusTargetScale =
  new THREE.Vector3()


// ==================================================
// EASING
// ==================================================

function easeInOutCubic(
  value: number
) {

  return value < 0.5
    ? 4 * value * value * value
    : 1 -
      Math.pow(
        -2 * value + 2,
        3
      ) / 2
}


// ==================================================
// ENTER DETAIL VIEW
// ==================================================

function enterAldebaran() {

  if (
    viewState !==
    'overview'
  ) {
    return
  }

  viewState =
    'entering'

  transitionProgress =
    0

  cameraStartPosition.copy(
    camera.position
  )

  cameraTargetPosition.copy(
    detailCameraPosition
  )

  taurusStartScale.copy(
    taurusGroup.scale
  )

  taurusTargetScale.set(
    0.01,
    0.01,
    0.01
  )

  detailAldebaran.visible =
    true

  detailGlow.visible =
    true

  document.body.style.cursor =
    'default'
}


// ==================================================
// LEAVE DETAIL VIEW
// ==================================================

function leaveAldebaran() {

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

  cameraStartPosition.copy(
    camera.position
  )

  cameraTargetPosition.copy(
    overviewCameraPosition
  )

  taurusStartScale.copy(
    taurusGroup.scale
  )

  taurusTargetScale.set(
    1,
    1,
    1
  )
}


// ==================================================
// POINTER MOVEMENT
// ==================================================

window.addEventListener(
  'pointermove',
  (event) => {

    if (
      viewState !==
      'overview'
    ) {
      return
    }

    updatePointer(
      event.clientX,
      event.clientY
    )

    const star =
      getInteractiveStar()

    document.body.style.cursor =
      star
        ? 'pointer'
        : 'default'
  }
)


// ==================================================
// POINTER CLICK
// ==================================================

window.addEventListener(
  'pointerdown',
  (event) => {

    if (
      viewState !==
      'overview'
    ) {
      return
    }

    updatePointer(
      event.clientX,
      event.clientY
    )

    const star =
      getInteractiveStar()

    if (
      star?.userData.name ===
      'Aldebaran'
    ) {

      enterAldebaran()
    }
  }
)


// ==================================================
// RETURN BUTTON
// ==================================================

backButton.addEventListener(
  'click',
  () => {

    leaveAldebaran()
  }
)


// ==================================================
// WINDOW RESIZE
// ==================================================

window.addEventListener(
  'resize',
  () => {

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
)


// ==================================================
// ANIMATION
// ==================================================

const clock =
  new THREE.Clock()

function animate() {

  requestAnimationFrame(
    animate
  )

  const delta =
    clock.getDelta()

  const elapsedTime =
    clock.elapsedTime

  // -----------------------------------------------
  // Background movement
  // -----------------------------------------------

  starField.rotation.y =
    elapsedTime * 0.002


  // -----------------------------------------------
  // Detail star rotation
  // -----------------------------------------------

  if (
    detailAldebaran.visible
  ) {

    detailAldebaran.rotation.y +=
      delta * 0.12
  }


  // -----------------------------------------------
  // Enter transition
  // -----------------------------------------------

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
      cameraStartPosition,
      cameraTargetPosition,
      eased
    )

    taurusGroup.scale.lerpVectors(
      taurusStartScale,
      taurusTargetScale,
      eased
    )

    if (
      normalized >= 1
    ) {

      viewState =
        'detail'

      taurusGroup.visible =
        false

      detailPanel.classList.add(
        'visible'
      )
    }
  }


  // -----------------------------------------------
  // Leave transition
  // -----------------------------------------------

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
      cameraStartPosition,
      cameraTargetPosition,
      eased
    )

    taurusGroup.scale.lerpVectors(
      taurusStartScale,
      taurusTargetScale,
      eased
    )

    if (
      normalized >= 1
    ) {

      viewState =
        'overview'

      taurusGroup.visible =
        true

      detailAldebaran.visible =
        false

      detailGlow.visible =
        false
    }
  }


  renderer.render(
    scene,
    camera
  )
}

animate()