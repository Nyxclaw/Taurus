import type {
  DestinationData,
  DestinationId
} from '../types'

export const destinations:
  Record<
    DestinationId,
    DestinationData
  > = {
  aldebaran: {
    id: 'aldebaran',

    name: 'Aldebaran',

    subtitle:
      'Alpha Tauri',

    type: 'star',

    position: [
      1.65,
      -0.15,
      0
    ],

    astronomicalText:
      'The brightest apparent star in Taurus. Aldebaran is an orange giant that visually marks one of the eyes of the constellation.',

    personalText:
      'Personal message about her eyes and the way her gaze feels will eventually appear here.'
  },

  hyades: {
    id: 'hyades',

    name: 'Hyades',

    subtitle:
      'Open star cluster',

    type: 'cluster',

    position: [
      1.05,
      -0.05,
      -0.15
    ],

    astronomicalText:
      'The Hyades form the prominent V-shaped group in the face of Taurus. Aldebaran appears in the same direction from Earth, although it is not actually a member of the cluster.',

    personalText:
      'Personal message about her intelligence, dedication and effort will eventually appear here.'
  },

  pleiades: {
    id: 'pleiades',

    name: 'Pleiades',

    subtitle:
      'Messier 45',

    type: 'cluster',

    position: [
      3.05,
      1.75,
      -0.3
    ],

    astronomicalText:
      'The Pleiades are a young open star cluster in Taurus, easily visible to the naked eye as a compact group of bright stars.',

    personalText:
      'Personal message about the warmth of her hugs will eventually appear here.'
  },

  crab: {
    id: 'crab',

    name:
      'Crab Nebula',

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
      'The Crab Nebula is a supernova remnant in Taurus. It is the expanding debris of a stellar explosion observed from Earth in the year 1054.',

    personalText:
      'Personal message about the intensity of being close to her will eventually appear here.'
  }
}