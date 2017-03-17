const timestamps = require('mongoose-timestamps');

module.exports = (server) => {
  const Schema = server.mongoose.Schema;
  const TeamSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  });

  TeamSchema.plugin(timestamps);
  return server.mongoose.model('Team', TeamSchema);
};
