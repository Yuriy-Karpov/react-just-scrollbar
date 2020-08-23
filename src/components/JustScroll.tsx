import * as React from 'react';

import {useScrollPosition} from '../hooks/useScrollPosition';
import {useScrollRect} from '../hooks/useScrollRect';
import {useMouseThumb} from '../hooks/useMouseThumb';
import {JustScrollBar} from './JustScrollBar';
import {throttle} from '../utils/throttle';

const DEFAULT_OFFSET = 40;

export interface IJustScroll {
    children: React.ReactNode,
    margin?: number,
    updateDeps?: any[];
}

export const JustScroll: React.FC<IJustScroll> = (
    {
        children,
        margin = 0,
        updateDeps = [],
    }) => {

    const thumbYElement = React.useRef<HTMLDivElement | null>(null);
    const refWrap = React.useRef<HTMLDivElement | null>(null);
    const refContent = React.useRef<HTMLDivElement | null>(null);
    const refBar = React.useRef<HTMLDivElement | null>(null);

    const [rectArea, refArea] = useScrollRect();

    /**
     * handlerScroll for scroll effect
     */
    const handlerScroll = React.useCallback(({_prevPos, currPos},) => {
        if (thumbYElement.current !== null) {
            const thumbOffsetY = Math.round(
                (currPos.y * refWrap.current.clientHeight) /
                refContent.current.clientHeight
            );
            // synchronization animations and rendering
            window.requestAnimationFrame(() => {
                thumbYElement.current.style.transform = `translateY(${thumbOffsetY}px)`;
            });
        }
    }, [refContent, thumbYElement, updateDeps]);


    /**
     * subscribe to the change of the scroll
     */
    useScrollPosition(
        handlerScroll,
        rectArea,
        {
            element: rectArea
        }
    );

    const wrapHeight = refWrap.current ? refWrap.current.clientHeight : 0;
    const clientHeight = refContent.current ? refContent.current.clientHeight : 0;

    /**
     * handler mouse thumb
     */
    const {handlerMouseDown} = useMouseThumb(rectArea, wrapHeight, clientHeight);

    const handlerClickBar = React.useCallback((_event: React.MouseEvent<HTMLElement>) => {
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
            const relation =
                Math.round(wrapHeight / ((contentHeight - DEFAULT_OFFSET *2) / wrapHeight)) + margin * 2;
            thumbYElement.current.style.height = `${relation}px`;
            rectArea.style.marginRight = `-${padding}px`;
            rectArea.style.marginBottom = `-${padding}px`;
        }
    }, [refWrap, refContent, margin, rectArea, updateDeps]);


    function handleResizeShowBar() {
        if (refWrap.current !== null && refContent.current !== null) {
            if (refWrap.current.clientHeight > refContent.current.clientHeight) {
                refBar.current.style.display = 'none';
            } else {
                refBar.current.style.display = 'block';
            }
        }
    }

    React.useEffect(() => {
        window.addEventListener('resize', () => throttle(handleResizeShowBar, 300));
        return () => window.removeEventListener('resize', handleResizeShowBar);
    }, []);
    handleResizeShowBar();

    return (
        <div ref={refWrap} className="justScroll">
            <div ref={refArea} className="justScroll-area">
                <JustScrollBar
                    refBar={refBar}
                    handlerClickBar={handlerClickBar}
                    thumbYElement={thumbYElement}
                    handlerMouseDown={handlerMouseDown}
                />
                <div ref={refContent} className="justScroll-data">
                    {children}
                </div>
            </div>
        </div>
    );
};

