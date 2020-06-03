import {useRef, useLayoutEffect, useCallback} from 'react';
import {EffectType, ElementType, OptionalType} from '../utils/types';

/**
 * To support server-side rendering (SSR) and prevent
 * unnecessary errors we need to check whether the DOM is ready and exists
 * whether the window context is present. The easiest way to do this is to check,
 * whether the window is defined.
 */
const isBrowser = typeof window !== `undefined`;

function getScrollPosition(element: ElementType) {
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

export function useScrollPosition(effect: EffectType, deps: any, {element = null, wait = 0}: OptionalType) {
    const position = useRef(getScrollPosition(element));
    const throttleTimeout = useRef(null);

    const callBack = useCallback(() => {
        const currPos = getScrollPosition(element);
        effect({ prevPos: position.current, currPos });
        position.current = currPos;

        throttleTimeout.current = null;
    }, [effect, element]);

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout.current === null) {
                    throttleTimeout.current = setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };
        if (!element) {
            return () => {};
        }

        element.addEventListener("scroll", handleScroll);

        return () => element.removeEventListener("scroll", handleScroll);
    }, [deps]);
}

