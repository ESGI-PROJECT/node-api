const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        server.actions.projects.create
        // server.middlewares.ensureAuthenticated,
        // server.middlewares.ensureRights('Tasks.create'),
        // server.middlewares.bodyParser.json(),
        // server.middlewares.ensureFields('title'),
        // // server.middlewares.cache.clean('Tasks'),
        // server.actions.Tasks.create
    );

    // router.get('/',
    //     // server.middlewares.cache.get,
    //     server.actions.Tasks.list);
    //
    // router.get('/:id',
    //     server.middlewares.ensureAuthenticated,
    //     server.actions.Tasks.show);
    //
    // router.put('/',
    //     server.middlewares.ensureAuthenticated,
    //     server.middlewares.bodyParser.json(),
    //     server.actions.Tasks.update);
    //
    // router.delete('/:id',
    //     server.middlewares.ensureAuthenticated,
    //     server.actions.Tasks.remove);
    //
    // router.put('/:id/assign/:assignedId',
    //     server.middlewares.ensureAuthenticated,
    //     server.middlewares.ensureRights('Tasks.assign'),
    //     server.actions.Tasks.assign);

    return router;
};
