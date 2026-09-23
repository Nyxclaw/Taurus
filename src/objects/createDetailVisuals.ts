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

  group.position.set(
    -1.35,
    0,
    0
  )

  group.visible =
    false

  scene.add(
    group
  )

  // ==================================================
  // ALDEBARAN
  // ==================================================

  const aldebaran =
    createAldebaran()

  // ==================================================
  // HYADES
  // ==================================================

  const hyades =
    createHyades()

  // ==================================================
  // PLEIADES
  // ==================================================

  const pleiades =
    createPleiades()

  // ==================================================
  // CRAB NEBULA
  // ==================================================

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
  // SHOW SELECTED DESTINATION
  // ==================================================

  function show(
    id: DestinationId
  ) {
    Object.entries(
      visuals
    ).forEach(
      ([key, visual]) => {
        visual.visible =
          key === id
      }
    )
  }

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