// turns a raw string that might be a url
// into an actual url if possible
module.exports.validatedAddress = (rawUrl) => {
    try {
        new URL(rawUrl);
        return true;
    } catch (e) {
        return false;
    };
};
