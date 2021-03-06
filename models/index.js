const mongoose = require('mongoose');
const bluebird = require('bluebird');

module.exports = (server) => {
    server.mongoose = mongoose.connect(server.settings.db.mongo.url);
    server.mongoose.Promise = bluebird;
    server.models = {
        User: require('./User')(server),
        Task: require('./Task')(server),
        Role: require('./Role')(server),
        Team: require('./Team')(server),
        Project: require('./Project')(server),
    }
};
