Meteor.methods({
    
    getBuildDays: function()
    {
        var compareDay = function(d1,d2){
          return d1 && d2 && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear()  
        };
        var buildList = ServerBuild.find({}, {sort: { date: 1 } }).fetch();
        var days = [];
        var refDate;
        for(var i=0; i<buildList.length; i++)
        {
            var build = buildList[i];
            if(!compareDay(build.date, refDate))
            {
                refDate = build.date;
                days.push({day: new Date(refDate.getYear(), refDate.getMonth(), refDate.getDay()), serverBuild: [build]});
            }
            else
            {
                days[days.length-1].serverBuild.push(build);
            }
        }
        //console.log(days.length);
        return days;
    },
    
    buildUpsert: function(userId, id, build)
    {
        var user = Meteor.users.findOne({_id: userId});
        if(user && user.profile.isAdmin)
        {
            ServerBuild.update({_id: id},{$set: build}, {upsert: true});
        }
    },

});