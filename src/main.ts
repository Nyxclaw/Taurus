import * as THREE from 'three'
import './style.css'

import {
  createScene
} from './scene/createScene'

import {
  createStarfield
} from './scene/createStarfield'

import {
  createConstellation
} from './scene/createConstellation'

import {
  createHitTargets
} from './scene/createHitTargets'

import {
  createDetailVisuals
} from './objects/createDetailVisuals'

import {
  createInterface
} from './ui/createInterface'

import {
  createNavigation
} from './scene/navigation'

// ======================================================
// CORE
// ======================================================

const {
  scene,
  camera,
  renderer,

  overviewCameraPosition,
  detailCameraPosition
} = createScene()

// ======================================================
// WORLD
// ======================================================

const starfield =
  createStarfield(
    scene
  )

const constellation =
  createConstellation(
    scene
  )

const hitTargets =
  createHitTargets(
    constellation.group
  )

// ======================================================
// DESTINATION VISUALS
// ======================================================

const detailVisuals =
  createDetailVisuals(
    scene
  )

// ======================================================
// INTERFACE
// ======================================================

const ui =
  createInterface()

// ======================================================
// NAVIGATION
// ======================================================

const navigation =
  createNavigation({
    camera,

    overviewCameraPosition,
    detailCameraPosition,

    overviewGroup:
      constellation.group,

    hitTargets,

    detailGroup:
      detailVisuals.group,

    showDetailVisual:
      detailVisuals.show,

    ui
  })

// ======================================================
// MAIN LOOP
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

  starfield.update(
    elapsed
  )

  detailVisuals.update(
    elapsed,
    delta
  )

  navigation.update(
    delta
  )

  renderer.render(
    scene,
    camera
  )
}

animate()