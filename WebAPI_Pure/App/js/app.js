!function(){"use strict";angular.module("app",["ngRoute","services","oc.lazyLoad"]).config(["$routeProvider","$qProvider",function(e,o){e.when("/",{templateUrl:"App/html/startPage.html",controller:"registerAndLoginCtrl",controllerAs:"vm"}).when("/Login",{templateUrl:"App/html/startPage.html",controller:"registerAndLoginCtrl",controllerAs:"vm"}).when("/Admin",{templateUrl:"App/html/adminPage.html",controller:"adminCtrl",controllerAs:"vm",resolve:{loadMyCtrl:["$ocLazyLoad",function(e){return e.load("App/js/uwefvyACodfiusge.js")}],checkRoleValidation:["checkRole","$location",function(e,o){if(0!=e.getARole().$$state.value)return!0;o.path("/Login")}]}}).when("/AdminCreate",{templateUrl:"App/html/adminCreate.html",controller:"adminCreateCtrl",controllerAs:"vm",resolve:{checkRoleValidation:["checkRole","$location",function(e,o){if(0!=e.getARole().$$state.value)return!0;o.path("/Login")}]}}).when("/ForgotPassword",{templateUrl:"App/html/forgotPasswordPage.html",controller:"forgotPassCtrl",controllerAs:"vm"}).when("/RecoverPassword/:userId/:code",{templateUrl:"App/html/restorePasswordPage.html",controller:"recoverPassCtrl",controllerAs:"vm"}).when("/ChangePassword",{templateUrl:"App/html/changePasswordPage.html",controller:"changePswCtrl",controllerAs:"vm",resolve:{checkRoleValidation:["checkRole","$location",function(e,o){if(0!=e.getAURole().$$state.value)return!0;o.path("/Login")}]}}).when("/ConfirmEmail/:userId/:code",{templateUrl:"App/html/confirmMail.html",controller:"confirmMailCtrl",controllerAs:"vm"}).when("/User",{templateUrl:"App/html/userPage.html",controller:"userCtrl",controllerAs:"vm",resolve:{loadMyCtrl:["$ocLazyLoad",function(e){return e.load("App/js/dfgsihsdfUCaergdstd.js")}],checkRoleValidation:["checkRole","$location",function(e,o){if(0!=e.getAURole().$$state.value)return!0;o.path("/Login")}]}}).otherwise({redirectTo:"/"})}]).factory("checkRole",["$q","currentUser",function(e,o){return{getARole:function(){var r=e.defer();return null!=o.getProfile()&&o.getProfile().isLoggedIn&&"Admin"===o.getProfile().role?(r.resolve(!0),r.promise):(r.resolve(!1),r.promise)},getAURole:function(){var r=e.defer();return null==o.getProfile()||!o.getProfile().isLoggedIn||"Admin"!==o.getProfile().role&&"User"!==o.getProfile().role?(r.resolve(!1),r.promise):(r.resolve(!0),r.promise)}}}]).factory("currentUser",function(){var e={isLoggedIn:!1,username:"",role:"",confirm:""};return{setProfile:function(o,r,t,l){e.username=o,e.isLoggedIn=r,e.role=t,e.confirm=l,sessionStorage.setItem("profile",JSON.stringify(e))},getProfile:function(){return JSON.parse(sessionStorage.getItem("profile"))}}}).controller("userInfo",["currentUser","$scope","$location","scm",function(e,o,r,t){function l(e){e.target==n&&(n.style.display="none",window.removeEventListener("click",l))}o.displayLogOut=!1,o.$watch(function(){if(null!=e.getProfile())return e.getProfile().username},function(e,r){null!=e&&(o.cUser=e,o.displayLogOut=!0)}),o.$watch(function(){if(null!=e.getProfile())return e.getProfile().role},function(e,r){null!=e&&(o.currentRole=e)}),o.$watch(function(){if(null!=e.getProfile())return e.getProfile().confirm},function(e,r){null!=e&&(o.confirm=e)}),o.logOut=function(){sessionStorage.clear(),o.cUser="",o.displayLogOut=!1,r.path("/")},o.changePass=function(){r.path("/ChangePassword")},o.newConfirmMail=function(){t.get(function(e){}),window.addEventListener("click",l),n.style.display="block"};var n=document.getElementById("sendConfirmModal");o.exitModal=function(){n.style.display="none",window.removeEventListener("click",l)}}])}();