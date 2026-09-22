import * as THREE from 'three'

export function createStarMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: {
        value: 0
      },

      uColorDeep: {
        value:
          new THREE.Color(
            0x8f1f0b
          )
      },

      uColorMid: {
        value:
          new THREE.Color(
            0xe14b16
          )
      },

      uColorHot: {
        value:
          new THREE.Color(
            0xffb35a
          )
      },

      uFresnelColor: {
        value:
          new THREE.Color(
            0xffc28a
          )
      }
    },

    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;

      void main() {
        vNormal =
          normalize(
            normalMatrix *
            normal
          );

        vec4 worldPosition =
          modelMatrix *
          vec4(
            position,
            1.0
          );

        vWorldPosition =
          worldPosition.xyz;

        gl_Position =
          projectionMatrix *
          viewMatrix *
          worldPosition;
      }
    `,

    fragmentShader: `
      uniform float uTime;

      uniform vec3 uColorDeep;
      uniform vec3 uColorMid;
      uniform vec3 uColorHot;
      uniform vec3 uFresnelColor;

      varying vec3 vNormal;
      varying vec3 vWorldPosition;

      float hash(vec3 p) {
        p =
          fract(
            p *
            0.3183099 +
            0.1
          );

        p *= 17.0;

        return fract(
          p.x *
          p.y *
          p.z *
          (
            p.x +
            p.y +
            p.z
          )
        );
      }

      float noise(vec3 p) {
        vec3 i =
          floor(p);

        vec3 f =
          fract(p);

        f =
          f * f *
          (
            3.0 -
            2.0 * f
          );

        return mix(
          mix(
            mix(
              hash(
                i +
                vec3(
                  0.0,
                  0.0,
                  0.0
                )
              ),

              hash(
                i +
                vec3(
                  1.0,
                  0.0,
                  0.0
                )
              ),

              f.x
            ),

            mix(
              hash(
                i +
                vec3(
                  0.0,
                  1.0,
                  0.0
                )
              ),

              hash(
                i +
                vec3(
                  1.0,
                  1.0,
                  0.0
                )
              ),

              f.x
            ),

            f.y
          ),

          mix(
            mix(
              hash(
                i +
                vec3(
                  0.0,
                  0.0,
                  1.0
                )
              ),

              hash(
                i +
                vec3(
                  1.0,
                  0.0,
                  1.0
                )
              ),

              f.x
            ),

            mix(
              hash(
                i +
                vec3(
                  0.0,
                  1.0,
                  1.0
                )
              ),

              hash(
                i +
                vec3(
                  1.0,
                  1.0,
                  1.0
                )
              ),

              f.x
            ),

            f.y
          ),

          f.z
        );
      }

      float fbm(vec3 p) {
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
            amplitude *
            noise(p);

          p *= 2.03;

          amplitude *=
            0.5;
        }

        return value;
      }

      void main() {
        vec3 p =
          normalize(
            vWorldPosition
          ) * 3.0;

        p.y +=
          uTime * 0.06;

        p.x +=
          sin(
            uTime *
            0.03
          ) * 0.35;

        float largeDetail =
          fbm(
            p * 1.1
          );

        float smallDetail =
          fbm(
            p * 3.4 +
            largeDetail
          );

        float intensity =
          clamp(
            largeDetail *
            0.7 +

            smallDetail *
            0.6,

            0.0,
            1.0
          );

        vec3 baseColor =
          mix(
            uColorDeep,
            uColorMid,
            intensity
          );

        baseColor =
          mix(
            baseColor,
            uColorHot,

            smoothstep(
              0.58,
              0.95,
              intensity
            )
          );

        vec3 viewDirection =
          normalize(
            cameraPosition -
            vWorldPosition
          );

        float fresnel =
          pow(
            1.0 -
            max(
              dot(
                normalize(
                  vNormal
                ),
                viewDirection
              ),
              0.0
            ),
            2.4
          );

        vec3 finalColor =
          baseColor +
          uFresnelColor *
          fresnel *
          0.55;

        gl_FragColor =
          vec4(
            finalColor,
            1.0
          );
      }
    `
  })
}