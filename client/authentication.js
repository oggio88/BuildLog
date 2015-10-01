//Meteor.subscribe("usernames");
//var Usernames = new Meteor.Collection("users");

Accounts.ui.config({
    requestPermissions: {},
    extraSignupFields: [{
        fieldName: 'username',
        fieldLabel: 'Username',
        inputType: 'text',
        visible: true,
        validate: function (value, errorFunction) {
            if (!value) {
                errorFunction("Please write your username");
                return false;
            } else {
                var existingUser = Meteor.users.find({username: value});
                return existingUser.count() ? false : true;
            }
        }
    }]
});

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  Router.go('homepage');
}