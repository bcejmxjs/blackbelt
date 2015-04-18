//user_courseModal

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

	this.purchaseModal_title = function() {
		return this.purchaseModal()
		.element(by.className('modal-header'))
		.getText();
	}

	this.purchaseModal_close = function() {
		this.purchaseModal_btnClose.click();
	}
}

var coursePage = new CoursePage();
describe('Course0 modal as user', function() {
		it('Open modal', function() {
			coursePage.get();
			coursePage.courseModal_open(0);
		});
		describe('Modal0 title', function(){
			it('Sh- match the h1 title text for course0', function() {
				expect(
					coursePage.courseModal_title())
				.toBe('Jujitsu 1');
			});
		});
		it('Close modal', function() {
			coursePage.courseModal_close();
		});
		//This will purchase course0
		describe('Clicking modal purchase', function() {
			it('Reopen modal', function() {
				coursePage.courseModal_open(0);
			});
			it('Perform click', function() {
				coursePage.courseModal_clickPurchase();
			});
			it('Sh- open purchase modal', function() {
				expect(
					coursePage.purchaseModal_title()
					.getText())
				.toBe('Purchase Course');
			});
			it('Close purchase modal', function() {
				coursePage.purchaseModal_close();
			});
		});
	});