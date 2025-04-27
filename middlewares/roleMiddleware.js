const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Access denied. User with role '${req.user.role}' is not authorized to access this resource.`,
            })
        }
        next()
    }
}

export default authorizeRole
