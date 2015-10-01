
Template.buildLog.helpers({
    days: function()
    {
        var searchQuery = Template.instance().searchQuery.get();        
        return Common.groupDays(searchQuery);
    },
    
    editMode: function(){return Session.get('editMode');},
    
    projects: function()
    {
        var build = ServerBuild.find().fetch();
        var distinctData = _.uniq(build, false, function(d) {return d.project});
        return _.pluck(distinctData, "project");
    }
});


Template.buildDay.helpers({
    editMode: function(){return Session.get('editMode');},
});

Template.buildRow.helpers({
    editMode: function(){return Session.get('editMode');},
});

//Template.buildLog.created = function() {
//    var self = this;
//    self.res = new ReactiveVar("Waiting for response from server...");
//    Meteor.call('getBuildDays', null, function(error, result){
//        self.res.set(result);
//    });
//}

Template.buildLog.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({locale: 'it'});
});

Template.buildLog.created = function () {
    this.searchQuery = new ReactiveVar({});
};

Template.buildLog.events({
    'click #editButton': function(event, template){
        var editMode = Session.get('editMode');
        if(editMode)
        {
            editMode = false;
        }
        else
        {
            editMode = true;
        }
        Session.set('editMode', editMode);
        
        editMode ? template.$('ul li:has(a#editButton)').addClass('active') : template.$('ul li:has(a#editButton)').removeClass('active');
        //console.log(editMode);
        //template.editMode.set(!template.editMode.get());
        //console.log(template.editMode.get());
    },
    
    'click #addBuildButton': function(event, template)
    {
        var editMode = Session.get('editMode');
        if(editMode)
        {
            return;
        }
        else
        {
            Session.set('editMode', true);
        }
    },
    
    'blur input#data_inizio': function(event, template)
    {
        var template = Template.instance();
        var searchQuery = template.searchQuery.get();
        var data_inizio = moment(template.$('#data_inizio').val(), 'DD/MM/YYYY H:mm');
        data_inizio.isValid() && (searchQuery.data_inizio = data_inizio.toDate());
        Template.instance().searchQuery.set(searchQuery);
    },
    
    'blur input#data_fine': function(event, template)
    {
        var template = Template.instance();
        var searchQuery = template.searchQuery.get();
        var data_fine = moment(template.$('#data_fine').val(), 'DD/MM/YYYY H:mm');
        data_fine.isValid() && (searchQuery.data_fine = data_fine.toDate());
        Template.instance().searchQuery.set(searchQuery);
    },
    
    'change select#project': function(event, template)
    {
        var template = Template.instance();
        var searchQuery = template.searchQuery.get();
        var project = template.$('#project').val();
        if(project !== 'All')
        {
            searchQuery.project = project;
        }
        else
        {
            delete searchQuery.project;
        }
        Template.instance().searchQuery.set(searchQuery);
    }
});


Template.buildRow.events({
    'click tr td:not(.control-column)': function(event, template)
    {
        Router.go('serverBuild', {}, {query: 'id=' + template.data._id._str});// {_id: template.data._id._str});
    },
    
    'click td span.glyphicon-remove': function(event, template)
    {
        ServerBuild.remove({_id: template.data._id});
    }
});