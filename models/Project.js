module.exports = (server) => {
  const Schema = server.mongoose.Schema;

  const Project = new Schema({
    title: String,
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    tasks: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
  });
}
