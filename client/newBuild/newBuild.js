Template.newBuild.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({locale: 'it'});
});

Template.newBuild.helpers({
    readOnly: function(){
        var edit = Session.get('editMode') || false;
        var res = edit ? '' : 'readonly'; 
        return res;
    },
    
    editMode: function(){
        return Session.get('editMode') || false;
    },
});

Template.newBuild.events({
    'submit form': function(event, template)
    {
        event.preventDefault();
        var build = template.data;
        var properties= ['date', 'project','package', 'branch', 'revision', 'data_collaudo', 'produzione', 'tag_name', 'freeze', 'ambiente_collaudo', 'data_collaudo'];
        
        properties.forEach(function(p){
            build[p] = $(event.target).find('[name=' + p + ']').val();
            //console.log(build[p]);
        }); 
        
        //console.log(build);
        var dates = ['date', 'data_collaudo', 'produzione'];
        dates.forEach(function(p)
        {
            var mom = moment(build[p], 'DD/MM/YYYY H:mm');
            if(mom.isValid()) 
            {
                //console.log(mom)
                build[p] = mom.toDate();
            }
            else
            {
                console.log(build[p] + ' is not a valid Date!');
                return;
            }
        });
        
        var id = build._id;
        if(build._id)
        {
            delete build._id;
        }
        else
        {
            build._id = new Meteor.Collection.ObjectID();
        }
        var id = build._id;

        Meteor.call('buildUpsert', Meteor.userId(), id, build);
        //ServerBuild.update({_id: id},{$set: build}, {upsert: true});
        Router.go('buildLog');
    }
});