module.exports = (server) => {
    const User = server.models.User;
    const Task = server.models.Task;

    return (req, res, next) => {
        let originalAssignedUser = null;
        let newAssignedUser = null;
        let Task = null;

        return findAssigned() // 1. ensuring the new assigned exist
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'assigned.not.found'))
            .then(findTask) // 2. capturing the Task as global variable
            .then(server.utils.ensureOne)
            .catch(server.utils.reject(404, 'Task.not.found'))
            .then(getOriginalAssigned) // 3. capturing the originalAssigned as global variable.
            .then(updateTask)
            .then(updateAssigneds)
            .then(server.utils.empty)
            .then(res.commit)
            .catch(res.error);

        function findAssigned(){
            return User.findById(req.params.assignedId)
                .then(set);

            function set(data){
                return newAssignedUser = data;
            }
        }

        function findTask(){
            return Task.findById(req.params.id)
                .then(set);

            function set(data){
                return Task = data
            }
        }

        function getOriginalAssigned() {
            return User.findById(Task.assigned)
                .then(set);

            function set(data) {
                originalAssignedUser = data
            }
        }

        function updateTask() {
            Task.assigned = req.params.assignedId;
            return Task.save();
        }

        function updateAssigneds(){

            return updateOriginal()
                .then(updateNew);

            function updateOriginal() {
                return User.findByIdAndUpdate(originalAssignedUser._id, {
                    $pull: {
                        'tasks': Task._id
                    }
                })
            }

            function updateNew() {
                newAssignedUser.tasks.push(Task._id.toString());
                return newAssignedUser.save();
            }
        }

        function returnTask(){
            return Task;
        }
    };
};