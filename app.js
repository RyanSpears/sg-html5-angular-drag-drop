
(function(){

    var app = angular.module('my-app', []);

    app.directive('draggable', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element[0].addEventListener('dragstart', scope.handleDragStart, false);
                element[0].addEventListener('dragend', scope.handleDragEnd, false);
            }
        }
    });

    app.directive('droppable', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element[0].addEventListener('drop', scope.handleDrop, false);
                element[0].addEventListener('dragover', scope.handleDragOver, false);
            }
        }
    });

    app.controller('MainController', function($scope){
        $scope.printers = [
            { name: "Printer 1", id: 1 },
            { name: "Printer 2", id: 2 },
            { name: "Printer 3", id: 3 }
        ];

        $scope.devices = [
            { name: "Device 1", id: 4 },
            { name: "Device 2", id: 5 },
            { name: "Device 3" , id: 6 }
        ];

        $scope.items = [];

        $scope.handleDragStart = function(e){
            console.log('started dragging ' + e.currentTarget.id);
            this.style.opacity = '0.4';
            e.dataTransfer.setData('text/plain', this.innerHTML);
        };

        $scope.handleDragEnd = function(e){
            this.style.opacity = '1.0';
        };

        $scope.handleDrop = function(e){
            e.preventDefault();
            e.stopPropagation();
            console.log('dropped into ' + e.currentTarget.id);
            var dataText = e.dataTransfer.getData('text/plain');
            $scope.$apply(function() {
                $scope.items.push(dataText);
            });
        };

        $scope.handleDragOver = function (e) {
            e.preventDefault(); // Necessary. Allows us to drop.
            e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
            return false;
        };

        $scope.sayHi = function() {
            alert('Hi!');
        };
    })

})();