const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
  const Schema = server.mongoose.Schema;
  const TeamSchema = new Schema({
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    }
  });

  TeamSchema.plugin(timestamps);
  return server.mongoose.model('Team', TeamSchema);
};
