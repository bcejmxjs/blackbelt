//no_auth spec

var CoursePage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/courses');
	};

	this.btn_addCourse = function() {
		return element(by.buttonText('Add New Course'));
	};

	// Course items
	this.course_title = function(ind) {
		return element.all(by.repeater('course in coursesCtrl.courses'))
			.get(ind).element(by.tagName('h1'));
	};
	this.course_description = function(ind) {
		return element.all(by.repeater('course in coursesCtrl.courses'))
			.get(ind).element(by.tagName('h4'));
	};
	this.click_purchase = function(ind) {
		element.all(by.repeater('course in coursesCtrl.courses'))
		.get(ind).element(by.buttonText('Purchase'))
		.click();
	};
};

var Modal = function(h1_title) {

	this.btnClose = element(by.className('modal-content')
		.element(by.id('exit'));

	this.modal_title = element(by.className('modal-content')
		.element(by.tagName('h3'))
		.getText();

	this.videoLink = element(by.className('modal-content')
		.element(by.tagName('iframe'))
		.getAttribute('src');

	this.modal_description = element.all(by.css('.list-group li'))
		.get(0).getText();
	this.modal_instructor = element.all(by.css('.list-group li'))
		.get(1).getText();
	this.modal_price = element.all(by.css('.list-group li'))
		.get(2).element(by.tagname('b')).getText();

	this.modal_click_purchase = function(ind) {
		this.modal_price = element.all(by.css('.list-group li'))
		.get(2).element(by.buttonText('Purchase')).click();
	}

	this.open = function() {
		h1_title.click();
	};
	this.close = function() {
		btnClose.click();
	};
}