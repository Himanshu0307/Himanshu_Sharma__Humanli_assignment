function getRommIdFromEmail(u1, u2) {
    const sortedIds = [u1, u2].sort();
    return `${sortedIds[0]}-${sortedIds[1]}`;

}
module.exports = getRommIdFromEmail