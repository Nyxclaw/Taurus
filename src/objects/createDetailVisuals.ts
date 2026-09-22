import * as THREE from 'three'

import {
  createAldebaran
} from './createAldebaran'

import {
  createStarCluster
} from './createStarCluster'

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

  const aldebaran =
    createAldebaran()

  const hyades =
    createStarCluster({
      count:
        70,

      spread:
        2.7,

      color:
        0xffedd6,

      rotationSpeed:
        0.018
    })

  const pleiades =
    createStarCluster({
      count:
        55,

      spread:
        2.0,

      color:
        0xdceaff,

      rotationSpeed:
        0.025
    })

  const crab =
    createCrabNebula()

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

  function update(
    elapsed: number,
    delta: number
  ) {
    aldebaran.update(
      elapsed,
      delta
    )

    hyades.update(
      delta
    )

    pleiades.update(
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