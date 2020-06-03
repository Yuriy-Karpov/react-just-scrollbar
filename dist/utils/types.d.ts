export declare type CoordsType = {
    x: number;
    y: number;
};
export declare type InputEffectType = {
    prevPos: CoordsType;
    currPos: CoordsType;
};
export declare type EffectType = ({ prevPos, currPos }: InputEffectType) => void;
export declare type ElementType = HTMLDivElement | null;
export declare type OptionalType = {
    element?: ElementType;
    wait?: number;
};
