module.exports = (server) => {
  const Team = server.models.Team;

  return {
      list,
      show,
      // addUser,
      // removeUser,
      // unsubscribe,
  };

  function list(req, res, next) {
    Team.find()
        // .then(setCache)
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


};
