import * as THREE from 'three'

import {
  destinations
} from '../data/destinations'

import type {
  DestinationData
} from '../types'

export function createHitTargets(
  overviewGroup:
    THREE.Group
) {
  const hitTargets:
    THREE.Mesh[] = []

  function createHitTarget(
    destination:
      DestinationData,

    radius:
      number
  ) {
    const geometry =
      new THREE.SphereGeometry(
        radius,
        16,
        16
      )

    const material =
      new THREE.MeshBasicMaterial({
        transparent:
          true,

        opacity:
          0,

        depthWrite:
          false
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

  return hitTargets
}