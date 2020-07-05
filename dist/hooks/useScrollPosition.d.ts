import { useEffect } from 'react';
import { EffectType, OptionalType } from '../utils/types';
export declare const useIsomorphicLayoutEffect: typeof useEffect;
export declare function useScrollPosition(effect: EffectType, deps: any, { element, wait }: OptionalType): void;
