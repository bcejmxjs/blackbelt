//noAuth spec

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


	// <--- courseModal items --->

	this.courseModal = function() {
		return element(by.className('modal-content'));
	}

	this.courseModal_open = function(ind) {
		this.course_title(ind).click();
	}

	this.courseModal_btnClose = function() {
		return this.courseModal()
		.element(by.id('close'));
	}

	this.courseModal_close = function() {
		this.courseModal_btnClose().click();
	}

	this.courseModal_title = function() {
		return this.courseModal()
		.element(by.className('modal-header'))
		.element(by.tagName('h3'))
		.getText();
	}

	this.courseModal_videoLink = function() {
		return this.courseModal()
		.element(by.tagName('iframe'))
		.getAttribute('src');
	}

	this.courseModal_description = function() {
		return this.courseModal()
		.element.all(by.css('.list-group li'))
		.get(0).getText();
	}

	this.courseModal_instructor = function() {
		return this.courseModal()
		.element.all(by.css('.list-group li'))
		.get(1).getText();
	}

	this.courseModal_price = function() {
		return this.courseModal()
		.element.all(by.css('.list-group li'))
		.get(2).element(by.tagName('b')).getText();
	}

	this.courseModal_clickPurchase = function() {
		this.courseModal()
		.element(by.id('purchase')).click();
	}
}

var coursePage = new CoursePage();
var course0_title;
describe('Course page as noAuth user', function() {
	describe('/create page', function() {
		it('Sh- not be accessible', function() {
			browser.get(browser.baseUrl + '/#!/courses/create');
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/courses');
		});
	});
	describe('/course/ page', function () {
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
			browser.get(browser.baseUrl + '/#!/course/NEVERGONNAGIVEYOUUP');
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/error/course');
		});
	});
	describe('Accessing /courses/~', function() {
		it('Sh- redirect to /courses', function() {
			browser.get(browser.baseUrl + '/#!/courses/~');
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/courses');
		});
	});
	describe('Add course button', function() {
		it('Sh- not be visible', function() {
			coursePage.get();
			expect(
				coursePage.btn_addCourse()
				.isDisplayed())
			.toBeFalsy();
		});
	});
	// ASSUMPTION:
	//	There is >= 1 course viewable by noAuth user
	// 	Otherwise, tests will fail
	describe('Course0 edit button', function() {
		it('Sh- not be visible', function() {
			expect(
				coursePage.btn_edit(0)
				.isDisplayed())
			.toBeFalsy();
		});
	});
	describe('Course0 delete button', function() {
		it('Sh- not be visible', function() {
			expect(
				coursePage.btn_delete(0)
				.isDisplayed())
			.toBeFalsy();
		});
	});
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
	describe('Course0 courseModal', function() {
		it('Open courseModal', function() {
			coursePage.get();
			course0_title = coursePage.course_title(0).getText().then(function(text) {
				course0_title = text;
			});
			coursePage.courseModal_open(0);
		});
		describe('courseModal0 title', function(){
			it('Sh- match the h1 title text for course0', function() {
				expect(
					coursePage.courseModal_title())
				.toBe(course0_title);
			});
		});
		describe('Click courseModal purchase', function() {
			it('Perform click', function() {
				coursePage.courseModal_clickPurchase();
			});
			it('Sh- direct to signin page', function() {
				expect(
					browser.getCurrentUrl())
				.toBe(browser.baseUrl + '/#!/signin');
			});
		});
	});
});