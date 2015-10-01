Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('buildLog');
    this.route('homepage', {path: '/'});
    this.route('serverBuild', {
            template: 'newBuild',
            path: '/serverBuild', //'/serverBuild/:_id',
            data: function() {
                var _id = this.params.query.id;
                if(!_id)
                {
                    return {};
                }
                //var _id  = this.params._id;
                var res = ServerBuild.findOne({_id: new Mongo.ObjectID(_id)});
                return res; 
            },
        });
});