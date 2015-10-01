Utils = {
    'pad': function(number, lead) {
    var limit = lead > 1 ? Math.pow(10,lead-1) : 0;
        return (number < limit) ? ("0" + this.pad(number, lead-1)) : ''+number;
    },
    
    'decimal': function(number, precision){
        var ten = Math.pow(10,precision)
        return (Math.round(number * ten) / ten).toFixed(precision);
    },
    
    'countProperties': function countProperties(obj) {
        return Object.keys(obj).length;
    },
    
    'dir': function(obj){
        var res=[];
        for (var name in obj) 
        {
            if (obj.hasOwnProperty(name) && typeof obj[name] !== 'function') 
            {
                res.push(name);
            }
        }
        return res;
    },
    
    'method': function (obj, name, func) {
        obj.prototype[name] = func;
        return obj;
    }
};

Common = {
    groupDays: function(searchQuery)
    {
        var compareDay = function(d1,d2){
          return d1 && d2 && d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getYear() === d2.getYear()  
        };

        var criteria = { };
        var dateCriteria = {};
        searchQuery.data_inizio && (dateCriteria['$gte'] = searchQuery.data_inizio);
        searchQuery.data_fine && (dateCriteria['$lt'] = searchQuery.data_fine);
        (dateCriteria['$gte'] || dateCriteria['$lt']) && (criteria['date'] = dateCriteria);
        searchQuery.project && (criteria.project = searchQuery.project);
        var buildList = ServerBuild.find(criteria, {sort: { date: 1 } }).fetch();

        var days = [];
        var refDate;
        for(var i=0; i<buildList.length; i++)
        {
            var build = buildList[i];
            if(!compareDay(build.date, refDate))
            {
                refDate = build.date;
                days.push({day: new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()), serverBuild: [build]});
            }
            else
            {
                days[days.length-1].serverBuild.push(build);
            }
        }
        //console.log(days.length);
        return days;
    },
}
