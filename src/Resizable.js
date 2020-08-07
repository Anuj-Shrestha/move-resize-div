import React, { useEffect, useState } from "react"

const Resizable = () => {
  const [resizableElement, setResizableElement] = useState(null)
  const [handleLeftElem, setHandleLeftElem] = useState(null)
  const [handleRightElem, setHandleRightElem] = useState(null)
  useEffect(() => {
    setResizableElement(document.getElementById("mydiv"))
    setHandleLeftElem(document.getElementById("handleLeft"))
    setHandleRightElem(document.getElementById("handleRight"))
  }, []);

  useEffect(() => {
    if (!!resizableElement) {
      resizableElement.style.setProperty('--max-width', `${maxPaneSize}px`);
      resizableElement.style.setProperty('--min-width', `${minPaneSize}px`);
    }
  }, [resizableElement]);

  const dragElement = (elmnt) => {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }
    // elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
      console.log('e', e)

      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

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
    resizableElement.style
      .setProperty('--resizeable-width', `${width}px`);
  };

  const getPaneWidth = () => {
    const pxWidth = getComputedStyle(resizableElement)
      .getPropertyValue('--resizeable-width');
    return parseInt(pxWidth, 10);
  };

  const startDragging = (event, direction) => {
    event.preventDefault();
    const startingPaneWidth = getPaneWidth();
    const xOffset = event.pageX;
    console.log('xoffset = event.pageX', event.pageX)
    console.log('startingPaneWidth', startingPaneWidth)

    const mouseDragHandler = (moveEvent) => {
      moveEvent.preventDefault();
      console.log('moveEvent.pageX', moveEvent.pageX)

      // const primaryButtonPressed = moveEvent.buttons === 1;
      // console.log('primaryButtonPressed', primaryButtonPressed)
      // if (!primaryButtonPressed) {
      //   console.log('not primary')
      //   setPaneWidth(Math.min(Math.max(getPaneWidth(), minPaneSize), maxPaneSize));
      //   document.body.removeEventListener('pointermove', mouseDragHandler);
      //   return;
      // }
      const paneOriginAdjustment = direction === 'left' ? 1 : -1;
      const width = (xOffset - moveEvent.pageX) * paneOriginAdjustment + startingPaneWidth
      // console.log('pane', paneOriginAdjustment, xOffset, moveEvent.pageX, startingPaneWidth, width)

      // console.log('pane',ele.offsetLeft, startingPaneWidth - ((xOffset - moveEvent.pageX) * paneOriginAdjustment + startingPaneWidth))
      if (width >= minPaneSize && width <= maxPaneSize)
        setPaneWidth((xOffset - moveEvent.pageX) * paneOriginAdjustment + startingPaneWidth);
      direction === 'left' && dragElement(resizableElement)
      if (direction === 'left') {
        // ele.style.left = (ele.offsetLeft + (startingPaneWidth - width)) + "px";
        if (width >= minPaneSize && width <= maxPaneSize) {
          resizableElement.style.left = (xOffset + (startingPaneWidth - getPaneWidth())) + "px"
        }
      }
    };
    window.addEventListener('mousemove', mouseDragHandler);

    const stopDragHandler = () => {
      setPaneWidth(Math.min(Math.max(getPaneWidth(), minPaneSize), maxPaneSize));
      window.removeEventListener('mousemove', mouseDragHandler);
    }
    window.addEventListener('mouseup', stopDragHandler);

  };



  handleLeftElem && handleLeftElem.addEventListener('mousedown', (e) => startDragging(e, 'left'));
  handleRightElem && handleRightElem.addEventListener('mousedown', (e) => startDragging(e, 'right'));

  // console.log('doc', document)
  resizableElement && dragElement(resizableElement)

  return (
    <div id="mydiv" className="box">
      <div id="handleRight" className="handle handle-right"></div>
      <div id="handleLeft" className="handle handle-left"></div>
      <div id="mydivheader">Click here to move</div>

        Box

    </div>
  )
}

export default Resizable;