// convert number back to base 62
module.exports.toBase62 = (num) => {
    const base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const baseIndex = num % 62 ;

    // pick first number
    let result = base[baseIndex];
    let q = Math.floor(num / 62);

    // while our value is not 0
    while (q) {
        let r = q % 62;
        q = Math.floor(q / 62);
        result = base[r] + result;
    }
    return result;
};

// Convert the shortened URL from base 62 back to base 10
module.exports.toBase10 = (num) => {
    const base = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    num += "";
    const limit = num.length;
    let result = base.indexOf(num[0]);
    for (let i = 1; i < limit; i++) {
        result = 62 * result + base.indexOf(num[i]);
    }
    return result;
};
