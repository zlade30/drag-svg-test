import './App.css';
import Draggable from 'react-draggable';
import { useRef, useState } from 'react';

const App = () => {
  const boxRef = useRef()
  const shapeRef = useRef()
  const [currentPosition, setCurrentPosition] = useState({
    x: 0,
    y: 0
  })

  const isCollideRight = () => boxRef.current.offsetWidth - shapeRef.current.clientWidth
  const isCollideBottom = () => boxRef.current.offsetHeight - shapeRef.current.clientHeight
  const isCollideTop = () => -5
  const isCollideLeft = () => -5

  const onDrag = (e, ui) => {
    if (ui.x >= isCollideRight()) {
      setCurrentPosition({
        x: ui.x >= isCollideRight() ? isCollideRight() : ui.x,
        y: ui.y
      })
      if (
        ui.x >= isCollideRight() &&
        ui.y >= isCollideBottom()
      ) {
        setCurrentPosition({
          x: ui.x >= isCollideRight() ? isCollideRight() : ui.x,
          y: isCollideBottom()
        })
      } else if (
        ui.x >= isCollideRight() &&
        ui.y <= isCollideTop()
      ) {
        setCurrentPosition({
          x: ui.x >= isCollideRight() ? isCollideRight() : ui.x,
          y: isCollideTop()
        })
      } 
    } else if (ui.y >= isCollideBottom()) {
      setCurrentPosition({
        x: ui.x,
        y: ui.y >= isCollideBottom() ? isCollideBottom() : ui.y
      })
      if (
        ui.x <= isCollideLeft() &&
        ui.y >= isCollideBottom()
      ) {
        setCurrentPosition({
          x: ui.x <= isCollideLeft() ? isCollideLeft() : ui.x,
          y: isCollideBottom()
        })
      }
    } else if (ui.y <= isCollideTop()) {
      setCurrentPosition({
        x: ui.x,
        y: ui.y <= isCollideTop() ? isCollideTop() : ui.y
      })
      if (
        ui.x <= isCollideLeft() &&
        ui.y <= isCollideTop()
      ) {
        setCurrentPosition({
          x: ui.x <= isCollideLeft() ? isCollideLeft() : ui.x,
          y: isCollideTop()
        })
      }
    } else if (ui.x <= isCollideLeft()) {
      setCurrentPosition({
        x: ui.x <= isCollideLeft() ? isCollideLeft() : ui.x,
        y: ui.y
      })
    } else {
      setCurrentPosition({
        x: ui.x,
        y: ui.y
      })
    }
  }

  return (
    <div className="container">
      <div ref={boxRef} className="box">
        <Draggable
          onDrag={onDrag}
          axis="none"
          position={{
            x: currentPosition.x,
            y: currentPosition.y
          }}
        >
          <div>
            <svg ref={shapeRef} height="100" width="100">
              <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
            </svg>
          </div>
        </Draggable>
      </div>
      <label>{`x: ${currentPosition.x}`}</label>
      <label>{`y: ${currentPosition.y}`}</label>
    </div>
  )
}

export default App;
