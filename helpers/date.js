const getDate = () => {
    const date = new Date();
    return date.setHours(date.getHours() - 3);
}

module.exports = {
    getDate
}