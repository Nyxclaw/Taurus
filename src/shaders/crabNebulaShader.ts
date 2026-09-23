import * as THREE from 'three'

type CrabNebulaMaterialOptions = {
  innerColor: number
  outerColor: number
  opacity: number
  scale: number
  speed: number
  seed: number
}

export function createCrabNebulaMaterial(
  options:
    CrabNebulaMaterialOptions
) {
  return new THREE.ShaderMaterial({
    transparent: true,

    depthWrite: false,

    blending:
      THREE.AdditiveBlending,

    side:
      THREE.DoubleSide,

    uniforms: {
      uTime: {
        value: 0
      },

      uInnerColor: {
        value:
          new THREE.Color(
            options.innerColor
          )
      },

      uOuterColor: {
        value:
          new THREE.Color(
            options.outerColor
          )
      },

      uOpacity: {
        value:
          options.opacity
      },

      uScale: {
        value:
          options.scale
      },

      uSpeed: {
        value:
          options.speed
      },

      uSeed: {
        value:
          options.seed
      }
    },

    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;

        gl_Position =
          projectionMatrix *
          modelViewMatrix *
          vec4(
            position,
            1.0
          );
      }
    `,

    fragmentShader: `
      uniform float uTime;

      uniform vec3 uInnerColor;
      uniform vec3 uOuterColor;

      uniform float uOpacity;
      uniform float uScale;
      uniform float uSpeed;
      uniform float uSeed;

      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(
          sin(
            dot(
              p,
              vec2(
                127.1,
                311.7
              )
            )
          ) *
          43758.5453123
        );
      }

      float noise(vec2 p) {
        vec2 i =
          floor(p);

        vec2 f =
          fract(p);

        f =
          f *
          f *
          (
            3.0 -
            2.0 * f
          );

        float a =
          hash(i);

        float b =
          hash(
            i +
            vec2(
              1.0,
              0.0
            )
          );

        float c =
          hash(
            i +
            vec2(
              0.0,
              1.0
            )
          );

        float d =
          hash(
            i +
            vec2(
              1.0,
              1.0
            )
          );

        return mix(
          mix(
            a,
            b,
            f.x
          ),

          mix(
            c,
            d,
            f.x
          ),

          f.y
        );
      }

      float fbm(vec2 p) {
        float value =
          0.0;

        float amplitude =
          0.5;

        for (
          int i = 0;
          i < 6;
          i++
        ) {
          value +=
            noise(p) *
            amplitude;

          p *= 2.02;

          amplitude *=
            0.5;
        }

        return value;
      }

      void main() {
        vec2 uv =
          vUv -
          0.5;

        uv.x *= 1.25;

        float radial =
          length(uv);

        float angle =
          atan(
            uv.y,
            uv.x
          );

        vec2 warped =
          uv * uScale;

        warped.x +=
          sin(
            warped.y *
            2.1 +
            uTime *
            uSpeed +
            uSeed
          ) * 0.22;

        warped.y +=
          cos(
            warped.x *
            1.7 -
            uTime *
            uSpeed *
            0.8 +
            uSeed
          ) * 0.18;

        float baseNoise =
          fbm(
            warped +
            vec2(
              uSeed,
              uSeed * 0.37
            )
          );

        float fineNoise =
          fbm(
            warped *
            3.2 -
            uTime *
            uSpeed *
            0.12
          );

        float filaments =
          sin(
            angle *
            8.0 +
            baseNoise *
            7.0 +
            uTime *
            uSpeed *
            0.4
          );

        filaments =
          smoothstep(
            0.42,
            0.9,
            abs(
              filaments
            )
          );

        float turbulence =
          baseNoise *
          0.68 +
          fineNoise *
          0.32;

        float shape =
          smoothstep(
            0.58,
            0.12,
            radial
          );

        float outerBand =
          smoothstep(
            0.48,
            0.28,
            radial
          ) -
          smoothstep(
            0.28,
            0.1,
            radial
          );

        float intensity =
          turbulence *
          shape;

        intensity +=
          filaments *
          outerBand *
          0.75;

        intensity =
          clamp(
            intensity,
            0.0,
            1.0
          );

        float centerGlow =
          smoothstep(
            0.28,
            0.0,
            radial
          );

        vec3 color =
          mix(
            uOuterColor,
            uInnerColor,
            centerGlow
          );

        color +=
          uInnerColor *
          centerGlow *
          0.35;

        float alpha =
          intensity *
          uOpacity;

        alpha +=
          filaments *
          shape *
          0.09;

        gl_FragColor =
          vec4(
            color,
            alpha
          );
      }
    `
  })
}