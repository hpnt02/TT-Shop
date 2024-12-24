import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounceValue, setDebounceDelay] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceDelay(value), delay);
        return () => clearTimeout(handler);
    }, [delay, value]);

    return debounceValue;
}

export default useDebounce;
