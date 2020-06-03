"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
exports.useMouseThumb = (rectArea, wrapHeight, contentHeight) => {
    const startDown = React.useRef({ screenY: 0, scrollTop: 0 });
    const flagMouseDown = React.useRef(false);
    const handlerMouseMove = react_1.useCallback((event) => {
        if (flagMouseDown.current && rectArea !== null && wrapHeight > 0) {
            const relation = contentHeight / wrapHeight;
            const coordY = Math.round(startDown.current.scrollTop +
                (event.screenY - startDown.current.screenY) * relation);
            rectArea.scrollTo(0, coordY);
        }
    }, [rectArea, contentHeight, wrapHeight]);
    const handlerMouseUp = react_1.useCallback((event) => {
        if (flagMouseDown) {
            flagMouseDown.current = false;
        }
        event.preventDefault();
    }, []);
    React.useEffect(() => {
        window.addEventListener('mousemove', handlerMouseMove);
        window.addEventListener('mouseup', handlerMouseUp);
        return () => {
            window.removeEventListener('mousemove', handlerMouseMove);
            window.removeEventListener('mouseup', handlerMouseUp);
        };
    }, [rectArea, handlerMouseUp, handlerMouseMove]);
    const handlerMouseDown = react_1.useCallback(event => {
        if (event.type === 'mousedown') {
            flagMouseDown.current = true;
            startDown.current.screenY = event.screenY;
            startDown.current.scrollTop = rectArea.scrollTop;
        }
    }, [rectArea]);
    return { handlerMouseDown };
};
//# sourceMappingURL=useMouseThumb.js.map