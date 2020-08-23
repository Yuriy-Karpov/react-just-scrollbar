import * as React from 'react';
export interface IJustScroll {
    refBar: React.Ref<any>;
    handlerClickBar: (event: any) => void;
    thumbYElement: React.Ref<any>;
    handlerMouseDown: (event: any) => void;
}
export declare const JustScrollBar: React.FC<IJustScroll>;
