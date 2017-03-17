module.exports = (server) => {
    server.actions = {
        users: require('./users')(server),
        tasks: require('./tasks')(server),
        auth: require('./auth')(server),
        teams: require('./teams')(server),
        projects: require('./projects')(server),
    }
};
