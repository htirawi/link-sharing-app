export const getPropertyByPath = <T = unknown>(
    obj: Record<string, unknown>,
    path: string,
): T | undefined => {
    return path.split('.').reduce((acc: unknown, part: string) => {
        if (acc && typeof acc === 'object' && acc !== null) {
            return (acc as Record<string, unknown>)[part];
        }
        return undefined;
    }, obj) as T | undefined;
};
