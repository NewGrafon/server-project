export const groupsModule = angular.module('groups', [])
    .component('groupsList', {
        templateUrl: '/partials/groups/list',
        controller:[
            'Group',
            function(Group) {
                this.groups = Group.query();
            }
        ]
    })
    .component('groupsEdit', {
        templateUrl: '/partials/groups/edit',
        controller:[
            'Group',
            '$stateParams',
            '$state',
            'NotificationService',
            function(Group, $stateParams, $state, NotificationService){
                if($stateParams.id){
                    this.group = Group.get({id:$stateParams.id});
                } else {
                    this.group = new Group();
                }
                this.save = function(){
                    this.group.$save(function(){
                        NotificationService.showSuccess('Группа сохранена');
                        $state.go('groups',{},{reload: true});
                    })
                }

            }]
    })
    .component('groupsView', {
        templateUrl: '/partials/groups/view',
        controller:[
            'Group',
            'Server',
            '$stateParams',
            function (Group, Server, $stateParams) {
                this.group = Group.get({id: $stateParams.id});
                this.servers = Server.query();
                this.filteredServers = function() {
                    return (this.servers).filter(srv => srv.groupId === this.group._id);
                }
            }]
    })