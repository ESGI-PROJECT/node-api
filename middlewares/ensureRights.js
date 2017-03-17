module.exports = (server) => {
    return (action) => {
        const restrictions = server.settings.acl.actions;
        const requiredAccessLevel = restrictions[action].level;

        return (req, res, next) => {
            let userAccessLevel = req.user.accessLevel;
            if (userAccessLevel > requiredAccessLevel)
                return res.status(401).send('not.enough.rights');

            next();
        };
    };
};