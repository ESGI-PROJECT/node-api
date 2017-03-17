module.exports = (server) => {
    return (action) => {
        const restrictions = server.settings.acl.actions;
        const requiredAccessLevel = restrictions[action].level;
        const belongsTo = restrictions[action].belongs;
        const entity = restrictions[action].entity;
        const Team = server.models.Team;
        const Project = server.models.Project;

        return (req, res, next) => {
            let userAccessLevel = req.user.accessLevel;
            if (userAccessLevel < requiredAccessLevel) {
                if (belongsTo) {
                    let id = req.params.id;
                    if (entity == "project") {
                        Project.findById(id)
                            .then(checkBelongingProject)
                            .catch(() => {});
                    } else {
                        Team.findById(id)
                            .then(checkBelongingTeam)
                            .catch(() => {});
                    }

                    function checkBelongingTeam(data) {
                        for (let user of data) {
                            if (user._id == req.user.id) {
                                next();
                            }
                        }  
                    }

                    function checkBelongingProject(data) {
                        let team = Team.findById(data.team)
                        .then((data) => {
                            let isAuthorized = false;
                            for (let id of data.users) {
                                if (id == req.user.id) {
                                    isAuthorized = true;
                                }
                            }  
                            if(!isAuthorized)
                                return returnError();
                        });
                    }
                }
                
            } else {
                return returnError();
            }

            function returnError() {
                return res.status(401).send('not.enough.rights');
            }

            next();
        };
    };
};