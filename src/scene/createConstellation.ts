import * as THREE from 'three'

import {
  taurusStars
} from '../data/taurusStars'

import {
  destinations
} from '../data/destinations'

function createSmallCluster(
  group: THREE.Group,

  position:
    [number, number, number],

  count: number,

  spread: number,

  color: number
) {
  const cluster =
    new THREE.Group()

  cluster.position.set(
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

    cluster.add(
      star
    )
  }

  group.add(
    cluster
  )

  return cluster
}

export function createConstellation(
  scene: THREE.Scene
) {
  const group =
    new THREE.Group()

  scene.add(
    group
  )

  const starByName =
    new Map<
      string,
      THREE.Mesh
    >()

  // ---------------------------------------
  // Principal stars
  // ---------------------------------------

  taurusStars.forEach(
    starData => {
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

      group.add(
        star
      )

      starByName.set(
        starData.name,
        star
      )
    }
  )

  // ---------------------------------------
  // Lines
  // ---------------------------------------

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
      new THREE
        .BufferGeometry()
        .setFromPoints([
          from.position,
          to.position
        ])

    const material =
      new THREE
        .LineBasicMaterial({
          color:
            0x61708c,

          transparent:
            true,

          opacity:
            0.34
        })

    const line =
      new THREE.Line(
        geometry,
        material
      )

    group.add(
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

  // ---------------------------------------
  // Hyades
  // ---------------------------------------

  createSmallCluster(
    group,
    destinations.hyades.position,
    18,
    0.85,
    0xf4e7d2
  )

  // ---------------------------------------
  // Pleiades
  // ---------------------------------------

  createSmallCluster(
    group,
    destinations.pleiades.position,
    14,
    0.58,
    0xdceaff
  )

  // ---------------------------------------
  // Crab marker
  // ---------------------------------------

  const crabMarker =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.11,
        24,
        24
      ),

      new THREE.MeshBasicMaterial({
        color:
          0x9cb4d6,

        transparent:
          true,

        opacity:
          0.6
      })
    )

  crabMarker.position.set(
    ...destinations.crab.position
  )

  group.add(
    crabMarker
  )

  return {
    group
  }
}