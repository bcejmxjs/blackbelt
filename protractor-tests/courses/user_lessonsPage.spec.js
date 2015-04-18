//user_lessonsPage

//Work in progress
//This spec will test the lesson page functionality
//For use after purchasing a course

var CoursePage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/courses');
	}

	this.course_title = function(ind) {
		return element.all(by.repeater('course in courses'))
			.get(ind)
			.element(by.tagName('h1'))
			.element(by.tagName('a'));
	}

}