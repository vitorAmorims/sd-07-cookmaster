const isUser = (originalUrl) => {
    if (originalUrl === '/users/admin') return false;

    return true;
};

module.exports = isUser;