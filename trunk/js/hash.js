function toHex8(b) {
    return (b < 16 ? "0" : "") + b.toString(16)
}
function hexEncodeU32(b) {
    var c = toHex8(b >>> 24);
    c += toHex8(b >>> 16 & 255);
    c += toHex8(b >>> 8 & 255);
    return c + toHex8(b & 255)
}

function hash(b) {
    for (var c = 16909125, d = 0; d < b.length; d++) {
        var HASH_SEED_ = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
        c ^= HASH_SEED_.charCodeAt(d % HASH_SEED_.length) ^ b.charCodeAt(d);
        c = c >>> 23 | c << 9
    }
    return hexEncodeU32(c)
}