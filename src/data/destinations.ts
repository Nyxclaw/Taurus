import type {
  DestinationData,
  DestinationId
} from '../types'

export const destinations:
  Record<
    DestinationId,
    DestinationData
  > = {

  // ==================================================
  // ALDEBARAN
  // ==================================================

  aldebaran: {
    id:
      'aldebaran',

    name:
      'Aldebarán',

    subtitle:
      'Alpha Tauri',

    type:
      'star',

    position: [
      1.65,
      -0.15,
      0
    ],

    astronomicalText:
      'Aldebarán es la estrella más brillante de Tauro y representa uno de los ojos de la constelación.',

    personalText:
      '“Captivate, hypnotized, by the fire in her eyes”',

    personalAttribution:
      'Lorna Shore — Pain Remains I',

    moreInfo: {
      personal:
        'Aldebarán representa una de las primeras cosas que observé en ti: tu mirada. Hay algo en la manera en que tus ojos consiguen detener mi atención, incluso cuando hay muchas otras cosas alrededor. Por eso me pareció apropiado empezar aquí, con el ojo de Tauro.',

      observation:
        'Aldebarán puede verse a simple vista dentro de Tauro. Una forma sencilla de encontrarla es localizar primero Orión y seguir la dirección de las tres estrellas de su cinturón hacia Tauro. Aldebarán destaca por su brillo y por su característico tono anaranjado.'
    }
  },

  // ==================================================
  // HYADES
  // ==================================================

  hyades: {
    id:
      'hyades',

    name:
      'Híades',

    subtitle:
      'Cúmulo estelar abierto',

    type:
      'cluster',

    position: [
      1.05,
      -0.05,
      -0.15
    ],

    astronomicalText:
      'Las Híades son el cúmulo estelar más cercano a la Tierra y forman gran parte de la característica V que dibuja el rostro de Tauro.',

    personalText:
      '“I’m caught up in her design”',

    personalAttribution:
      'Sleep Token — Alkaline',

    moreInfo: {
      personal:
        'Las Híades no llaman mi atención por una sola estrella, sino por lo que forman juntas. Me recuerdan a ti por algo parecido: no hay una sola cosa que admire. Es tu manera de pensar, lo dedicada que puedes ser, las cosas que sabes, tu esfuerzo y todos esos pequeños detalles que, juntos, hacen que quiera seguir conociéndote.',

      observation:
        'Busca Aldebarán y fíjate en las estrellas que la rodean formando una V. Ese grupo es la región de las Híades. Aldebarán parece formar parte del cúmulo desde nuestra perspectiva, aunque en realidad se encuentra mucho más cerca de nosotros.'
    }
  },

  // ==================================================
  // PLEIADES
  // ==================================================

  pleiades: {
    id:
      'pleiades',

    name:
      'Pléyades',

    subtitle:
      'Messier 45',

    type:
      'cluster',

    position: [
      3.05,
      1.75,
      -0.3
    ],

    astronomicalText:
      'Las Pléyades son un cúmulo de estrellas jóvenes en Tauro. A simple vista aparecen como un pequeño grupo muy compacto de estrellas azuladas.',

    personalText:
      '“En tus brazos yo me quiero acurrucar”',

    personalAttribution:
      'Ed Maverick — Acurrucar',

    moreInfo: {
      personal:
        'Las Pléyades siempre me han dado la impresión de estar muy juntas, casi como si se resguardaran unas entre otras. Por eso terminan recordándome a tus abrazos. No sé explicarlo de una manera demasiado complicada: simplemente me gusta estar cerca de ti, y hay algo especialmente tranquilo y bonito en poder abrazarte.',

      observation:
        'Las Pléyades son uno de los objetos más fáciles de reconocer en Tauro. Se ven a simple vista como un pequeño grupo compacto de estrellas; con binoculares aparecen muchas más de las que pueden distinguirse solamente con los ojos.'
    }
  },

  // ==================================================
  // CRAB NEBULA
  // ==================================================

  crab: {
    id:
      'crab',

    name:
      'Nebulosa del Cangrejo',

    subtitle:
      'Messier 1',

    type:
      'nebula',

    position: [
      -2.8,
      -1.25,
      -0.2
    ],

    astronomicalText:
      'La Nebulosa del Cangrejo es el remanente de una estrella que explotó como supernova y cuya luz fue observada desde la Tierra en el año 1054.',

    personalText:
      '“You know you hypnotise me, always”',

    personalAttribution:
      'Sleep Token — Hypnosis',

    moreInfo: {
      personal:
        'Elegí la Nebulosa del Cangrejo por la intensidad. Lo que vemos hoy existe porque ocurrió algo extraordinariamente energético y dejó una huella que todavía podemos observar siglos después. Me recuerda a la forma en que algunas veces estar cerca de ti consigue producir algo parecido en mí: una sensación intensa que no desaparece simplemente cuando el momento termina.',

      observation:
        'La Nebulosa del Cangrejo está cerca de la estrella Tianguan, en uno de los cuernos de Tauro. A diferencia de Aldebarán o las Pléyades, no suele ser visible a simple vista; para observarla hace falta un cielo oscuro y, normalmente, un telescopio.'
    }
  }
}