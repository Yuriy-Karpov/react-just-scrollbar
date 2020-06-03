
export type CoordsType = {
    x: number;
    y: number;
}
export type InputEffectType = {
    prevPos: CoordsType;
    currPos: CoordsType;
}
export type EffectType = ({prevPos, currPos}: InputEffectType) => void;

export type ElementType = HTMLDivElement | null;

export type OptionalType = {
    element?: ElementType
    wait?: number;
}
