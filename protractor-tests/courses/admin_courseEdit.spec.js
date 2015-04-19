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
			.get(ind).element(by.tagName('h4'));
	}

	this.btn_edit = function(ind) {
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('edit'));
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

	this.editModal_styleOption = function(ind) {
		return this.editModal_styleDropdown()
		.element.all(by.tagName('option'))
		.get(ind);
	}

	this.editModal_beltDropdown = function() {
		return this.editModal()
		.element(by.className('modal-body'))
		.element(by.model('course.belt.color'));
	}

	this.editModal_beltOption = function(ind) {
		return this.editModal_beltDropdown()
		.element.all(by.tagName('option'))
		.get(ind);
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
		this.editModal_nameField().clear();
		this.editModal_nameField().sendKeys(name);
	}

	this.editModal_setDescription = function(description) {
		this.editModal_descriptionField().clear();
		this.editModal_descriptionField().sendKeys(description);
	}

	this.editModal_setPrice = function(price) {
		this.editModal_priceField().clear();
		this.editModal_priceField().sendKeys(price);
	}

	this.editModal_setInstructor = function(instructor) {
		this.editModal_instructorField().clear();
		this.editModal_instructorField().sendKeys(instructor);
	}

	this.editModal_setDemo = function(demo) {
		this.editModal_demoField().clear();
		this.editModal_demoField().sendKeys(demo);
	}

	this.editModal_openStyleDropdown = function() {
		this.editModal_styleDropdown().click();
	}

	this.editModal_chooseStyleOption = function(ind) {
		this.editModal_openStyleDropdown();
		this.editModal_styleOption(ind).click();
	}

	this.editModal_openBeltDropdown = function() {
		this.editModal_beltDropdown().click();
	}

	this.editModal_chooseBeltOption = function(ind) {
		this.editModal_openBeltDropdown();
		this.editModal_beltOption(ind).click();
	}

	this.editModal_clickOK = function() {
		this.editModal_btnOK().click();
	}

	this.editModal_close = function() {
		this.editModal_btnCancel().click();
	}
}

var coursePage = new CoursePage();
var course0_title = '';
describe('Course Editing as Admin', function() {
	describe('Initial expectations', function() {
		it('Get course page', function() {
			coursePage.get();
		});
		it('Sh- have a course', function() {
			// This will fail if there is no course0
			course0_title = coursePage.course_title(0).getText();
			console.log('Course0 title: ' + coursePage.course_title(0).getText())
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
			coursePage.editModal_close();
		});
		it('Sh- not change course0 title', function() {
			expect(
				coursePage.course_title(0)
				.getText())
			.toBe(course0_title);
		})
	});
	describe('Editing course0', function() {
		it('Click edit button', function() {
			coursePage.edit_course(0);
		});
		it('Edit course0 name', function() {
			coursePage.editModal_setName('Jewrate');
		});
		it('Edit course0 description', function() {
			coursePage.editModal_setDescription('Pronounced jew + rot + ay');
		});
		it('Submit edit', function() {
			coursePage.editModal_clickOK();
		});
		it('Sh- modify course0 title', function() {
			expect(
				coursePage.course_title(0)
				.getText())
			.toBe('Jewrate');
		})
		it('Sh- modify course0 description', function() {
			expect(
				coursePage.course_description(0)
				.getText())
			.toBe('Pronounced jew + rot + ay');
		});
	});
});