/*
user_lessonsPage

Work in progress
This spec will test the lesson page functionality
Accessible after purchasing a course

<--- PROTRACTOR SPARK NOTES --->
LOOK AT OTHER TESTS FOR EXAMPLES

<--- Interacting with elements --->
Let EL be an element
EL.click() --> clicks the element
EL.getText() --> gets element text
	^ Use only for very specific elements
EL.isDisplayed() --> checks if element is visible
EL.sendKeys('text') --> types 'text' in the element
EL.element(by.tagName('a')) --> gets <a> tag element within EL 

<--- Describe --->
Shows up as white text in testing output
Helps inform tester what's being tested

describe('Something1', function() {
	You can nest these as much as you want
	it statements can go here
	describe('Something2 about something1', function() {
		it statements can go here
	});
});

<--- It statement --->
Shows up as green if successful
Shows up as red if it contains errors or failed expectations

Performing actions inside of it() statements is a best 
practice. This helps prevent the action from occuring
at some random ass time (asynchronously)

When in doubt, use 
console.log('test');
Within the spec to figure out when protractor executes
code in that location (test will show up in console)


it('Perform an action', function() {
	pageObject.doSomething();
});
it('Expect something to happen', function() {
	expect goes here
});

<--- Expect statement --->
Goes inside of an it() statement

I like to format them in the following way:
expect(
	pageObject.something()
	.somethingElse()
	.property())
.expectation();

Some properties are in the interacting with
elements section (.getText(), .isDisplayed() ..etc)

Some expectations:
	.toBe('Should be this')
	.toBeTruthy()
	.toBeFalsy()
	.toContain('Should contain this')

<--- Misc Important --->
console.log('test');
	logs 'test' in the console at current point

browser.sleep(5000);
	Pauses test for 5 seconds at current point

<--- Page Object --->
Below is a pageObject called coursePage
Basically just a place to organize functions
that interact with elements needed

var coursePage = new coursePage();
^ Lets you access the functions with
coursePage.function()
Idk how to make a js function static
And idc lol

*/
var CoursePage = function() {

	// <--- Courses page items --->

	// Returns course title (clickable <a>)
	this.course_title = function(ind) {
		return element.all(by.repeater('course in courses'))
			.get(ind)
			.element(by.tagName('h1'))
			.element(by.tagName('a'));
	}

	// Returns course purchase button
	this.btn_purchase = function(ind) { 
		return element.all(by.repeater('course in courses'))
		.get(ind)
		.element(by.id('purchase'));
	}

	// <--- Courses page actions --->

	// Gets the /courses page
	this.get = function() {
		browser.get(browser.baseUrl + '/#!/courses');
	}

	// Opens up purchase modal of course ind
	// And performs a test purchase
	this.testPurchase = function(ind) {
		this.btn_purchase(ind).click();
		this.purchaseModal_testPurchase();
	}

	// Opens up a lessons page
	// Will open up a course modal if course is unpurchased
	this.open_course = function(ind) {
		this.course_title(ind).click();
	}

	// <--- Purchase modal items --->

	// Returns the entire purchase modal
	// (Used in other purchase modal functions)
	this.purchaseModal = function() {
		return element(by.className('modal-content'));
	}

	// Returns purchase modal test purchase button
	this.purchaseModal_btnTestPurchase = function() {
		return this.purchaseModal()
		.element(by.className('modal-footer'))
		.element(by.id('test'));
	}

	// Returns the purchase modal title
	// Currently, this should be "Purchase Course"
	this.purchaseModal_title = function() {
		return this.purchaseModal()
		.element(by.className('modal-header'))
		.getText();
	}

	// <--- Purchase modal actions --->

	// Clicks the purchase modal test purchase button
	this.purchaseModal_testPurchase = function() {
		purchaseModal_btnTestPurchase().click();
	}

	// <--- Individual course page (lessons page) items --->

	// Returns entire lesson ind element
	// (Used for other lesson functions)
	this.lesson = function(ind) {
		return element.all(by.repeater('lesson in lessons'))
		.get(ind);
	}

	// Returns title of course page (lessons page)
	this.lessonsPage_title = function() {
		return element.all(by.tagName('h1'))
		.get(0);
	}

	// Returns clickable lesson title (<a> tag)
	// Just use lesson_click(ind) to perform click
	this.lesson_title = function(ind) {
		return lesson(ind)
		.element(by.className('panel-body'))
		.element(by.tagName('h1'))
		.element(by.tagName('a'));
	}

	// Returns element containing lesson description
	// !!! If lesson is completed, calling .getText() from here
	// Will have "Completed " at the end of the text
	this.lesson_description = function(ind) {
		return lesson(ind)
		.element(by.className('panel-footer clearfix'))
		.element(by.tagName('h4'));
	}

	// Returns the element containing the completed text
	// lesson_status(ind).isDisplayed() will return true
	// if completed text is visible
	// false otherwise
	this.lesson_status = function(ind) {
		return lesson_description(ind)
		.element(by.css('[data-ng-show="isLessonComplete(lesson)"]'));
	}

	// Returns div containing error text
	// .getText() should work to get error text
	// .isDisplayed() will return true if error is shown
	this.lesson_error = function(ind) {
		return element(by.binding('error'));
	}

	// <--- Individual course page (lessons page) actions --->

	// Clicks a lesson
	this.lesson_click = function(ind) {
		lesson_title(ind).click();
	}

	// <--- Individual lesson (iLesson) page items --->

	// Returns iLesson page title
	this.iLesson_title = function() {
		return element.all(by.tagName('h1'))
		.get(0);
	}

	// Returns iLesson description
	this.iLesson_description = function() {
		return element(by.tagName('h4'));
	}

	// Returns iLesson page upload button
	this.iLesson_uploadBtn = function() {
		return element(by.id('upload'));
	}

	// Returns iLesson modal (only works when open)
	this.iLesson_modal = function() {
		return element(by.className('modal-content'));
	}

	// Returns iLesson modal title
	this.iLesson_modal_title = function() {
		return this.iLesson_modal()
		.element(by.tagName('h4'))
		.element(by.tagName('b'));
	}

	// Returns iLesson modal link box
	this.iLesson_modal_linkBox = function() {
		return this.iLesson_modal()
		.element(by.id('link'));
	}

	// Returns iLesson modal submit button
	this.iLesson_modal_submitBtn = function() {
		return this.iLesson_modal()
		.element(by.id('submit'));
	}

	// <--- Individual lesson (iLesson) page actions --->

	// Clicks the upload response button
	this.iLesson_uploadResponse_click = function() {
		this.iLesson_uploadBtn().click();
	}

	// Sets the iLesson modal link box text to text
	this.iLesson_set_responseLinkText = function(text) {
		this.iLesson_modal_linkBox().sendKeys(text);
	}

	// Clicks iLesson modal submit button
	this.iLesson_modal_submit = function() {
		this.iLesson_modal_submitBtn().click();
	}

	// Uploads given response link
	this.iLesson_uploadResponse = function(response) {
		this.iLesson_uploadResponse_click();
		this.iLesson_set_responseLinkText(response);
		this.iLesson_modal_submit();
	}
}

// Tests go down here
var coursePage = new CoursePage();
describe('Lessons testing example', function() {
	it('Get courses page', function() {
		coursePage.get();
	});
	it('Sh- now be on courses page', function() {
		expect(
			browser.getCurrentUrl())
		.toBe(browser.baseUrl + '/#!/courses')
	});
});