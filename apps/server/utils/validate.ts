// turns a raw string that might be a url
// into an actual url if possible
export const validatedAddress = (rawUrl: string): boolean => {
    try {
        new URL(rawUrl);
        return true;
    } catch (e) {
        return false;
    }
};
