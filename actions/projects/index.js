module.exports = (server) => {
  const Project = server.models.Project;
  const Team = server.models.Team;
  const Task = server.models.Task;

  return {
    create,
  };

  function create(res, req, next) {
    let task = null;
    let team = null;

    return Team.findById(req.team.id)
      .then(server.utils.ensureOne)
      .catch(server.utils.reject(403, 'no team'))
      // .then(createTeam)
      .then(createProject)
      .then(persist)
      .then(res.commit)
      .catch(res.error);

    persist = (Project) => { // function
      return Project.save()
        // .then(addToTeam)
        .then(returnProject)
        .catch((error) => { console.log(error) });
        // TODO add to team

      returnProject = () => { // function this.returnProject = this.returnProject.bind(this);
        return Project;
      }
    }
  }

}
