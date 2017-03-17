const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.get('/',
        server.middlewares.ensureAuthenticated,
        // server.middlewares.ensureRights("teams.list"),
        server.actions.teams.list
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        //server.middlewares.ensureRights("teams.get"),
        server.actions.teams.show);

    router.put('/:teamId/add',
        server.middlewares.bodyParser.json(),
        server.actions.teams.addUser);

    router.put('/:teamId/remove',
        server.middlewares.bodyParser.json(),
        server.actions.teams.removeUser);

    router.get('/unsubscribe',
        server.actions.teams.unsubscribe);

    return router;
};
