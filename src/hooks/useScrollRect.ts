//TODO Do I need this function?
import {useCallback, useState} from 'react';

export function useScrollRect() {
    const [rect, setRect] = useState(null);
    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node);
        }
    }, []);
    return [rect, ref];
}
