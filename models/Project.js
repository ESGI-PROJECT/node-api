module.exports = (server) => {
  const Schema = server.mongoose.Schema;

  const ProjectSchema = new Schema({
    title: String,
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team',
    },
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'Task',
    }],
  });

  return server.mongoose.model('Project', ProjectSchema);
}
