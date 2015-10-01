Template.registerHelper('formatDay', function(date){
    return date && (date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear());
});

Template.registerHelper('formatTime', function(date){
    return date && moment(date).format('HH:mm');
});

Template.registerHelper('formatDateTime', function(date){
    return date && moment(date).format('DD/MM/YYYY, HH:mm:ss');
})

Template.registerHelper('userIsAdmin', function(){
    return Meteor.user() && Meteor.user().profile.isAdmin
});

Template.registerHelper('session',function(input){
  return Session.get(input);
});