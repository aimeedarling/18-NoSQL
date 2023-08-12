
const formatTime = virtual('timestamp').get(function () {
    return this.createdAt.toLocalString()
});

module.exports = Helpers