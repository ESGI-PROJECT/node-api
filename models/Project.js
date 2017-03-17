module.exports = (server) => {
  const Schema = server.mongoose.Schema;

  const Project = new Schema({
    title: String,
    team: {
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      member: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    tasks: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  });
}
