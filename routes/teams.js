const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.get('/',
        server.actions.teams.list);

    router.get('/:id',
        server.actions.teams.show);

    router.put('/add',
        server.middlewares.bodyParser.json(),
        server.actions.teams.addUser);

    router.put('/remove',
        server.middlewares.bodyParser.json(),
        server.actions.teams.removeUser);

    router.get('/unsubscribe',
        server.actions.teams.unsubscribe);

    return router;
};
