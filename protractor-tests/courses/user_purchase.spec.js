//user_purchase

var CoursePage = function() {

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/courses');
	}

	this.btn_purchase = function(ind) { 
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('purchase'));
	}

	this.course_title = function(ind) {
		return element.all(by.repeater('course in courses'))
			.get(ind)
			.element(by.tagName('h1'))
			.element(by.tagName('a'));
	}

	// <--- purchaseModal items --->

	this.purchaseModal = function() {
		return element(by.className('modal-content'));
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

	// <--- courseModal items --->

	this.courseModal = function() {
		return element(by.className('modal-content'));
	}

	this.courseModal_open = function(ind) {
		this.course_title(ind).click();
	}

	this.courseModal_clickPurchase = function() {
		this.courseModal()
		.element(by.id('purchase')).click();
	}

	// <--- purchaseModal items --->

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
}

var coursePage = new CoursePage();
describe('Purchase course0 as user', function() {
	describe('Purchase course0 via purchase button', function() {
		it('Get courses page', function() {
			coursePage.get();
		});
		it('Click course0 purchase button', function() {
			coursePage.btn_purchase(0).click();
		});
		it('Sh- open purchase modal', function() {
			expect(
				coursePage.purchaseModal_title()
				.getText())
			.toBe('Purchase Course');
		});
		it('Fill name', function() {
			coursePage.purchaseModal_setName('Testy McTesterson');
		});
		it('Fill card', function() {
			coursePage.purchaseModal_setCard('5555555555554444');
		});
		it('Fill expiry', function() {
			coursePage.purchaseModal_setExpiry('07/17');
		});
		it('Fill CVC', function() {
			coursePage.purchaseModal_setCvc('123');
			browser.sleep(1000);
		});
		it('Perform course0 test purchase', function() {
			coursePage.purchaseModal_testPurchase();
		});
		it('Sh- still be on courses page', function() {
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/courses');
		});
		it('Sh- make the course0 purchase button disappear', function() {
			expect(
				coursePage.btn_purchase(0)
				.isDisplayed())
			.toBeFalsy();
		});
	});
	describe('Purchase course1 via modal purchase button', function() {
		it('Open course1 modal', function() {
			coursePage.courseModal_open(1);
		});
		it('Click course1 modal purchase button', function() {
			coursePage.courseModal_clickPurchase();
		});
		it('Sh- open purchase modal', function() {
			expect(
				coursePage.purchaseModal_title()
				.getText())
			.toBe('Purchase Course');
		});
		it('Fill name', function() {
			coursePage.purchaseModal_setName('Testy McTesterson');
		});
		it('Fill card', function() {
			coursePage.purchaseModal_setCard('5555555555554444');
		});
		it('Fill expiry', function() {
			coursePage.purchaseModal_setExpiry('07/17');
		});
		it('Fill CVC', function() {
			coursePage.purchaseModal_setCvc('123');
			browser.sleep(1000);
		});
		it('Perform course1 test purchase', function() {
			coursePage.purchaseModal_testPurchase();
		});
		it('Sh- still be on courses page', function() {
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/courses');
		});
		it('Sh- make the course1 purchase button disappear', function() {
			expect(
				coursePage.btn_purchase(1)
				.isDisplayed())
			.toBeFalsy();
		});		
	});
});