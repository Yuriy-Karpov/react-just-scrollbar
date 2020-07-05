import * as React from 'react';
export interface IJustScroll {
    children: React.ReactNode;
    margin?: number;
    updateDeps?: any[];
}
export declare const JustScroll: React.FC<IJustScroll>;
