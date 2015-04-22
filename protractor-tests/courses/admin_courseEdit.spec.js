//admin_courseEdit

var CoursePage = function() {

	// <--- coursePage items --->

	this.course_title = function(ind) {
		return element.all(by.repeater('course in courses'))
			.get(ind)
			.element(by.tagName('h1'))
			.element(by.tagName('a'));
	}

	this.course_description = function(ind) {
		return element.all(by.repeater('course in courses'))
			.get(ind)
			.element(by.className('panel-footer'))
			.element(by.tagName('h4'));
	}

	this.btn_edit = function(ind) {
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('edit'));
	}

	this.course_purchase = function(ind) { 
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('purchase'));
	}

	// <--- coursePage actions --->

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/courses');
	}

	this.edit_course = function(ind) {
		this.btn_edit(ind).click();
	}

	// <--- coursePage edit modal items --->
	this.editModal = function() {
		return element(by.className('modal-content'));
	}

	this.editModal_title = function() {
		return this.editModal()
		.element(by.className('modal-header'))
		.element(by.tagName('h3'));
	}

	this.editModal_nameField = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.id('name'));
	}

	this.editModal_descriptionField = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.id('description'));
	}

	this.editModal_priceField = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.id('price'));
	}

	this.editModal_instructorField = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.id('instructor'));
	}

	this.editModal_demoField = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.id('demo'));
	}

	this.editModal_styleDropdown = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.model('course.style'));
	}

	this.editModal_beltDropdown = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.model('course.belt.color'));
	}

	this.editModal_styleOption = function(style) {
		return this.editModal_styleDropdown()
		.element(by.cssContainingText('option', style));
	}

	this.editModal_beltOption = function(belt) {
		return this.editModal_beltDropdown()
		.element(by.cssContainingText('option', belt));
	}

	this.editModal_btnOK = function() {
		return this.editModal()
		.element(by.className('modal-footer'))
		.element(by.id('ok'));
	}

	this.editModal_btnCancel = function() {
		return this.editModal()
		.element(by.className('modal-footer'))
		.element(by.id('cancel'));
	}

	// <--- coursePage edit modal actions --->

	this.editModal_setName = function(name) {
		browser.sleep(500);
		this.editModal_nameField().clear();
		this.editModal_nameField().sendKeys(name);
	}

	this.editModal_setDescription = function(description) {
		browser.sleep(500);
		this.editModal_descriptionField().clear();
		this.editModal_descriptionField().sendKeys(description);
	}

	this.editModal_setPrice = function(price) {
		browser.sleep(500);
		this.editModal_priceField().clear();
		this.editModal_priceField().sendKeys(price);
	}

	this.editModal_setInstructor = function(instructor) {
		browser.sleep(500);
		this.editModal_instructorField().clear();
		this.editModal_instructorField().sendKeys(instructor);
	}

	this.editModal_setDemo = function(demo) {
		browser.sleep(500);
		this.editModal_demoField().clear();
		this.editModal_demoField().sendKeys(demo);
	}

	this.editModal_chooseStyleOption = function(ind) {
		browser.sleep(500);
		this.editModal_styleOption(ind).click();
	}

	this.editModal_chooseBeltOption = function(ind) {
		browser.sleep(500);
		this.editModal_beltOption(ind).click();
	}

	// <--- Methods needed for verifying edits --->
	this.signout = function() {
		element(by.id('profile_dropdown'))
		.element(by.className('dropdown')).click();

		element(by.className('dropdown-menu'))
		.element(by.linkText('Signout')).click();
	}
	this.admin_signin = function() {
		browser.get(browser.baseUrl + '/#!/signin');
		element(by.id('username')).sendKeys('admin');
		element(by.id('password')).sendKeys('adminuser');
		element(by.id('signin')).click();
	}
	this.user_signin = function() {
		browser.get(browser.baseUrl + '/#!/signin');
		element(by.id('username')).sendKeys('test');
		element(by.id('password')).sendKeys('testuser');
		element(by.id('signin')).click();
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
		.element(by.className('modal-body'))
		.element(by.tagName('h4'))
		.getText();
	}

	this.courseModal_instructor = function() {
		return this.courseModal()
		.element(by.className('modal-body'))
		.element(by.tagName('h5'))
		.getText();
	}

	this.courseModal_price = function() {
		return this.courseModal()
		.element(by.id('purchase'))
		.getText();
	}

	this.courseModal_clickPurchase = function() {
		this.courseModal()
		.element(by.id('purchase')).click();
	}
}

