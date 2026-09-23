import * as THREE from 'three'

type HyadesStarData = {
  position: [number, number, number]
  size: number
  color: number
  glowScale: number
  glowOpacity: number
}

export function createHyades() {
  const group =
    new THREE.Group()

  // ==================================================
  // PRINCIPAL HYADES STARS
  // ==================================================

  const principalStars:
    HyadesStarData[] = [
    {
      position: [
        -1.05,
        0.72,
        0.08
      ],
      size: 0.08,
      color: 0xf8edda,
      glowScale: 3.2,
      glowOpacity: 0.42
    },

    {
      position: [
        -0.62,
        0.42,
        -0.06
      ],
      size: 0.095,
      color: 0xfff1dc,
      glowScale: 3.5,
      glowOpacity: 0.46
    },

    {
      position: [
        -0.18,
        0.16,
        0.12
      ],
      size: 0.115,
      color: 0xffedd1,
      glowScale: 3.9,
      glowOpacity: 0.5
    },

    {
      position: [
        0.22,
        -0.08,
        -0.08
      ],
      size: 0.09,
      color: 0xf7ead5,
      glowScale: 3.2,
      glowOpacity: 0.42
    },

    {
      position: [
        0.62,
        -0.28,
        0.05
      ],
      size: 0.075,
      color: 0xf0e6d8,
      glowScale: 2.9,
      glowOpacity: 0.38
    },

    {
      position: [
        -0.82,
        -0.1,
        -0.04
      ],
      size: 0.072,
      color: 0xf7e9d2,
      glowScale: 2.8,
      glowOpacity: 0.34
    },

    {
      position: [
        -0.36,
        -0.34,
        0.1
      ],
      size: 0.09,
      color: 0xffe8c8,
      glowScale: 3.1,
      glowOpacity: 0.4
    },

    {
      position: [
        0.06,
        -0.56,
        -0.12
      ],
      size: 0.082,
      color: 0xf8ead1,
      glowScale: 2.9,
      glowOpacity: 0.37
    },

    {
      position: [
        0.44,
        -0.78,
        0.06
      ],
      size: 0.07,
      color: 0xefe4d5,
      glowScale: 2.7,
      glowOpacity: 0.32
    }
  ]

  // ==================================================
  // GLOW TEXTURE
  // ==================================================

  function createGlowTexture() {
    const canvas =
      document.createElement(
        'canvas'
      )

    canvas.width = 128
    canvas.height = 128

    const context =
      canvas.getContext('2d')

    if (!context) {
      throw new Error(
        'Could not create Hyades glow texture.'
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
      0.15,
      'rgba(255,242,214,0.92)'
    )

    gradient.addColorStop(
      0.4,
      'rgba(255,210,150,0.3)'
    )

    gradient.addColorStop(
      1,
      'rgba(255,170,80,0)'
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
  // PRINCIPAL STARS + GLOWS
  // ==================================================

  principalStars.forEach(
    starData => {
      const star =
        new THREE.Mesh(
          new THREE.SphereGeometry(
            starData.size,
            20,
            20
          ),
          new THREE.MeshBasicMaterial({
            color:
              starData.color
          })
        )

      star.position.set(
        ...starData.position
      )

      group.add(star)

      const glow =
        new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glowTexture,
            color: starData.color,
            transparent: true,
            blending:
              THREE.AdditiveBlending,
            depthWrite: false,
            opacity:
              starData.glowOpacity
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

      group.add(glow)
    }
  )

  // ==================================================
  // FAINT STARS ALONG THE V SHAPE
  // ==================================================

  const branchAStart =
    new THREE.Vector3(
      -1.1,
      0.82,
      0
    )

  const branchAEnd =
    new THREE.Vector3(
      0.72,
      -0.3,
      0
    )

  const branchBStart =
    new THREE.Vector3(
      -0.9,
      -0.06,
      0
    )

  const branchBEnd =
    new THREE.Vector3(
      0.48,
      -0.82,
      0
    )

  function createFaintStar(
    x: number,
    y: number,
    z: number
  ) {
    const size =
      0.012 +
      Math.random() * 0.02

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
            0.5
              ? 0xf6e9d1
              : 0xeed9b7,
          transparent: true,
          opacity:
            0.35 +
            Math.random() * 0.22
        })
      )

    star.position.set(
      x,
      y,
      z
    )

    group.add(star)
  }

  for (
    let i = 0;
    i < 32;
    i++
  ) {
    const t = Math.random()

    const point =
      new THREE.Vector3()
        .lerpVectors(
          branchAStart,
          branchAEnd,
          t
        )

    createFaintStar(
      point.x +
        (Math.random() - 0.5) * 0.28,
      point.y +
        (Math.random() - 0.5) * 0.22,
      (Math.random() - 0.5) * 0.35
    )
  }

  for (
    let i = 0;
    i < 26;
    i++
  ) {
    const t = Math.random()

    const point =
      new THREE.Vector3()
        .lerpVectors(
          branchBStart,
          branchBEnd,
          t
        )

    createFaintStar(
      point.x +
        (Math.random() - 0.5) * 0.26,
      point.y +
        (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.35
    )
  }

  // ==================================================
  // AMBIENT CLUSTER MEMBERS
  // ==================================================

  for (
    let i = 0;
    i < 24;
    i++
  ) {
    const radius =
      Math.pow(
        Math.random(),
        1.35
      ) * 1.7

    const angle =
      Math.random() *
      Math.PI * 2

    const x =
      Math.cos(angle) *
      radius

    const y =
      Math.sin(angle) *
      radius * 0.7

    const z =
      (Math.random() - 0.5) *
      0.5

    createFaintStar(
      x,
      y,
      z
    )
  }

  // ==================================================
  // INITIAL ORIENTATION
  // ==================================================

  group.rotation.x =
    -0.06

  group.rotation.z =
    -0.06

  // ==================================================
  // UPDATE
  // ==================================================

  function update(
    elapsed: number,
    delta: number
  ) {
    group.rotation.y +=
      delta * 0.01

    group.rotation.z =
      -0.06 +
      Math.sin(
        elapsed * 0.09
      ) * 0.015
  }

  return {
    group,
    update
  }
}