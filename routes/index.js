module.exports = (server) => {
    server.use('/users', require('./users')(server));
    server.use('/todos', require('./todos')(server));
    server.use('/auth', require('./auth')(server));
    server.use('/teams', require('./teams')(server));
};
