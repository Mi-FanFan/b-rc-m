/**
 * Created by Freeman on 2017/1/6.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types';
class Swipeable extends Component {
  constructor(props) {
    super(props)
    this.initialState = this.initialState.bind(this)
    this.calculatePos = this.calculatePos.bind(this)
    this.eventEnd = this.eventEnd.bind(this)
    this.eventMove = this.eventMove.bind(this)
    this.eventStart = this.eventStart.bind(this)
    this.state = this.initialState()
  }

  initialState() {
    return {
      x: null,
      y: null,
      swiping: false,
      start: 0
    }
  }

  calculatePos(e) {
    let x, y
    // If not a touch, determine point from mouse coordinates
    if (e.changedTouches) {
      x = e.changedTouches[0].clientX
      y = e.changedTouches[0].clientY
    } else {
      x = e.clientX
      y = e.clientY
    }

    const xd = this.state.x - x
    const yd = this.state.y - y

    const axd = Math.abs(xd)
    const ayd = Math.abs(yd)

    const time = Date.now() - this.state.start
    const velocity = Math.sqrt(axd * axd + ayd * ayd) / time

    return {
      deltaX: xd,
      deltaY: yd,
      absX: axd,
      absY: ayd,
      velocity: velocity
    }
  }


  eventStart(e) {
    if (e.touches && e.touches.length > 1) {
      return
    }
    // If not a touch, determine point from mouse coordinates
    let touches = e.touches
    if (!touches) {
      touches = [{clientX: e.clientX, clientY: e.clientY}]
    }
    if (this.props.stopPropagation) e.stopPropagation()

    this.setState({
      start: Date.now(),
      x: touches[0].clientX,
      y: touches[0].clientY,
      swiping: false
    })
  }


  eventMove(e) {
    if (!this.state.x || !this.state.y || e.touches && e.touches.length > 1) {
      return
    }

    let cancelPageSwipe = false
    const pos = this.calculatePos(e)

    if (pos.absX < this.props.delta && pos.absY < this.props.delta) {
      return
    }

    if (this.props.stopPropagation) e.stopPropagation()

    if (this.props.onSwiping) {
      this.props.onSwiping(e, pos.deltaX, pos.deltaY, pos.absX, pos.absY, pos.velocity)
    }

    if (pos.absX > pos.absY) {
      if (pos.deltaX > 0) {
        if (this.props.onSwipingLeft || this.props.onSwipedLeft) {
          this.props.onSwipingLeft && this.props.onSwipingLeft(e, pos.absX)
          cancelPageSwipe = true
        }
      } else {
        if (this.props.onSwipingRight || this.props.onSwipedRight) {
          this.props.onSwipingRight && this.props.onSwipingRight(e, pos.absX)
          cancelPageSwipe = true
        }
      }
    } else {
      if (pos.deltaY > 0) {
        if (this.props.onSwipingUp || this.props.onSwipedUp) {
          this.props.onSwipingUp && this.props.onSwipingUp(e, pos.absY)
          cancelPageSwipe = true
        }
      } else {
        if (this.props.onSwipingDown || this.props.onSwipedDown) {
          this.props.onSwipingDown && this.props.onSwipingDown(e, pos.absY)
          cancelPageSwipe = true
        }
      }
    }

    this.setState({swiping: true})

    if (cancelPageSwipe && this.props.preventDefaultTouchmoveEvent) {
      e.preventDefault()
    }
  }


  eventEnd(e) {
    if (this.state.swiping) {
      const pos = this.calculatePos(e)

      if (this.props.stopPropagation) e.stopPropagation()

      const isFlick = pos.velocity > this.props.flickThreshold

      this.props.onSwiped && this.props.onSwiped(
        e,
        pos.deltaX,
        pos.deltaY,
        isFlick,
        pos.velocity
      )

      if (pos.absX > pos.absY) {
        if (pos.deltaX > 0) {
          this.props.onSwipedLeft && this.props.onSwipedLeft(e, pos.deltaX, isFlick)
        } else {
          this.props.onSwipedRight && this.props.onSwipedRight(e, pos.deltaX, isFlick)
        }
      } else {
        if (pos.deltaY > 0) {
          this.props.onSwipedUp && this.props.onSwipedUp(e, pos.deltaY, isFlick)
        } else {
          this.props.onSwipedDown && this.props.onSwipedDown(e, pos.deltaY, isFlick)
        }
      }
    }

    this.setState(this.initialState())
  }

  render() {

    const newProps = {
      ...this.props,
      onTouchStart: this.eventStart,
      onTouchMove: this.eventMove,
      onTouchEnd: this.eventEnd,
      onMouseDown: this.props.trackMouse && this.eventStart,
      onMouseMove: this.props.trackMouse && this.eventMove,
      onMouseUp: this.props.trackMouse && this.eventEnd
    }

    delete newProps.onSwiped
    delete newProps.onSwiping
    delete newProps.onSwipingUp
    delete newProps.onSwipingRight
    delete newProps.onSwipingDown
    delete newProps.onSwipingLeft
    delete newProps.onSwipedUp
    delete newProps.onSwipedRight
    delete newProps.onSwipedDown
    delete newProps.onSwipedLeft
    delete newProps.flickThreshold
    delete newProps.delta
    delete newProps.preventDefaultTouchmoveEvent
    delete newProps.stopPropagation
    delete newProps.nodeName
    delete newProps.children
    delete newProps.trackMouse


    return React.createElement(
      this.props.nodeName,
      newProps,
      this.props.children
    );
  }
}
Swipeable.propTypes = {
  onSwiped: PropTypes.func,
  onSwiping: PropTypes.func,
  onSwipingUp: PropTypes.func,
  onSwipingRight: PropTypes.func,
  onSwipingDown: PropTypes.func,
  onSwipingLeft: PropTypes.func,
  onSwipedUp: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipedDown: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  flickThreshold: PropTypes.number,
  delta: PropTypes.number,
  preventDefaultTouchmoveEvent: PropTypes.bool,
  stopPropagation: PropTypes.bool,
  nodeName: PropTypes.string,
  trackMouse: PropTypes.bool
}

Swipeable.defaultProps = {
  flickThreshold: 0.6,
  delta: 10,
  preventDefaultTouchmoveEvent: true,
  stopPropagation: false,
  nodeName: 'div'
}

export default Swipeable
