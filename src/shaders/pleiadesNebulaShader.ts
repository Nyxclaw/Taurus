import * as THREE from 'three'

export function createPleiadesNebulaMaterial() {
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

      uColorA: {
        value:
          new THREE.Color(
            0x2d5fa8
          )
      },

      uColorB: {
        value:
          new THREE.Color(
            0x90c7ff
          )
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

      uniform vec3 uColorA;
      uniform vec3 uColorB;

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
          i < 5;
          i++
        ) {
          value +=
            noise(p) *
            amplitude;

          p *= 2.0;

          amplitude *=
            0.5;
        }

        return value;
      }

      void main() {
        vec2 uv =
          vUv -
          0.5;

        float distanceFromCenter =
          length(uv);

        vec2 warpedUv =
          uv * 3.4;

        warpedUv.x +=
          sin(
            warpedUv.y * 2.0 +
            uTime * 0.08
          ) * 0.16;

        warpedUv.y +=
          cos(
            warpedUv.x * 1.7 -
            uTime * 0.06
          ) * 0.14;

        float cloud =
          fbm(
            warpedUv +
            uTime * 0.015
          );

        float fineDetail =
          fbm(
            warpedUv * 2.7 -
            uTime * 0.02
          );

        cloud =
          cloud * 0.72 +
          fineDetail * 0.28;

        float mask =
          smoothstep(
            0.58,
            0.08,
            distanceFromCenter
          );

        float alpha =
          cloud *
          mask *
          0.32;

        vec3 color =
          mix(
            uColorA,
            uColorB,
            cloud
          );

        gl_FragColor =
          vec4(
            color,
            alpha
          );
      }
    `
  })
}