export const authorizeUser = (req, res, next) => {
    const { userId } = req;
    const { targetUser } = req;

    if (!userId || !targetUser) {
        return res.status(401).send({ message: "Unauthorized access" });
    }
    if (userId !== targetUser.id) {
        return res.status(403).send({ message: "Forbidden: You do not have permission to access this resource" });
    }   
    next();
}