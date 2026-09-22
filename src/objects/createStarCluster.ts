import * as THREE from 'three'

type StarClusterOptions = {
  count: number
  spread: number
  color: number
  rotationSpeed: number
}

export function createStarCluster(
  options:
    StarClusterOptions
) {
  const group =
    new THREE.Group()

  for (
    let i = 0;
    i < options.count;
    i++
  ) {
    const size =
      0.035 +
      Math.random() *
      0.065

    const sphere =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          size,
          16,
          16
        ),

        new THREE.MeshBasicMaterial({
          color:
            options.color
        })
      )

    sphere.position.set(
      (
        Math.random() -
        0.5
      ) * options.spread,

      (
        Math.random() -
        0.5
      ) * options.spread,

      (
        Math.random() -
        0.5
      ) * 1.4
    )

    group.add(
      sphere
    )
  }

  function update(
    delta: number
  ) {
    group.rotation.y +=
      delta *
      options.rotationSpeed
  }

  return {
    group,
    update
  }
}