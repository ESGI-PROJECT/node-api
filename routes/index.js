module.exports = (server) => {
    server.use('/users', require('./users')(server));
    server.use('/tasks', require('./tasks')(server));
    server.use('/auth', require('./auth')(server));
    server.use('/teams', require('./teams')(server));
    server.use('/projects', require('./projects')(server))
};
