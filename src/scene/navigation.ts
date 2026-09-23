import * as THREE from 'three'

import {
  destinations
} from '../data/destinations'

import type {
  DestinationId
} from '../types'

import type {
  AppInterface
} from '../ui/createInterface'

type NavigationOptions = {
  camera:
    THREE.PerspectiveCamera

  overviewCameraPosition:
    THREE.Vector3

  detailCameraPosition:
    THREE.Vector3

  overviewGroup:
    THREE.Group

  hitTargets:
    THREE.Mesh[]

  detailGroup:
    THREE.Group

  showDetailVisual:
    (
      id: DestinationId
    ) => void

  ui:
    AppInterface
}

type ViewState =
  | 'overview'
  | 'entering'
  | 'detail'
  | 'leaving'

export function createNavigation(
  options:
    NavigationOptions
) {
  const {
    camera,

    overviewCameraPosition,
    detailCameraPosition,

    overviewGroup,
    hitTargets,
    detailGroup,

    showDetailVisual,

    ui
  } = options

  // ==================================================
  // DESTINATION PROGRESS
  // ==================================================

  const visitedDestinations =
    new Set<
      DestinationId
    >()

  const totalDestinations =
    Object.keys(
      destinations
    ).length

  let finalMessageShown =
    false

  // ==================================================
  // RAYCASTING
  // ==================================================

  const raycaster =
    new THREE.Raycaster()

  const pointer =
    new THREE.Vector2()

  // ==================================================
  // STATE
  // ==================================================

  let viewState:
    ViewState =
    'overview'

  let currentDestination:
    DestinationId | null =
    null

  let transitionProgress =
    0

  const transitionDuration =
    1.65

  const cameraStart =
    new THREE.Vector3()

  const cameraEnd =
    new THREE.Vector3()

  const overviewScaleStart =
    new THREE.Vector3()

  const overviewScaleEnd =
    new THREE.Vector3()

  // ==================================================
  // EASING
  // ==================================================

  function easeInOutCubic(
    value: number
  ) {
    return value < 0.5
      ? 4 *
        value *
        value *
        value

      : 1 -
        Math.pow(
          -2 * value + 2,
          3
        ) / 2
  }

  // ==================================================
  // POINTER
  // ==================================================

  function updatePointer(
    event:
      PointerEvent
  ) {
    pointer.x =
      (
        event.clientX /
        window.innerWidth
      ) * 2 - 1

    pointer.y =
      -(
        event.clientY /
        window.innerHeight
      ) * 2 + 1
  }

  function getDestinationAtPointer():
    DestinationId | null {
    raycaster.setFromCamera(
      pointer,
      camera
    )

    const hits =
      raycaster.intersectObjects(
        hitTargets,
        false
      )

    if (
      hits.length === 0
    ) {
      return null
    }

    return hits[0]
      .object
      .userData
      .destinationId
  }

  // ==================================================
  // PROGRESS
  // ==================================================

  function updateProgress() {
    ui.setProgress(
      visitedDestinations.size,
      totalDestinations
    )
  }

  function isJourneyComplete() {
    return (
      visitedDestinations.size >=
      totalDestinations
    )
  }

  // ==================================================
  // ENTER DESTINATION
  // ==================================================

  function enterDestination(
    id: DestinationId
  ) {
    if (
      viewState !==
      'overview'
    ) {
      return
    }

    currentDestination =
      id

    visitedDestinations.add(
      id
    )

    updateProgress()

    const destination =
      destinations[id]

    ui.showDetail(
      destination
    )

    showDetailVisual(
      id
    )

    detailGroup.visible =
      true

    viewState =
      'entering'

    transitionProgress =
      0

    cameraStart.copy(
      camera.position
    )

    cameraEnd.copy(
      detailCameraPosition
    )

    overviewScaleStart.copy(
      overviewGroup.scale
    )

    overviewScaleEnd.set(
      0.02,
      0.02,
      0.02
    )

    ui.hideOverview()

    document.body.style.cursor =
      'default'
  }

  // ==================================================
  // LEAVE DESTINATION
  // ==================================================

  function leaveDestination() {
    if (
      viewState !==
      'detail'
    ) {
      return
    }

    ui.closeMoreInfo()

    viewState =
      'leaving'

    transitionProgress =
      0

    ui.closeDetailPanel()

    cameraStart.copy(
      camera.position
    )

    cameraEnd.copy(
      overviewCameraPosition
    )

    overviewScaleStart.copy(
      overviewGroup.scale
    )

    overviewScaleEnd.set(
      1,
      1,
      1
    )
  }

  // ==================================================
  // POINTER MOVEMENT
  // ==================================================

  window.addEventListener(
    'pointermove',
    event => {
      if (
        viewState !==
        'overview'
      ) {
        return
      }

      updatePointer(
        event
      )

      const destination =
        getDestinationAtPointer()

      document.body.style.cursor =
        destination
          ? 'pointer'
          : 'default'
    }
  )

  // ==================================================
  // POINTER / TOUCH SELECTION
  // ==================================================

  window.addEventListener(
    'pointerdown',
    event => {
      if (
        viewState !==
        'overview'
      ) {
        return
      }

      updatePointer(
        event
      )

      const destination =
        getDestinationAtPointer()

      if (destination) {
        enterDestination(
          destination
        )
      }
    }
  )

  // ==================================================
  // UI BUTTONS
  // ==================================================

  ui.backButton.addEventListener(
    'click',
    leaveDestination
  )

  ui.moreButton.addEventListener(
    'click',
    () => {
      if (
        !currentDestination
      ) {
        return
      }

      ui.openMoreInfo()
    }
  )

  ui.moreBackButton.addEventListener(
    'click',
    () => {
      ui.closeMoreInfo()
    }
  )

  ui.finalBackButton.addEventListener(
    'click',
    () => {
      ui.closeFinalPanel()

      ui.showLetterButton()
    }
  )

  ui.letterButton.addEventListener(
    'click',
    () => {
      ui.openFinalPanel()
    }
  )

  // ==================================================
  // ANIMATION UPDATE
  // ==================================================

  function update(
    delta: number
  ) {

    // ----------------------------------------------
    // ENTER
    // ----------------------------------------------

    if (
      viewState ===
      'entering'
    ) {
      transitionProgress +=
        delta /
        transitionDuration

      const normalized =
        Math.min(
          transitionProgress,
          1
        )

      const eased =
        easeInOutCubic(
          normalized
        )

      camera.position.lerpVectors(
        cameraStart,
        cameraEnd,
        eased
      )

      overviewGroup.scale
        .lerpVectors(
          overviewScaleStart,
          overviewScaleEnd,
          eased
        )

      if (
        normalized >= 1
      ) {
        overviewGroup.visible =
          false

        viewState =
          'detail'

        ui.openDetailPanel()
      }
    }

    // ----------------------------------------------
    // LEAVE
    // ----------------------------------------------

    if (
      viewState ===
      'leaving'
    ) {
      transitionProgress +=
        delta /
        transitionDuration

      const normalized =
        Math.min(
          transitionProgress,
          1
        )

      const eased =
        easeInOutCubic(
          normalized
        )

      camera.position.lerpVectors(
        cameraStart,
        cameraEnd,
        eased
      )

      overviewGroup.visible =
        true

      overviewGroup.scale
        .lerpVectors(
          overviewScaleStart,
          overviewScaleEnd,
          eased
        )

      if (
        normalized >= 1
      ) {
        viewState =
          'overview'

        detailGroup.visible =
          false

        ui.showOverview()

        currentDestination =
          null

        // ------------------------------------------
        // FINAL MESSAGE
        // ------------------------------------------

        if (
          isJourneyComplete() &&
          !finalMessageShown
        ) {
          finalMessageShown =
            true

          window.setTimeout(
            () => {
              ui.openFinalPanel()
            },
            850
          )
        }
      }
    }
  }

  return {
    update,
    enterDestination,
    leaveDestination
  }
}