// Using course0 (first course)
var coursePage = new CoursePage();
var course0_title;
describe('Course Editing as Admin', function() {
	describe('Initial expectations', function() {
		it('Get course page', function() {
			coursePage.get();
			browser.waitForAngular();
		});
		it('Sh- have a course', function() {
			// This will fail if there is no course0
			course0_title = coursePage.course_title(0).getText().then(function(text) {
				course0_title = text;
				console.log('Course0 title: ' + course0_title);
			});
		});
	});
	describe('Edit modal', function() {
		it('Open course0 edit modal', function() {
			coursePage.edit_course(0);
		});
		it('Sh- pop up with edit modal', function() {
			expect(
				coursePage.editModal_title()
				.getText())
			.toBe('Edit ' + course0_title);
		});
		it('Modify name', function() {
			coursePage.editModal_setName('UhOh');
		});
		it('Close edit modal', function() {
			browser.sleep(500);
			coursePage.editModal_btnCancel().click();
		});
		it('Sh- not change course0 title', function() {
			browser.sleep(500);
			expect(
				coursePage.course_title(0)
				.getText())
			.toBe(course0_title);
		})
	});
	var test_title = 'Jewrate';
	var test_description = 'Pronounced jew + rot + ay';
	var test_price = '3.50';
	var test_instructor = 'Abraham Lincoln';
	var test_demo = 'aPxVSCfoYnU';
	var test_styleNum = 'Karate';
	var test_beltNum = 'Yellow';
	var test_courseNum = 0;
	describe('Editing course0', function() {
		describe('Make edits', function() {
			it('Click edit button', function() {
				coursePage.edit_course(0);
				browser.sleep(500);
			});
			it('Edit name', function() {
				coursePage.editModal_setName(test_title);
			});
			it('Edit description', function() {
				coursePage.editModal_setDescription(test_description);
			});
			it('Edit price', function() {
				coursePage.editModal_setPrice(test_price);
			});
			it('Edit instructor', function() {
				coursePage.editModal_setInstructor(test_instructor);
			});
			it('Change style', function() {
				coursePage.editModal_chooseStyleOption(test_styleNum);
			});
			it('Change belt', function() {
				coursePage.editModal_chooseBeltOption(test_beltNum);
			});
			it('Edit demo link', function() {
				coursePage.editModal_setDemo('https://www.youtube.com/watch?v=' + test_demo);
			});
			it('Submit edits', function() {
				browser.sleep(500);
				coursePage.editModal_btnOK().click();
				browser.sleep(500);
			});
		});
		describe('Verify edits admin-side', function() {
			it('Sh- modify course0 title', function() {
				expect(
					coursePage.course_title(0)
					.getText())
				.toBe(test_title);
			})
			it('Sh- modify course0 description', function() {
				expect(
					coursePage.course_description(0)
					.getText())
				.toBe(test_description);
			});
		});
		describe('Verify edits user-side', function() {
			it('Signout', function() {
				console.log('Multiple failures may imply belt/style problem');
				coursePage.signout();
				browser.sleep(500);
			});
			it('Signin as user', function() {
				coursePage.user_signin();
				browser.sleep(500);
			});
			it('Get courses page', function() {
				coursePage.get();
				browser.sleep(500);
			});
			it('Verify course title', function() {
				expect(
					coursePage.course_title(test_courseNum)
					.getText())
				.toBe(test_title);
			});
			it('Verify course description', function() {
				expect(
					//Courses have multiple footers for some reason
					element.all(by.repeater('course in courses'))
					.get(test_courseNum)
					.element(by.css('[data-ng-show="!isCoursePurchased(course._id)"]'))
					.getText())
				.toBe(test_description + '\n$' + test_price);
			});
			it('Verify price', function() {
				expect(
					coursePage.course_purchase(test_courseNum)
					.getText())
				.toBe('$' + test_price);
				browser.sleep(500);
			});
			it('Open course modal', function() {
				coursePage.course_title(test_courseNum).click();
				browser.sleep(500);
			});
			it('Verify modal title', function() {
				expect(
					coursePage.courseModal_title())
				.toBe(test_title);
			});
			it('Verify modal demo', function() {
				expect(
					coursePage.courseModal_videoLink())
				.toBe('https://www.youtube.com/embed/' + test_demo);
			});
			it('Verify modal description', function() {
				expect(
					coursePage.courseModal_description())
				.toBe(test_description);
			});
			it('Verify modal instructor', function() {
				expect(
					coursePage.courseModal_instructor())
				.toBe('Taught by ' + test_instructor);
			});
			it('Verify modal price', function() {
				expect(
					coursePage.courseModal_price())
				.toBe('$' + test_price);
			});
			it('Close modal', function() {
				coursePage.courseModal_close();
			});
			it('Signout user', function() {
				coursePage.signout();
			});
			it('Signin as admin', function() {
				coursePage.admin_signin();
			});
		});
	});
});