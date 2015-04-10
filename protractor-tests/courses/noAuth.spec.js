//noAuth spec

var CoursePage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/courses');
	}

	this.btn_addCourse = function() {
		return element(by.buttonText('Add New Course'));
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
		.element(by.buttonText('Purchase'));
	}
	this.btn_edit = function(ind) {
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.buttonText('Edit'));
	}
	this.btn_delete = function(ind) {
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.buttonText('Delete'));
	}


	// <--- Modal items --->

	this.modal = function() {
		return element(by.className('modal-content'));
	}
	this.modal_open = function(ind) {
		this.course_title(ind).click();
	}
	this.modal_btnClose = this.modal()
		.element(by.id('exit'));

	this.modal_close = function() {
		this.modal_btnClose.click();
	}
	this.modal_title = function() {
		return this.modal()
		.element(by.className('modal-header'))
		.element(by.tagName('h3'))
		.getText();
	}

	this.modal_videoLink = function() {
		return this.modal()
		.element(by.tagName('iframe'))
		.getAttribute('src');
	}
	this.modal_description = function() {
		return this.modal()
		.element.all(by.css('.list-group li'))
		.get(0).getText();
	}
	this.modal_instructor = function() {
		return this.modal()
		.element.all(by.css('.list-group li'))
		.get(1).getText();
	}
	this.modal_price = function() {
		return this.modal()
		.element.all(by.css('.list-group li'))
		.get(2).element(by.tagName('b')).getText();
	}

	this.modal_clickPurchase = function() {
		this.modal()
		.element(by.buttonText('Purchase')).click();
	}
};

describe('Course page as noAuth user', function() {
	var coursePage = new CoursePage();
	it('Initialize test', function() {
		coursePage.get();
	});
	describe('Add course button', function() {
		it('Sh- not be visible', function() {
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
	describe('/create page', function() {
		it('Sh- not be accessible', function() {
			coursePage.get();
			browser.get(browser.baseUrl + '/#!/courses/create');
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/courses');
		});
	});
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
	describe('Course0 modal', function() {
		it('Open modal', function() {
			coursePage.get();
			coursePage.modal_open(0);
		});
		describe('Modal0 title', function(){
			it('Sh- match the h1 title text for course0', function() {
				expect(
					coursePage.modal_title())
				.toBe('Karate');
			});
		});
		describe('Click modal purchase', function() {
			it('Perform click', function() {
				coursePage.modal_clickPurchase();
			});
			it('Sh- direct to signin page', function() {
				expect(
					browser.getCurrentUrl())
				.toBe(browser.baseUrl + '/#!/signin');
			});
		});
	});
});