//instructor spec

var CoursePage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/courses');
	}

	this.btn_addCourse = function() {
		return element(by.id('add_course'));
	}

	// Course items
	this.course_title = function(ind) {
		return element.all(by.repeater('course in courses'))
			.get(ind)
			.element(by.tagName('h1'))
			.element(by.tagName('a'));
	}
	
	this.course_description = function(ind) {
		return element.all(by.repeater('course in courses'))
			.get(ind).element(by.tagName('h4'));
	}

	this.btn_purchase = function(ind) { 
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('purchase'));
	}

	this.btn_edit = function(ind) {
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('edit'));
	}

	this.btn_delete = function(ind) {
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('delete'));
	}
}

describe('Course page as instructor', function() {
	var coursePage = new CoursePage();
	it('Initialize test', function() {
		browser.waitForAngular();
		coursePage.get();
	});
	describe('Add course button', function() {
		it('Sh- be visible', function() {
			expect(
				coursePage.btn_addCourse()
				.isDisplayed())
			.toBeTruthy();
		});
	});
	// ASSUMPTION:
	//	There is >= 1 course viewable by noAuth user
	// 	Otherwise, tests will fail
	describe('Course0 edit button', function() {
		it('Sh- be visible', function() {
			expect(
				coursePage.btn_edit(0)
				.isDisplayed())
			.toBeTruthy();
		});
	});
	describe('Course0 delete button', function() {
		it('Sh- be visible', function() {
			expect(
				coursePage.btn_delete(0)
				.isDisplayed())
			.toBeTruthy();
		});
	});
	/*
	describe('Clicking purchase', function() {
		it('Perform click', function() {
			coursePage.btn_purchase(0).click();
		});
		it('Sh- direct to signin page', function() {
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/signin');
		});
	});
	*/
	describe('/course/ page',function () {
		it('Sh- direct to course error page', function() {
			//Assuming user will be directed to course error page
			browser.get(browser.baseUrl + '/#!/course/');
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/error/course');
		});
	});
	describe('Accessing invalid course id', function() {
		it('Sh- direct to course error page', function() {
			coursePage.get();
			browser.get(browser.baseUrl + '/#!/course/NEVERGONNAGIVEYOUUP');
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/error/course');
		});
	});
	//Add lesson page testing here
});