"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
/**
 * To support server-side rendering (SSR) and prevent
 * unnecessary errors we need to check whether the DOM is ready and exists
 * whether the window context is present. The easiest way to do this is to check,
 * whether the window is defined.
 */
const isBrowser = typeof window !== `undefined`;
function getScrollPosition(element) {
    if (!isBrowser) {
        return {
            x: 0,
            y: 0
        };
    }
    if (element === null) {
        return {
            x: 0,
            y: 0
        };
    }
    const target = element ? element : document.body;
    return { x: target.scrollLeft, y: target.scrollTop };
}
function useScrollPosition(effect, deps, { element = null, wait = 0 }) {
    const position = react_1.useRef(getScrollPosition(element));
    const throttleTimeout = react_1.useRef(null);
    const callBack = react_1.useCallback(() => {
        const currPos = getScrollPosition(element);
        effect({ prevPos: position.current, currPos });
        position.current = currPos;
        throttleTimeout.current = null;
    }, [effect, element]);
    react_1.useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout.current === null) {
                    throttleTimeout.current = setTimeout(callBack, wait);
                }
            }
            else {
                callBack();
            }
        };
        if (!element) {
            return () => { };
        }
        element.addEventListener("scroll", handleScroll);
        return () => element.removeEventListener("scroll", handleScroll);
    }, [deps]);
}
exports.useScrollPosition = useScrollPosition;
//# sourceMappingURL=useScrollPosition.js.map