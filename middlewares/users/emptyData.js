const emptyData = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
 res.status(401).json({
        message: 'All fields must be filled',
    }); 
}

    next();
};

module.exports = emptyData;