import * as THREE from 'three'

import {
  createStarMaterial
} from '../shaders/starShader'

export function createAldebaran() {
  const group =
    new THREE.Group()

  const material =
    createStarMaterial()

  const sphere =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.18,
        96,
        96
      ),

      material
    )

  group.add(
    sphere
  )

  const glow =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        1.38,
        64,
        64
      ),

      new THREE.MeshBasicMaterial({
        color:
          0xff3518,

        transparent:
          true,

        opacity:
          0.12,

        side:
          THREE.BackSide
      })
    )

  group.add(
    glow
  )

  function update(
    elapsed: number,
    delta: number
  ) {
    material.uniforms
      .uTime
      .value =
      elapsed

    sphere.rotation.y +=
      delta * 0.035

    group.rotation.z =
      Math.sin(
        elapsed * 0.12
      ) * 0.02
  }

  return {
    group,
    sphere,
    glow,
    material,
    update
  }
}