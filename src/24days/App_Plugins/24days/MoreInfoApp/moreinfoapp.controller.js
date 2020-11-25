/**
 * @ngdoc
 * 
 * @name: dashboardController
 * @description: code for a dashboard in the umbraco back office
 * 
 */
(function () {
    'use strict';

    function moreInfoAppController($scope,
        editorState, userService, contentResource) {

        var vm = this;
        vm.CurrentNodeId = editorState.current.id;
        vm.CurrentNodeAlias = editorState.current.contentTypeAlias;
        vm.loading = true;
        vm.iframeSrc = '/umbraco/preview/?id=' + vm.CurrentNodeId;
        vm.userName = '';
        vm.contentNode = {};
        vm.numberOfProperties = 0;


        contentResource.getById(vm.CurrentNodeId).then(function (node) {
            vm.contentNode = node;
            console.log('node', node);
            
            node.variants[0].tabs.forEach((tab) => {
                vm.numberOfProperties += tab.properties.length;    
            });
            vm.loading = false;
            //var properties = node.variants[0].tabs[0].properties;

            //vm.propertyWordCount = {};

            //var index;
            //for (index = 0; index < properties.length; ++index) {
            //    var words = properties[index].value;
            //    var wordCount = words.trim().split(/\s+/).length;

            //    vm.propertyWordCount[properties[index].label] = wordCount;
            //}
        });

        userService.getCurrentUser().then(function (user) {
            vm.userName = user.name;
        });
    }

    angular.module('umbraco')
        .controller('moreInfoAppController', moreInfoAppController);
})();
