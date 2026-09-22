import * as THREE from 'three'

export function createScene() {
  const scene =
    new THREE.Scene()

  scene.background =
    new THREE.Color(
      0x010106
    )

  const overviewCameraPosition =
    new THREE.Vector3(
      0,
      0,
      9
    )

  const detailCameraPosition =
    new THREE.Vector3(
      0,
      0,
      4.8
    )

  const camera =
    new THREE.PerspectiveCamera(
      58,

      window.innerWidth /
        window.innerHeight,

      0.1,
      1000
    )

  camera.position.copy(
    overviewCameraPosition
  )

  const renderer =
    new THREE.WebGLRenderer({
      antialias: true,

      powerPreference:
        'high-performance'
    })

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  )

  renderer.setPixelRatio(
    Math.min(
      window.devicePixelRatio,
      2
    )
  )

  renderer.outputColorSpace =
    THREE.SRGBColorSpace

  document.body.appendChild(
    renderer.domElement
  )

  function resize() {
    camera.aspect =
      window.innerWidth /
      window.innerHeight

    camera.updateProjectionMatrix()

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    )
  }

  window.addEventListener(
    'resize',
    resize
  )

  return {
    scene,
    camera,
    renderer,

    overviewCameraPosition,
    detailCameraPosition
  }
}