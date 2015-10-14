(function() {
    angular
        .module('App', ['ngMessages', 'ui.bootstrap', 'LocalStorageModule'])
        .controller('MainController', MainController);

    function MainController(localStorageService) {
        var vm = this;

        vm.formData = {};
        vm.pattern = /^\+380\ ?\d{2}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$|^0\ ?\d{2}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
        vm.sortType = 'firstname';
        vm.sortReverse  = false;
        vm.saved = localStorageService.get('users');
        vm.users = (localStorageService.get('users') !== null) ? vm.saved : localStorageService.set('users', []);


        vm.save = function() {
            vm.formData.phone = vm.formData.phone.replace(/[- ]/g, "");
            vm.formData.firstname = capitalize(vm.formData.firstname);
            vm.formData.lastname = capitalize(vm.formData.lastname);

            vm.users.push(vm.formData);
            localStorageService.set('users', vm.users);
            //reset form
            vm.formData = {};
            vm.form.$setPristine();
            vm.form.$setUntouched();
        };

        vm.remove = function(user) {
            var index = vm.users.indexOf(user);

            vm.users.splice(index, 1);
            localStorageService.set('users', vm.users);
        }

    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

})();