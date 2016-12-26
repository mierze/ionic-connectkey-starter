function MainController($state) {
    var $ctrl = this;
    //binding functions
    $ctrl.goHome = goHome;
    //binding vars
    $ctrl.title = 'Main Page';

    function goHome() {
        $state.go('home');
    }
}
