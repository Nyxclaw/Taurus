import * as THREE from 'three'

import {
  createCrabNebulaMaterial
} from '../shaders/crabNebulaShader'

export function createCrabNebula() {
  const group =
    new THREE.Group()

  // ==================================================
  // MAIN NEBULA LAYERS
  // ==================================================

  const backMaterial =
    createCrabNebulaMaterial({
      innerColor:
        0x6fa8d8,

      outerColor:
        0x7a2f45,

      opacity:
        0.34,

      scale:
        3.2,

      speed:
        0.08,

      seed:
        1.2
    })

  const backLayer =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.9,
        2.15
      ),

      backMaterial
    )

  backLayer.position.set(
    0,
    0,
    -0.45
  )

  backLayer.rotation.z =
    -0.14

  group.add(
    backLayer
  )

  // --------------------------------------------------

  const middleMaterial =
    createCrabNebulaMaterial({
      innerColor:
        0x88c7e8,

      outerColor:
        0xb44862,

      opacity:
        0.42,

      scale:
        4.3,

      speed:
        0.1,

      seed:
        3.7
    })

  const middleLayer =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.55,
        1.8
      ),

      middleMaterial
    )

  middleLayer.position.set(
    0.04,
    0.02,
    -0.2
  )

  middleLayer.rotation.z =
    0.22

  group.add(
    middleLayer
  )

  // --------------------------------------------------

  const frontMaterial =
    createCrabNebulaMaterial({
      innerColor:
        0xa8e5ff,

      outerColor:
        0xd15a73,

      opacity:
        0.28,

      scale:
        5.2,

      speed:
        0.12,

      seed:
        7.1
    })

  const frontLayer =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.15,
        1.55
      ),

      frontMaterial
    )

  frontLayer.position.set(
    -0.04,
    -0.03,
    0.05
  )

  frontLayer.rotation.z =
    -0.33

  group.add(
    frontLayer
  )

  // ==================================================
  // CENTRAL CORE
  // ==================================================

  const core =
    new THREE.Mesh(
      new THREE.SphereGeometry(
        0.075,
        24,
        24
      ),

      new THREE.MeshBasicMaterial({
        color:
          0xdff7ff
      })
    )

  core.position.set(
    0.02,
    0.01,
    0.15
  )

  group.add(
    core
  )

  // ==================================================
  // CORE GLOW TEXTURE
  // ==================================================

  function createCoreGlowTexture() {
    const canvas =
      document.createElement(
        'canvas'
      )

    canvas.width =
      128

    canvas.height =
      128

    const context =
      canvas.getContext(
        '2d'
      )

    if (!context) {
      throw new Error(
        'Could not create Crab Nebula core glow.'
      )
    }

    const gradient =
      context.createRadialGradient(
        64,
        64,
        0,

        64,
        64,
        64
      )

    gradient.addColorStop(
      0,
      'rgba(255,255,255,1)'
    )

    gradient.addColorStop(
      0.12,
      'rgba(180,235,255,0.95)'
    )

    gradient.addColorStop(
      0.4,
      'rgba(80,160,255,0.35)'
    )

    gradient.addColorStop(
      1,
      'rgba(60,100,255,0)'
    )

    context.fillStyle =
      gradient

    context.fillRect(
      0,
      0,
      128,
      128
    )

    const texture =
      new THREE.CanvasTexture(
        canvas
      )

    texture.colorSpace =
      THREE.SRGBColorSpace

    return texture
  }

  const coreGlow =
    new THREE.Sprite(
      new THREE.SpriteMaterial({
        map:
          createCoreGlowTexture(),

        transparent:
          true,

        blending:
          THREE.AdditiveBlending,

        depthWrite:
          false,

        opacity:
          0.85
      })
    )

  coreGlow.position.copy(
    core.position
  )

  coreGlow.scale.set(
    0.55,
    0.55,
    1
  )

  group.add(
    coreGlow
  )

  // ==================================================
  // FILAMENT PARTICLES
  // ==================================================

  const particleCount =
    170

  const particlePositions =
    new Float32Array(
      particleCount * 3
    )

  for (
    let i = 0;
    i < particleCount;
    i++
  ) {
    const angle =
      Math.random() *
      Math.PI *
      2

    const radius =
      0.35 +
      Math.pow(
        Math.random(),
        0.8
      ) * 0.85

    const index =
      i * 3

    particlePositions[index] =
      Math.cos(
        angle
      ) *
      radius *
      1.15 +
      (
        Math.random() -
        0.5
      ) *
      0.12

    particlePositions[
      index + 1
    ] =
      Math.sin(
        angle
      ) *
      radius *
      0.72 +
      (
        Math.random() -
        0.5
      ) *
      0.1

    particlePositions[
      index + 2
    ] =
      (
        Math.random() -
        0.5
      ) *
      0.45
  }

  const particleGeometry =
    new THREE.BufferGeometry()

  particleGeometry.setAttribute(
    'position',

    new THREE.BufferAttribute(
      particlePositions,
      3
    )
  )

  const particles =
    new THREE.Points(
      particleGeometry,

      new THREE.PointsMaterial({
        color:
          0xff8fa6,

        size:
          0.018,

        transparent:
          true,

        opacity:
          0.55,

        blending:
          THREE.AdditiveBlending,

        depthWrite:
          false
      })
    )

  group.add(
    particles
  )

  // ==================================================
  // INITIAL TRANSFORM
  // ==================================================

  group.scale.set(
    1.05,
    1.05,
    1.05
  )

  group.rotation.x =
    -0.04

  group.rotation.z =
    0.08

  // ==================================================
  // UPDATE
  // ==================================================

  function update(
    elapsed: number,
    delta: number
  ) {
    backMaterial.uniforms
      .uTime
      .value =
      elapsed

    middleMaterial.uniforms
      .uTime
      .value =
      elapsed * 0.92

    frontMaterial.uniforms
      .uTime
      .value =
      elapsed * 1.08

    group.rotation.z =
      0.08 +
      Math.sin(
        elapsed *
        0.08
      ) * 0.018

    particles.rotation.z +=
      delta * 0.006

    const pulse =
      0.5 +
      Math.sin(
        elapsed *
        1.3
      ) * 0.5

    const coreScale =
      0.48 +
      pulse * 0.06

    coreGlow.scale.set(
      coreScale,
      coreScale,
      1
    )
  }

  return {
    group,
    update
  }
}