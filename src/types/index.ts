export type DestinationId =
  | 'aldebaran'
  | 'hyades'
  | 'pleiades'
  | 'crab'

export type DestinationType =
  | 'star'
  | 'cluster'
  | 'nebula'

export type Vector3Tuple =
  [number, number, number]

export type MoreInfoData = {
  personal: string
  observation: string
}

export type DestinationData = {
  id: DestinationId
  name: string
  subtitle: string
  type: DestinationType

  position: Vector3Tuple

  astronomicalText: string

  personalText: string
  personalAttribution: string

  moreInfo: MoreInfoData
}

export type TaurusStarData = {
  name: string

  position: Vector3Tuple

  color: number
  size: number
}