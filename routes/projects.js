const Router = require('express').Router;

module.exports = (server) => {
    let router = new Router();

    router.post('/',
        // verifier le token
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights('projects.create'),
        // body parser to get content
        server.middlewares.bodyParser.json(),
        server.actions.projects.create
        // server.middlewares.ensureAuthenticated,
        // server.middlewares.ensureRights('Tasks.create'),
        // server.middlewares.bodyParser.json(),
        // server.middlewares.ensureFields('title'),
        // // server.middlewares.cache.clean('Tasks'),
        // server.actions.Tasks.create
    );

    router.get('/',
      server.middlewares.ensureAuthenticated,
      server.middlewares.ensureRights("projects.list"),
      server.actions.projects.list
    );

    router.get('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights("projects.get"),
        server.actions.projects.show);

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights("projects.update"),
        server.middlewares.bodyParser.json(),
        server.actions.projects.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights("projects.remove"),
        server.actions.projects.remove
    );

    // router.put('/:id/assign/:assignedId',
    //     server.middlewares.ensureAuthenticated,
    //     server.middlewares.ensureRights('Tasks.assign'),
    //     server.actions.Tasks.assign);

    return router;
};
