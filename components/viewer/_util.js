/**
 * Created by Freeman on 2016/12/29.
 */
export const formatPage = val => {
  return val.toString().length < 2 ? '0' + val : val;
}

/**
 * @name   求两点之间中间点的坐标
 * @params  {a}  点A的坐标
 * @params  {b}  点B的坐标
 * @return  {x: number, y: number} 两点之间的距离
 */
const distance = (a, b) => {
  if (!a || !b) return;
  var x = (a.x + b.x) / 2,
    y = (a.y + b.y) / 2;
  return {x: x, y: y};
}

export const getOrigin = (e, val) => {
  const touchX = val === undefined ? e.touch.x : distance(e.touch.touches[0], e.touch.touches[1]).x,
    touchY = val === undefined ? e.touch.y : distance(e.touch.touches[0], e.touch.touches[1]).y
  return {
    x: touchX + 'px',
    y: touchY + 'px',
  }
}
export const calculatePos = (e,startX,startY,startTime) => {
  let x, y
  // If not a touch, determine point from mouse coordinates
  if (e.changedTouches) {
    x = e.changedTouches[0].clientX
    y = e.changedTouches[0].clientY
  } else {
    x = e.clientX
    y = e.clientY
  }

  const xd = startX - x
  const yd = startY - y

  const axd = Math.abs(xd)
  const ayd = Math.abs(yd)

  const time = Date.now() - startTime
  const velocity = Math.sqrt(axd * axd + ayd * ayd) / time

  return {
    deltaX: xd,
    deltaY: yd,
    absX: axd,
    absY: ayd,
    velocity: velocity
  }
}
