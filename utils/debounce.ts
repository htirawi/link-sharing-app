export const debounce = <T, Args extends unknown[]>(
    cb: (...args: Args) => Promise<T> | T,
    wait: number,
) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Args): Promise<T> => {
        return new Promise((resolve) => {
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
                const result = await cb(...args);
                resolve(result);
            }, wait);
        });
    };
};
