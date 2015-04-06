'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        // Define Open Days
        $scope.martialArtStyles = [
            { name: 'Savate', 		url: 'http://en.wikipedia.org/wiki/Savate' }, 
            { name: 'Silat', 		url: 'http://en.wikipedia.org/wiki/Silat' }, 
            { name: 'Panantukan', 	url: 'http://en.wikipedia.org/wiki/Suntukan' }, 
            { name: 'Aikido', 		url: 'http://en.wikipedia.org/wiki/Aikido' }, 
            { name: 'JKD', 			url: 'http://en.wikipedia.org/wiki/Jeet_Kune_Do' }, 
            { name: 'Aikijujutsu', 	url: 'http://en.wikipedia.org/wiki/Dait%C5%8D-ry%C5%AB_Aiki-j%C5%ABjutsu' }, 
            { name: 'Karate', 		url: 'http://en.wikipedia.org/wiki/Karate' }, 
            { name: 'Jujitsu', 		url: 'http://en.wikipedia.org/wiki/Brazilian_jiu-jitsu' }, 
            { name: 'Chin-na', 		url: 'http://en.wikipedia.org/wiki/Chin_Na' }, 
            { name: 'Wing Chung', 	url: 'http://en.wikipedia.org/wiki/Wing_Chun' }, 
            { name: 'Wrestling', 	url: 'http://en.wikipedia.org/wiki/Wrestling' }, 
            { name: 'Judo', 		url: 'http://en.wikipedia.org/wiki/Judo' }, 
            { name: 'Iaido', 		url: 'http://en.wikipedia.org/wiki/Iaido' }, 
            { name: 'Kempo', 		url: 'http://en.wikipedia.org/wiki/Kenp%C5%8D' }, 
            { name: 'Ninjutsu', 	url: 'http://en.wikipedia.org/wiki/Ninjutsu' }, 
            { name: 'TKD', 			url: 'http://en.wikipedia.org/wiki/Taekwondo' }, 
            { name: 'Kickboxing', 	url: 'http://en.wikipedia.org/wiki/Kickboxing' }, 
            { name: 'Kendo', 		url: 'http://en.wikipedia.org/wiki/Kendo' }, 
            { name: 'Boxing East', 	url: '' }, 
            { name: 'Boxing West', 	url: '' }, 
            { name: 'Kali', 		url: 'http://en.wikipedia.org/wiki/Kali' }, 
            { name: 'Escrima', 		url: 'http://en.wikipedia.org/wiki/Eskrima' }, 
            { name: 'Kung Fu', 		url: 'http://en.wikipedia.org/wiki/Chinese_martial_arts' }, 
            { name: 'Weaponry', 	url: 'http://en.wikipedia.org/wiki/Weapon' }, 
            { name: 'Swordsmanship',url: 'http://en.wikipedia.org/wiki/Swordsmanship' }, 
            { name: 'Krav Maga', 	url: 'http://en.wikipedia.org/wiki/Krav_Maga' }
        ];

    }
]);