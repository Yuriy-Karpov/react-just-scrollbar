"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.JustScrollBar = ({ refBar, handlerClickBar, thumbYElement, handlerMouseDown, }) => {
    return (React.createElement("div", { ref: refBar, className: "justScroll-bar", onClick: handlerClickBar },
        React.createElement("div", { className: "justScroll-bar--track" },
            React.createElement("div", { ref: thumbYElement, className: "justScroll-bar--thumb", onMouseDown: handlerMouseDown }))));
};
//# sourceMappingURL=JustScrollBar.js.map