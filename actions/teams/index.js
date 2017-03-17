module.exports = (server) => {
  const Team = server.models.Team;
  const User = server.models.Team;

  return {
      list,
      show,
      addUser,
      removeUser,
      unsubscribe,
  };

  function list(req, res, next) {
    Team.find()
        .then(setCache)
        .then(res.commit)
        .catch(res.error);
  }

  function show(req, res, next) {
      Team.findById(req.params.id)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'Team.not.found'))
          .then(res.commit)
          .catch(res.error);
  }

  function addUser(req,res,next) {


    Team.findById(req.team.id)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'Team.not.found'));
        .then(addUserToTeam)
        .then(res.commit)
        .catch(res.error);

    function addUserToTeam (data) {
      User.findById(req.user.id)
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'User.not.found'));
          .then(addToTeam)
          .then(returnTeam)

      function addToTeam(Team) {
        Team.users.push(User._id)
        Team.save()
      }

      function returnTeam() {
        return Team;
      }
    }
  }
};
