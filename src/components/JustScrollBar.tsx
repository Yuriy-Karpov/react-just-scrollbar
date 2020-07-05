import * as React from 'react';


export interface IJustScroll {
    refBar: React.Ref<any>,
    handlerClickBar: (event: any) => void,
    thumbYElement: React.Ref<any>,
    handlerMouseDown: (event: any) => void,
}

export const JustScrollBar: React.FC<IJustScroll> = (
    {
        refBar,
        handlerClickBar,
        thumbYElement,
        handlerMouseDown,
    }) => {

    return (
        <div ref={refBar} className="justScroll-bar" onClick={handlerClickBar}>
            <div className="justScroll-bar--track">
                <div
                    ref={thumbYElement}
                    className="justScroll-bar--thumb"
                    onMouseDown={handlerMouseDown}
                />
            </div>
        </div>
    );
};

