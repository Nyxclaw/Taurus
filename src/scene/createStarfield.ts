import * as THREE from 'three'

export function createStarfield(
  scene: THREE.Scene
) {
  const starCount =
    3000

  const positions =
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

    positions[index] =
      (
        Math.random() -
        0.5
      ) * 120

    positions[index + 1] =
      (
        Math.random() -
        0.5
      ) * 120

    positions[index + 2] =
      (
        Math.random() -
        0.5
      ) * 120
  }

  const geometry =
    new THREE.BufferGeometry()

  geometry.setAttribute(
    'position',

    new THREE.BufferAttribute(
      positions,
      3
    )
  )

  const material =
    new THREE.PointsMaterial({
      color:
        0xffffff,

      size:
        0.055,

      transparent:
        true,

      opacity:
        0.9,

      sizeAttenuation:
        true
    })

  const points =
    new THREE.Points(
      geometry,
      material
    )

  scene.add(
    points
  )

  function update(
    elapsed: number
  ) {
    points.rotation.y =
      elapsed * 0.0018
  }

  return {
    points,
    update
  }
}