import * as THREE from 'three'

export function createCrabNebula() {
  const group =
    new THREE.Group()

  for (
    let i = 0;
    i < 9;
    i++
  ) {
    const radius =
      0.45 +
      i * 0.075

    const material =
      new THREE.MeshBasicMaterial({
        color:
          i % 2 === 0
            ? 0x6686aa
            : 0xa06070,

        transparent:
          true,

        opacity:
          0.045
      })

    const cloud =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          radius,
          32,
          32
        ),

        material
      )

    cloud.scale.set(
      1.55,

      0.85 +
        i * 0.025,

      0.7
    )

    cloud.rotation.z =
      i * 0.17

    group.add(
      cloud
    )
  }

  function update(
    delta: number
  ) {
    group.rotation.z +=
      delta * 0.012
  }

  return {
    group,
    update
  }
}