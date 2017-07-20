﻿(function () {
    "use strict";

    angular.module("app")
    // Admin controller for displaying admin specific tasks.
    .controller("adminCtrl", function (user, userPage, currentUser, searchUser) {
        var vm = this;

        // Getting users and display them.
        vm.users = [];
        //var allUsers;
        //vm.getUsers = function () {
        //    user.query(function (data) {
        //        angular.copy(data.length, allUsers);
        //        //allUsers = data.length;
        //        //angular.copy(data.length, dbUsers);
        //    });
        //};
        //vm.getUsers();
        //console.log(allUsers);
        
        vm.take = 1;
        vm.page = 1;
        vm.showPagenation = false;

        vm.getUsersPage = function (take, page) {
            userPage.query({ take: take, page: page }, function (data) {
                if (vm.users < 1) {
                    //console.log(vm.page);
                    //console.log(data);
                    angular.copy(data, vm.users);
                    vm.showPagenation = true;
                    //console.log(vm.users);
                } else {
                    //console.log(data);
                    //console.log(vm.users.length);
                    for (var i = 0; i < data.length; i++) {
                        vm.users.push(data[i]);
                    }
                    //console.log(vm.users);
                };

                vm.page += 1;
                //console.log(vm.page);
            });
        };

        vm.show = true;
        vm.hide = true;
        vm.currentModifyUser = '';

        // Make sure we edit correct user.
        vm.editUser = function (getId) {
            if (vm.currentModifyUser == getId) {
                vm.currentModifyUser = '';
            } else {
                vm.currentModifyUser = getId;
            }
            vm.show = false;
            vm.hide = false;
        };

        // Saves the edited user.
        vm.saveEdits = function (getId) {

            var editUserData = {};
            for (var i = 0; i < vm.users.length; i++) {
                if (vm.users[i].Id == getId) {
                    editUserData = vm.users[i];
                    break;
                };
            };
            user.update({ id: getId }, editUserData);
            vm.currentModifyUser = '';
        };

        //Search by name, and other.
        vm.searchString = "";
        vm.search = function () {
            //console.log(vm.searchString);
            searchUser.stringSearch.query({query: vm.searchString}, function (data) {
                //console.log(data);
                angular.copy(data, vm.users);
            });
        };

        //Search by district nr sing or by range.
        vm.searchStringDistrict = null;
        vm.searchDistrict = function () {
            //console.log(vm.searchString);
            searchUser.districtSearch.query({query: vm.searchStringDistrict }, function (data) {
                //console.log(data);
                angular.copy(data, vm.users);
            });
        };

        //Remove user from DB.
        vm.remove = function (getId) {
            if (vm.currentModifyUser != getId) {
                vm.currentModifyUser = '';
            } else {
                vm.currentModifyUser = getId;
            }
            user.delete({ id: getId }, function (data) {
                //console.log(data);
                vm.getUsers();
            });
            
        };

        vm.cancle = function () {
            vm.show = true;
            vm.hide = true;
            vm.currentModifyUser = '';
            vm.getUsers();
        };

    });

})();