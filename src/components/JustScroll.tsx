import * as React from 'react';

import '../styles.css';
import {useScrollPosition} from '../hooks/useScrollPosition';
import {useScrollRect} from '../hooks/useScrollRect';
import {useMouseThumb} from '../hooks/useMouseThumb';

const DEFAULT_OFFSET = 40;

export interface IJustScroll {
    children: React.ReactNode,
    margin: number
}

export const JustScroll: React.FC<IJustScroll> = ({children, margin = 0}) => {
    const thumbYElement = React.useRef<HTMLDivElement | null>(null);
    const refWrap = React.useRef<HTMLDivElement | null>(null);
    const refContent = React.useRef<HTMLDivElement | null>(null);
    const refBar = React.useRef<HTMLDivElement | null>(null);

    const [rectArea, refArea] = useScrollRect();

    /**
     * handlerScroll for scroll effect
     */
    const handlerScroll = React.useCallback(({prevPos, currPos},) => {
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
    }, [refContent, thumbYElement]);


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

    const handlerClickBar = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
        console.log('CLICK')
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
                Math.round(wrapHeight / (contentHeight / wrapHeight)) + margin * 2;

            thumbYElement.current.style.height = `${relation}px`;
            rectArea.style.marginRight = `-${padding}px`;
            rectArea.style.marginBottom = `-${padding}px`;
        }
    }, [refWrap, refContent, margin, rectArea]);

    React.useEffect(() => {
        if (refWrap.current !== null && refContent.current !== null) {
            if (refWrap.current.clientHeight > refContent.current.clientHeight) {
                refBar.current.style.display = 'none';
            } else {
                refBar.current.style.display = 'block';
            }
        }
    }, [children]);

    return (
        <div ref={refWrap} className="justScroll">
            <div ref={refArea} className="justScroll-area">
                <div ref={refBar} className="justScroll-bar" onClick={handlerClickBar}>
                    <div className="justScroll-bar--track">
                        <div
                            ref={thumbYElement}
                            className="justScroll-bar--thumb"
                            onMouseDown={handlerMouseDown}
                        />
                    </div>
                </div>
                <div ref={refContent} className="justScroll-data">
                    {children}
                </div>
            </div>
        </div>
    );
};

