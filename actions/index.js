module.exports = (server) => {
    server.actions = {
        users: require('./users')(server),
        tasks: require('./tasks')(server),
        auth: require('./auth')(server),
        projects: require('./projects')(server),
    }
};
