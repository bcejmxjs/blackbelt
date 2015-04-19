//user spec

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

	// <--- purchaseModal items --->

	this.purchaseModal = function() {
		return element(by.className('modal-content'));
	}

	this.purchaseModal_btnClose = function() {
		return this.purchaseModal()
		.element(by.className('modal-footer'))
		.element(by.id('cancel'));
	}

	this.purchaseModal_btnSubmit = function() {
		return this.purchaseModal()
		.element(by.className('modal-footer'))
		.element(by.id('submit'));
	}

	this.purchaseModal_btnTestPurchase = function() {
		return this.purchaseModal()
		.element(by.className('modal-footer'))
		.element(by.id('test'));
	}

	this.purchaseModal_title = function() {
		return this.purchaseModal()
		.element(by.className('modal-header'))
		.getText();
	}

	this.purchaseModal_nameField = function() {
		return this.purchaseModal()
		.element(by.className('modal-body'))
		.element(by.id('purchase_name'));
	}

	this.purchaseModal_cardField = function() {
		return this.purchaseModal()
		.element(by.className('modal-body'))
		.element(by.id('purchase_card'));
	}

	this.purchaseModal_expiryField = function() {
		return this.purchaseModal()
		.element(by.className('modal-body'))
		.element(by.id('purchase_expiry'));
	}

	this.purchaseModal_cvcField = function() {
		return this.purchaseModal()
		.element(by.className('modal-body'))
		.element(by.id('purchase_cvc'));
	}

	// <--- purchaseModal actions --->

	this.purchaseModal_open = function(ind) {
		this.btn_purchase(ind).click();
	}

	this.purchaseModal_close = function() {
		this.purchaseModal_btnClose.click();
	}

	this.purchaseModal_setName = function(text) {
		this.purchaseModal_nameField().sendKeys(text);
	}

	this.purchaseModal_setCard = function(text) {
		this.purchaseModal_cardField().sendKeys(text);
	}

	this.purchaseModal_setExpiry = function(text) {
		this.purchaseModal_expiryField().sendKeys(text);
	}

	this.purchaseModal_setCvc = function(text) {
		this.purchaseModal_cvcField().sendKeys(text);
	}

	this.purchaseModal_testPurchase = function() {
		this.purchaseModal_btnTestPurchase().click();
	}

	this.purchaseModal_submit = function() {
		this.purchaseModal_btnSubmit().click();
	}
}

var coursePage = new CoursePage();
describe('Course page as user', function() {
	it('Initialize test', function() {
		browser.waitForAngular();
		coursePage.get();
		console.log('If tests fail, ensure grunt mongo:load has been run');
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
	//	User has one course, not purchased
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

	describe('Clicking purchased course header', function() {
		it('Third lesson should be purchased && Kenpo 1', function() {
			expect(
				coursePage.course_title(2)
				.getText())
			.toBe('Kenpō 1');
		});
		it('Do click', function() {
			//Reliant on third course being
			coursePage.course_title(2).click();
		});
		it('Sh- direct to a lesson page', function() {
			expect(
				browser.getCurrentUrl())
			.toContain(browser.baseUrl + '/#!/course/');
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
	
});