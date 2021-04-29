// Defining secure sources
const contentSecurityPolicy = function (req, res, next) {
    res.set(
        'Content-Security-Policy',
        'script-src * self https://cdn.jsdelivr.net'
    );
    next();
};

export default contentSecurityPolicy;
