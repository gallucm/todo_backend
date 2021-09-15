

const test = async (req, res) => {
    res.status(200).json({
        code: 200,
        message: "test working",
    });
};

module.exports = {
    test,
}