// turns a raw string that might be a url
// into an actual url if possible
const validatedAddress = (rawUrl) => {
    try {
        const parsed = new URL(rawUrl);
        return parsed.href;
    } catch (e) {
        return false;
    };
};

module.exports.validatedAddress = validatedAddress;
