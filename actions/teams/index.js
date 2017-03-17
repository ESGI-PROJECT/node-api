module.exports = (server) => {
  const Team = server.models.Team;
  const User = server.models.User;
  const lodash = require('lodash');

  return {
      list,
      show,
      addUser,
      removeUser,
      unsubscribe,
  };

  function list(req, res, next) {
    Team.find()
        // .then(setCache)
        .then(res.commit)
        .catch(res.error);
  }

  function show(req, res, next) {
      Team.findById(req.params.id)
          .populate('users')
          .then(server.utils.ensureOne)
          .catch(server.utils.reject(404, 'Team.not.found'))
          .then(res.commit)
          .catch(res.error);
  }

  function addUser(req,res,next) {
    let team = null
    Team.findById(req.params.teamId)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'Team.not.found'))
        .then(findUser)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'User.not.found'))
        .then(isInTeam)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'User.already.in.team'))
        .then(addUserToTeam)
        .then(res.commit)
        .catch(res.error);

    function findUser(data) {
      console.log(data)
      team = data;
      return User.findById(req.body.userId);
    }

    function isInTeam(user) {
      if (team.users.indexOf(user._id.toString()) != -1) {
        return null;
      }

      return user;
    }

    function addUserToTeam (user) {
      team.users.push(user._id);
        return team.save();
    }
  }

  function removeUser(req,res,next) {
    let team = null
    Team.findById(req.params.teamId)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'Team.not.found'))
        .then(findUser)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'User.not.found'))
        .then(isInTeam)
        .then(server.utils.ensureOne)
        .catch(server.utils.reject(404, 'User.not.in.team'))
        .then(removeUserToTeam)
        .then(res.commit)
        .catch(res.error);

    function findUser(data) {
      console.log(data)
      team = data;
      return User.findById(req.body.userId);
    }

    function isInTeam(user) {
      if (team.users.indexOf(user._id.toString()) != -1) {
        return user;
      }

      return null;
    }

    function removeUserToTeam (user) {
      team.users.splice(team.users.indexOf(user._id), 1);
        return team.save();
    }
  }

  function unsubscribe(req, res, next) {
    return res.commit("TODO");
  }
};
