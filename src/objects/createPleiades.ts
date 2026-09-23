import * as THREE from 'three'

import {
  createPleiadesNebulaMaterial
} from '../shaders/pleiadesNebulaShader'

type BrightStarData = {
  position:
    [number, number, number]

  size:
    number

  color:
    number

  glowScale:
    number
}

export function createPleiades() {
  const group =
    new THREE.Group()

  // ==================================================
  // BRIGHT STARS
  // ==================================================

  const brightStars:
    BrightStarData[] = [
    {
      position: [
        -0.65,
        0.42,
        0.12
      ],

      size:
        0.065,

      color:
        0xeaf4ff,

      glowScale:
        4.4
    },

    {
      position: [
        -0.28,
        0.72,
        -0.08
      ],

      size:
        0.115,

      color:
        0xf4f8ff,

      glowScale:
        4.8
    },

    {
      position: [
        0.12,
        0.34,
        0.2
      ],

      size:
        0.085,

      color:
        0xffffff,

      glowScale:
        5.2
    },

    {
      position: [
        0.48,
        0.55,
        -0.18
      ],

      size:
        0.095,

      color:
        0xe8f1ff,

      glowScale:
        4.3
    },

    {
      position: [
        0.62,
        0.05,
        0.12
      ],

      size:
        0.105,

      color:
        0xf1f7ff,

      glowScale:
        4.6
    },

    {
      position: [
        0.05,
        -0.35,
        -0.14
      ],

      size:
        0.09,

      color:
        0xe6f0ff,

      glowScale:
        4.0
    },

    {
      position: [
        -0.52,
        -0.22,
        0.08
      ],

      size:
        0.08,

      color:
        0xe9f3ff,

      glowScale:
        3.8
    }
  ]

  // ==================================================
  // STAR GLOW TEXTURE
  // ==================================================

  function createGlowTexture() {
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
        'Could not create Pleiades glow texture.'
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
      0.10,
      'rgba(235,245,255,0.95)'
    )

    gradient.addColorStop(
      0.28,
      'rgba(150,195,255,0.55)'
    )

    gradient.addColorStop(
      0.58,
      'rgba(80,135,255,0.20)'
    )

    gradient.addColorStop(
      1,
      'rgba(30,80,180,0)'
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

  const glowTexture =
    createGlowTexture()

  // ==================================================
  // CREATE BRIGHT STARS
  // ==================================================

  brightStars.forEach(
    starData => {
      const star =
        new THREE.Mesh(
          new THREE.SphereGeometry(
            starData.size,
            24,
            24
          ),

          new THREE.MeshBasicMaterial({
            color:
              starData.color
          })
        )

      star.position.set(
        ...starData.position
      )

      group.add(
        star
      )

      const glow =
        new THREE.Sprite(
          new THREE.SpriteMaterial({
            map:
              glowTexture,

            color:
              starData.color,

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

      glow.position.copy(
        star.position
      )

      glow.scale.set(
        starData.size *
          starData.glowScale,

        starData.size *
          starData.glowScale,

        1
      )

      group.add(
        glow
      )
    }
  )

  // ==================================================
  // FAINT MEMBERS
  // ==================================================

  const faintStarCount =
    90

  for (
    let i = 0;
    i < faintStarCount;
    i++
  ) {
    const radius =
      Math.pow(
        Math.random(),
        1.7
      ) * 1.25

    const angle =
      Math.random() *
      Math.PI *
      2

    const x =
      Math.cos(
        angle
      ) * radius

    const y =
      Math.sin(
        angle
      ) * radius * 0.72

    const z =
      (
        Math.random() -
        0.5
      ) * 1.0

    const size =
      0.01 +
      Math.random() *
      0.018

    const star =
      new THREE.Mesh(
        new THREE.SphereGeometry(
          size,
          8,
          8
        ),

        new THREE.MeshBasicMaterial({
          color:
            Math.random() >
            0.35
              ? 0xdceaff
              : 0x9fc4ff,

          transparent:
            true,

          opacity:
            0.45 +
            Math.random() *
            0.2
        })
      )

    star.position.set(
      x,
      y,
      z
    )

    group.add(
      star
    )
  }

  // ==================================================
  // REFLECTION NEBULOSITY
  // ==================================================

  const nebulaMaterialA =
    createPleiadesNebulaMaterial()

  const nebulaA =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        3.2,
        2.25
      ),

      nebulaMaterialA
    )

  nebulaA.position.set(
    -0.05,
    0.08,
    -0.45
  )

  nebulaA.rotation.z =
    -0.12

  group.add(
    nebulaA
  )

  const nebulaMaterialB =
    createPleiadesNebulaMaterial()

  const nebulaB =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.4,
        1.55
      ),

      nebulaMaterialB
    )

  nebulaB.position.set(
    0.22,
    0.28,
    -0.25
  )

  nebulaB.rotation.z =
    0.48

  group.add(
    nebulaB
  )

  const nebulaMaterialC =
    createPleiadesNebulaMaterial()

  const nebulaC =
    new THREE.Mesh(
      new THREE.PlaneGeometry(
        2.0,
        1.25
      ),

      nebulaMaterialC
    )

  nebulaC.position.set(
    -0.42,
    -0.18,
    -0.12
  )

  nebulaC.rotation.z =
    -0.62

  group.add(
    nebulaC
  )

  // ==================================================
  // INITIAL ORIENTATION
  // ==================================================

  group.rotation.x =
    -0.08

  group.rotation.z =
    -0.15

  // ==================================================
  // UPDATE
  // ==================================================

  function update(
    elapsed: number,
    delta: number
  ) {
    group.rotation.y +=
      delta * 0.012

    group.rotation.z =
      -0.15 +
      Math.sin(
        elapsed *
        0.1
      ) * 0.02

    nebulaMaterialA.uniforms
      .uTime
      .value =
      elapsed

    nebulaMaterialB.uniforms
      .uTime
      .value =
      elapsed * 0.92

    nebulaMaterialC.uniforms
      .uTime
      .value =
      elapsed * 1.08
  }

  return {
    group,
    update
  }
}