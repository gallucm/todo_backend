const getDate = () => {
    const date = new Date();
    // return date.setHours(date.getHours() - 3);
    return date;
}

module.exports = {
    getDate
}