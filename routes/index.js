module.exports = (server) => {
    server.use('/users', require('./users')(server));
    // server.use('/Tasks', require('./Tasks')(server));
    server.use('/auth', require('./auth')(server));
    server.use('/teams', require('./teams')(server));
    server.use('/projects', require('./projects')(server))
};
