module.exports = (server) => {
  const Project = server.models.Project;
  const Team = server.models.Team;
  const Task = server.models.Task;
  const User = server.models.User;

  return {
    create,
    list,
    remove,
    show,
    update,
  };
  /*
  *
  * CREATE
  *
  */
  function create(req, res, next) {
    let task = null;
    // retrieve user id
    return findUserAndCreateProject()
      .then(server.utils.ensureOne)
      .catch(server.utils.reject(403, 'no user'))
      .then(createTeam)
      .then(createProject)
      .then(res.commit)
      .catch(console.log(res.error));

    // return user id
    function findUserAndCreateProject() {
      return User.findById(req.user.id);
    }

    // create team
    function createTeam(user) {
      const users = [user];
      return new Team({ users })
        .save();
    }

    // create project

    function createProject(team) {
      return new Project({ team, title: req.body.title })
        .save();
    }
  }

  /*
  *
  *
  * LIST
  */

  function list(req, res, next) {
    Project.find()
      .then(res.commit)
      .catch(console.log(res.error));
  }

  /*
  *
  * REMOVE
  *
  */
  function remove(req, res, next) {
    return Project.findByIdAndRemove(req.params.id)
      .then(server.utils.ensureOne)
      .then(removeTeam)
      .catch(server.utils.reject(404, 'project not find'))
      .then(server.utils.empty)
      .then(res.commit)
      .catch(res.error)

    function removeTeam(team) {
      Team.findByIdAndRemove(team._id)
        .then(server.utils.empty)
        .catch(res.error);
    }
  }

  /*
  *
  * SHOW
  *
  */

  function show(req, res, next) {
      Project.findById(req.params.id)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'Project.not.found'))
          .then(res.commit)
          .catch(res.error);
  }

  /*
  *
  * UPDATE
  *
  */

  function update(req, res, next) {
    Project.findByIdAndUpdate(req.params.id, req.body)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'Project.not.found'))
        .then(server.utils.empty)
        .then(res.commit)
        .catch(console.log(res.error));
  }
}
