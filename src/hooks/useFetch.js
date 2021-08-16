import { useCallback, useEffect, useMemo, useState } from "react";

export const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const controller = useMemo(() => new AbortController(), []);
    const { signal } = controller;

    const fetchHandler = useCallback(
        async (url, args) => {
            setLoading(true);
            setError(null);

            try {
                let response;

                // For cases when we fetch from API
                if (process.env.REACT_APP_BACKEND_URL !== undefined) {
                    response = await fetch(
                        `${process.env.REACT_APP_BACKEND_URL}${url}`,
                        { ...args, signal }
                    );
                    // For cases when we fetch locally
                } else {
                    response = await fetch(
                        url,
                        { ...args, signal }
                    );
                }

                const res = await response.json();

                setLoading(false);

                return res;
            } catch (err) {
                setLoading(false);
                setError(err.message.split(","));
            }
        },
        [signal]
    );

    useEffect(() => {
        return () => {
            controller.abort();
        };
    }, [controller]);

    return { fetchHandler, loading, error };
};
