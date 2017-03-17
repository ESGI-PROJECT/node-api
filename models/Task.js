const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
    const Schema = server.mongoose.Schema;

    const TaskSchema = new Schema({
        title: String,
        description: String,

        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        assigned: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        },
    });

    TaskSchema.plugin(timestamps);

    return server.mongoose.model('Task', TaskSchema);
};
