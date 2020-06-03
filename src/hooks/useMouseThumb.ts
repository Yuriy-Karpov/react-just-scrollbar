import * as React from 'react';
import {useCallback} from 'react';

type StartDownType = {
    screenY: number;
    scrollTop: number;
}

export const useMouseThumb = (rectArea: HTMLDivElement, wrapHeight: number, contentHeight: number) => {
    const startDown = React.useRef<StartDownType>({screenY: 0, scrollTop: 0});
    const flagMouseDown = React.useRef(false);

    const handlerMouseMove = useCallback((event: MouseEvent) => {
        if (flagMouseDown.current && rectArea !== null && wrapHeight > 0) {
            const relation:number = contentHeight / wrapHeight;
            const coordY:number =
                Math.round(startDown.current.scrollTop +
                (event.screenY - startDown.current.screenY) * relation);
            rectArea.scrollTo(0, coordY);
        }
    }, [rectArea, contentHeight, wrapHeight]);


    const handlerMouseUp = useCallback((event: MouseEvent) => {
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

    const handlerMouseDown =  useCallback(event => {
        if (event.type === 'mousedown') {
            flagMouseDown.current = true;
            startDown.current.screenY = event.screenY;
            startDown.current.scrollTop = rectArea.scrollTop;
        }
    }, [rectArea]);

    return {handlerMouseDown}
};
