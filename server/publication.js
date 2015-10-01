Meteor.publish('allBuilds', function () {
    return ServerBuild.find({});
});