import * as THREE from 'three'

import {
  createAldebaran
} from './createAldebaran'

import {
  createHyades
} from './createHyades'

import {
  createPleiades
} from './createPleiades'

import {
  createCrabNebula
} from './createCrabNebula'

import type {
  DestinationId
} from '../types'

export function createDetailVisuals(
  scene: THREE.Scene
) {
  const group =
    new THREE.Group()

  group.visible =
    false

  scene.add(
    group
  )

  // ==================================================
  // DESTINATION OBJECTS
  // ==================================================

  const aldebaran =
    createAldebaran()

  const hyades =
    createHyades()

  const pleiades =
    createPleiades()

  const crab =
    createCrabNebula()

  // ==================================================
  // VISUAL LOOKUP
  // ==================================================

  const visuals:
    Record<
      DestinationId,
      THREE.Object3D
    > = {
    aldebaran:
      aldebaran.group,

    hyades:
      hyades.group,

    pleiades:
      pleiades.group,

    crab:
      crab.group
  }

  Object.values(
    visuals
  ).forEach(
    visual => {
      visual.visible =
        false

      group.add(
        visual
      )
    }
  )

  // ==================================================
  // ACTIVE DESTINATION
  // ==================================================

  let activeDestination:
    DestinationId | null =
    null

  // ==================================================
  // RESPONSIVE VISUAL TRANSFORMS
  // ==================================================

  function applyResponsiveTransform(
    id: DestinationId
  ) {
    const isMobileLandscape =
      window.innerHeight <= 520 &&
      window.innerWidth >
        window.innerHeight

    // ------------------------------------------
    // Reset position
    // ------------------------------------------

    group.position.set(
      isMobileLandscape
        ? -2.05
        : -1.35,

      0,
      0
    )

    // ------------------------------------------
    // Reset object scales
    // ------------------------------------------

    aldebaran.group.scale.setScalar(
      1
    )

    hyades.group.scale.setScalar(
      1
    )

    pleiades.group.scale.setScalar(
      1
    )

    crab.group.scale.setScalar(
      1.05
    )

    // ------------------------------------------
    // Desktop
    // ------------------------------------------

    if (!isMobileLandscape) {
      return
    }

    // ------------------------------------------
    // Mobile landscape
    // ------------------------------------------

    switch (id) {
      case 'aldebaran':
        aldebaran.group.scale.setScalar(
          1.3
        )
        break

      case 'hyades':
        hyades.group.scale.setScalar(
          1.35
        )
        break

      case 'pleiades':
        pleiades.group.scale.setScalar(
          1.38
        )
        break

      case 'crab':
        crab.group.scale.setScalar(
          1.8
        )
        break
    }
  }

  // ==================================================
  // SHOW SELECTED DESTINATION
  // ==================================================

  function show(
    id: DestinationId
  ) {
    activeDestination =
      id

    Object.entries(
      visuals
    ).forEach(
      ([key, visual]) => {
        visual.visible =
          key === id
      }
    )

    applyResponsiveTransform(
      id
    )
  }

  // ==================================================
  // HANDLE RESIZE / ROTATION
  // ==================================================

  window.addEventListener(
    'resize',
    () => {
      if (
        activeDestination
      ) {
        applyResponsiveTransform(
          activeDestination
        )
      }
    }
  )

  // ==================================================
  // UPDATE
  // ==================================================

  function update(
    elapsed: number,
    delta: number
  ) {
    aldebaran.update(
      elapsed,
      delta
    )

    hyades.update(
      elapsed,
      delta
    )

    pleiades.update(
      elapsed,
      delta
    )

    crab.update(
      elapsed,
      delta
    )
  }

  return {
    group,
    visuals,
    show,
    update
  }
}