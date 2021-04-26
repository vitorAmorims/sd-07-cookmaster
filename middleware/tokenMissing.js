const tokenMissing = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    
    next();
};

module.exports = tokenMissing;