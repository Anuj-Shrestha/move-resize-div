import React, { useEffect, useState, useRef } from "react"

const Resizable = ({children}) => {
  const resizableElement = useRef(null)
  const moveElement = useRef(null)
  
  // const [resizableElement, setResizableElement] = useState(null)
  useEffect(() => {
    // setResizableElement(document.getElementById("mydiv"))
  }, []);

  useEffect(() => {
    if (!!resizableElement) {
      resizableElement.current.style.setProperty('--max-width', `${maxPaneSize}px`);
      resizableElement.current.style.setProperty('--min-width', `${minPaneSize}px`);
    }
  }, [resizableElement]);

  const startMoving = (e, elmnt) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const minPaneSize = 150;
  const maxPaneSize = document.body.clientWidth * .5

  const setPaneWidth = (width) => {
    resizableElement.current.style
      .setProperty('--resizeable-width', `${width}px`);
  };

  const getPaneWidth = () => {
    const pxWidth = getComputedStyle(resizableElement.current)
      .getPropertyValue('--resizeable-width');
    return parseInt(pxWidth, 10);
  };

  const startDragging = (event, direction) => {
    event.preventDefault();
    const startingPaneWidth = getPaneWidth();
    const xOffset = event.pageX;

    const mouseDragHandler = (moveEvent) => {
      moveEvent.preventDefault();
      const paneOriginAdjustment = direction === 'left' ? 1 : -1;
      const width = (xOffset - moveEvent.pageX) * paneOriginAdjustment + startingPaneWidth

      if (width >= minPaneSize && width <= maxPaneSize)
        setPaneWidth((xOffset - moveEvent.pageX) * paneOriginAdjustment + startingPaneWidth);
      // direction === 'left' && dragElement(resizableElement)
      if (direction === 'left') {
        if (width >= minPaneSize && width <= maxPaneSize) {
          resizableElement.current.style.left = (xOffset + (startingPaneWidth - getPaneWidth())) + "px"
        }
      }
    };

    // window.addEventListener('mousemove', mouseDragHandler);
    document.addEventListener('mousemove', mouseDragHandler);

    const stopDragHandler = () => {
      setPaneWidth(Math.min(Math.max(getPaneWidth(), minPaneSize), maxPaneSize));
      document.removeEventListener('mousemove', mouseDragHandler);
    }
    document.onmouseup = stopDragHandler;

  };

  // resizableElement && startMoving(resizableElement)

  return (
    <div id="mydiv" className="box" ref={resizableElement}>
      <div id="handleRight" className="handle handle-right" onMouseDown={e => startDragging(e, 'right')}></div>
      <div id="handleLeft" className="handle handle-left" onMouseDown={e => startDragging(e, 'left')}></div>
      <div id="mydivheader" ref={moveElement} onMouseDown={e => startMoving(e, resizableElement.current)}>{
        children
      }</div>
    </div>
  )
}

export default Resizable;