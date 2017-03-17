module.exports = (server) => {
    const Task = server.models.Task;
    const Project = server.models.Project;

    return {
        create,
        list,
        show,
        update,
        remove,
        // assign: require('./assign')(server)
    };

    function create(req, res, next) {
        let project = null;

        return Project.findById(req.project.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(403, 'invalid.project'))
            .then(createTask)
            // .then(setCreatorAndAssign)
            .then(persist)
            .then(res.commit)
            .catch(res.error);

        function createTask(data) {
            uproject = data;
            return new Task(req.body);
        }

        // function setCreatorAndAssign(Task) {
        //     Task.creator = req.user.id;
        //     Task.assigned = req.user.id;
        //     return Task;
        // }

        function persist(Task) {
            return Task.save()
                .then(addToProject)
                .then(returnTask);

            function addToProject(Task) {
                project.tasks.push(Task._id);
                project.save()
            }

            function returnTask() {
                return Task;
            }
        }
    }

    function list(req, res, next) {
      Task.find()
          .then(setCache)
          .then(res.commit)
          .catch(res.error);

        // function setCache(Tasks) {
        //     server.cache.set({
        //         group: 'Tasks',
        //         key: req.originalUrl,
        //         value: Tasks
        //     });
        //     return Tasks;
        // }
    }

    function show(req, res, next) {
        Task.findById(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'Task.not.found'))
            .then(res.commit)
            .catch(res.error);
    }

    function update(req, res, next) {
        Task.findByIdAndUpdate(req.body.id, req.body)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'Task.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }

    function remove(req, res, next) {
        Task.findByIdAndRemove(req.params.id)
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'Task.not.found'))
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);
    }
};
