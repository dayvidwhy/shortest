/*
    Turns a raw string that might be a url
    into an actual url if possible.

    This is duplicated from the node servers validate
    code, because I'm unsure if I want to import something from
    the front ends source into the servers code.

    A monorepo with shared packages would solve this.
*/
export const validatedAddress = (rawUrl: string): boolean | string => {
    try {
        const parsed = new URL(rawUrl);
        return parsed.href;
    } catch (e) {
        return false;
    }
};
