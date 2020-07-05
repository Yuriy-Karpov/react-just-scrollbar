"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const useScrollPosition_1 = require("../hooks/useScrollPosition");
const useScrollRect_1 = require("../hooks/useScrollRect");
const useMouseThumb_1 = require("../hooks/useMouseThumb");
const JustScrollBar_1 = require("./JustScrollBar");
const DEFAULT_OFFSET = 40;
exports.JustScroll = ({ children, margin = 0, updateDeps = [], }) => {
    const thumbYElement = React.useRef(null);
    const refWrap = React.useRef(null);
    const refContent = React.useRef(null);
    const refBar = React.useRef(null);
    const [rectArea, refArea] = useScrollRect_1.useScrollRect();
    /**
     * handlerScroll for scroll effect
     */
    const handlerScroll = React.useCallback(({ prevPos, currPos }) => {
        if (thumbYElement.current !== null) {
            const thumbOffsetY = Math.round((currPos.y * refWrap.current.clientHeight) /
                refContent.current.clientHeight);
            // synchronization animations and rendering
            window.requestAnimationFrame(() => {
                thumbYElement.current.style.transform = `translateY(${thumbOffsetY}px)`;
            });
        }
    }, [refContent, thumbYElement, updateDeps]);
    /**
     * subscribe to the change of the scroll
     */
    useScrollPosition_1.useScrollPosition(handlerScroll, rectArea, {
        element: rectArea
    });
    const wrapHeight = refWrap.current ? refWrap.current.clientHeight : 0;
    const clientHeight = refContent.current ? refContent.current.clientHeight : 0;
    /**
     * handler mouse thumb
     */
    const { handlerMouseDown } = useMouseThumb_1.useMouseThumb(rectArea, wrapHeight, clientHeight);
    const handlerClickBar = React.useCallback((event) => {
        // тут реализация клика по бару
    }, []);
    React.useEffect(() => {
        // тут считаем отступ стандартного скролла
        if (rectArea !== null) {
            // when rendering, we fix the jump, unlock the scroll
            rectArea.style.overflow = 'scroll';
            const wrapHeight = refWrap.current.clientHeight;
            const contentHeight = refContent.current.clientHeight;
            const widthScrollbar = rectArea.offsetWidth - rectArea.clientWidth;
            const padding = DEFAULT_OFFSET + widthScrollbar;
            // we calculate the height of the custom scroll
            const relation = Math.round(wrapHeight / (contentHeight / wrapHeight)) + margin * 2;
            thumbYElement.current.style.height = `${relation}px`;
            rectArea.style.marginRight = `-${padding}px`;
            rectArea.style.marginBottom = `-${padding}px`;
        }
    }, [refWrap, refContent, margin, rectArea, updateDeps]);
    React.useEffect(() => {
        if (refWrap.current !== null && refContent.current !== null) {
            if (refWrap.current.clientHeight > refContent.current.clientHeight) {
                refBar.current.style.display = 'none';
            }
            else {
                refBar.current.style.display = 'block';
            }
        }
    }, [children, updateDeps]);
    return (React.createElement("div", { ref: refWrap, className: "justScroll" },
        React.createElement("div", { ref: refArea, className: "justScroll-area" },
            React.createElement(JustScrollBar_1.JustScrollBar, { refBar: refBar, handlerClickBar: handlerClickBar, thumbYElement: thumbYElement, handlerMouseDown: handlerMouseDown }),
            React.createElement("div", { ref: refContent, className: "justScroll-data" }, children))));
};
//# sourceMappingURL=JustScroll.js.map