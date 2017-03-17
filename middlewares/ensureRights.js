module.exports = (server) => {
    return (action) => {
        const restrictions = server.settings.acl.actions;
        const requiredAccessLevel = restrictions[action].level;
        const belongsTo = restrictions[action].belongs;
        const Team = server.models.Team;

        return (req, res, next) => {
            let userAccessLevel = req.user.accessLevel;
            if (userAccessLevel > requiredAccessLevel) {
                if (belongsTo) {
                    let authorization = req.headers['authorization'];
                    let teamId = req.params.teamId;
                    Team.findByfindById(teamId)
                        .then(checkBelonging)
                        .catch(() => {});

                    function checkBelonging(data) {
                        for (let user in data) {
                            if (user._id == authorization) {
                                next();
                            }
                        }  
                    }
                }
                return res.status(401).send('not.enough.rights');
            }

            next();
        };
    };
};