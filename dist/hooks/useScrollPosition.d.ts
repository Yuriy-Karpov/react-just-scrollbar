import { useLayoutEffect } from 'react';
import { EffectType, OptionalType } from '../utils/types';
export declare const useIsomorphicLayoutEffect: typeof useLayoutEffect;
export declare function useScrollPosition(effect: EffectType, deps: any, { element, wait }: OptionalType): void;
