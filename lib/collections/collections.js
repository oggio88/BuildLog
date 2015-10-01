ServerBuild = new Meteor.Collection('server_build');

var userIsAdmin = function(userId, doc)
{
    var user = Meteor.users.findOne({_id: userId});
    return user.profile.isAdmin;
};

ServerBuild.allow({
    remove: userIsAdmin,
    insert: userIsAdmin,
    update: userIsAdmin
});

Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

