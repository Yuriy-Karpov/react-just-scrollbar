"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO Do I need this function?
const react_1 = require("react");
function useScrollRect() {
    const [rect, setRect] = react_1.useState(null);
    const ref = react_1.useCallback(node => {
        if (node !== null) {
            setRect(node);
        }
    }, []);
    return [rect, ref];
}
exports.useScrollRect = useScrollRect;
//# sourceMappingURL=useScrollRect.js.map