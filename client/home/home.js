Template.homepage.helpers({
    days: function()
    {
        var todayStart = moment();
        todayStart.hour(0);
        todayStart.minute(0);
        todayStart.second(0);
        var todayEnd = moment(todayStart);
        todayEnd.add(1, 'd');
        
        var searchQuery = {data_inizio: todayStart.toDate(), data_fine: todayEnd.toDate()};
        console.log(searchQuery);
        return Common.groupDays(searchQuery);
    },
    
    today: function(){return new Date();}
})