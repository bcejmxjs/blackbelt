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
		this.purchaseModal_btnTestPurchase().click();
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
		return this.lesson(ind)
		.element(by.className('panel-body'))
		.element(by.tagName('h1'))
		.element(by.tagName('a'));
	}

	// Returns element containing lesson description
	// !!! If lesson is completed, calling .getText() from here
	// Will have "Completed " at the end of the text
	this.lesson_description = function(ind) {
		return this.lesson(ind)
		.element(by.className('panel-footer'))
		.element(by.tagName('h4'));
	}

	// Returns the element containing the completed text
	// lesson_status_complete(ind).isDisplayed() will return true
	// if completed text is visible
	// false otherwise
	this.lesson_status_complete = function(ind) {
		return this.lesson_description(ind)
		.element(by.css('[data-ng-show="isLessonComplete(lesson)"]'));
	}

	// Returns the element containing the completed text
	// lesson_status_pending(ind).isDisplayed() will return true
	// if completed text is visible
	// false otherwise
	this.lesson_status_pending = function(ind) {
		return this.lesson_description(ind)
		.element(by.css('[data-ng-show="isLessonPending(lesson)"]'));
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
		this.lesson_title(ind).click();
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
	// Returns iLesson video object
	this.iLesson_video = function() {
		return element(by.tagName('videogular'));
	}
	
	// Returns iLesson play button
	this.iLesson_playBtn = function() {
		return this.iLesson_video()
		.element(by.className('controls-container'))
		.element(by.css('[ng-click="onClickPlayPause()"]'));
	}
	// Clicks iLesson play button
	this.iLesson_play_btnclick = function() {
		 this.iLesson_playBtn().click();
	}
	// Returns iLesson fullscreen button
	this.iLesson_fullscreenBtn = function() {
		return this.iLesson_video()
		.element(by.className('controls-container'))
		.element(by.css('[ng-click="onClickFullScreen()"]'));
	}
	// Clicks iLesson fullscreen button
	this.iLesson_fullscreen_btnClick = function() {
		this.iLesson_fullscreenBtn().click();
	}
	// Returns iLesson page upload button
	this.iLesson_uploadBtn = function() {
		return element(by.id('upload'));
	}

	// Returns iLesson modal (only works when open)
	this.iLesson_modal = function() {
		return element(by.className('modal-dialog'));
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
var lessonPage = new CoursePage();
describe('Lessons page as user', function() {
	it('Get courses page', function() {
		lessonPage.get();
	});
	it('Click on Kenpo 1', function() {
			//Reliant on third course being
			lessonPage.course_title(2).click();
		});
	describe('Check each lesson existence', function() {
		it('Blocking exists', function() {
			expect(
				lessonPage.lesson_title(0)
				.getText())
			.toBe('Blocking');
		});
		it('Kicking exists', function() {
			expect(
				lessonPage.lesson_title(1)
				.getText())
			.toBe('Kicking');
		});
		it('Punching exists', function() {
			expect(
				lessonPage.lesson_title(2)
				.getText())
			.toBe('Punching');
		});
	});
	describe('Check for Initial Lesson Statuses', function() {
		it('Sh- be visible', function() {
			expect(
				lessonPage.lesson_status_complete(0)
				.isDisplayed())
			.toBeTruthy();
		});
		it('Sh- not be visible', function() {
			expect(
				lessonPage.lesson_status_complete(1)
				.isDisplayed())
			.toBeFalsy();
		});
		it('Sh- not be visible', function() {
			expect(
				lessonPage.lesson_status_complete(2)
				.isDisplayed())
			.toBeFalsy();
		});
	});
	describe('Check for Proper Descriptions', function() {
		it('Blocking description', function() {
			expect(
				lessonPage.lesson_description(0)
				.getText())
			.toContain('Learn how to block!');
		});
		it('Kicking description', function() {
			expect(
				lessonPage.lesson_description(1)
				.getText())
			.toBe('Learn how to kick!');
		});
		it('Punching description', function() {
			expect(
				lessonPage.lesson_description(2)
				.getText())
			.toBe('Learn how to punch!');
		});
	});
	describe('Test Kicking page', function() {
		it('Do click', function() {
			lessonPage.lesson_click(1);
		});
		it('Check title', function() {
			expect(
				lessonPage.iLesson_title()
				.getText())
			.toBe('Kicking');
		});
		it('Check description', function() {
			expect(
				lessonPage.iLesson_description()
				.getText())
			.toBe('Learn how to kick!');
		});
		it('Upload button sh- be visible', function() {
			expect(
				lessonPage.iLesson_uploadBtn()
				.isDisplayed())
			.toBeTruthy();
		});
	});
	describe('Test Upload Button', function() {
		it('Do click', function() {
			lessonPage.iLesson_uploadResponse_click();
		});
		it('Title Sh- be visible', function() {
			expect(
				lessonPage.iLesson_modal_title().
				getText())
			.toBe('Video Link');
		});
		it('Submit button Sh- be visible', function() {
			expect(
				lessonPage.iLesson_modal_submitBtn()
				.isDisplayed())
			.toBeTruthy();
		});
		it('Enter video link', function() {
				lessonPage.iLesson_set_responseLinkText('https://youtu.be/zGktqHzu83c');
		});
		it('Submit response video', function() {
				lessonPage.iLesson_modal_submit();
		});
		it('Sh- be visible', function() {
			expect(
				lessonPage.lesson_status_pending(1)
				.isDisplayed())
			.toBeTruthy();
		});
	});
	describe('Test Video Functions', function() {
		it('Do click', function() {
			lessonPage.lesson_click(1);
		});
		it('Test play button', function() {
			expect(
				lessonPage.iLesson_playBtn()
				.getAttribute('class'))
			.toContain('play');
		});
		it('Do click', function() {
			lessonPage.iLesson_play_btnclick();
		});
		it('Test pause button', function() {
			expect(
				lessonPage.iLesson_playBtn()
				.getAttribute('class'))
			.toContain('pause');
		});
		it('Test fullscreen button', function() {
			expect(
				lessonPage.iLesson_fullscreenBtn()
				.getAttribute('class'))
			.toContain('enter');
		});
		it('Do click', function() {
			lessonPage.iLesson_fullscreen_btnClick();
		});
		it('Test un-fullscreen button', function() {
			expect(
				lessonPage.iLesson_fullscreenBtn()
				.getAttribute('class'))
			.toContain('exit');
		});
		it('Do click', function() {
			lessonPage.iLesson_fullscreen_btnClick();
		});
		it('Do click', function() {
			lessonPage.iLesson_play_btnclick();
		});
	});
	/*describe('User signout', function() {
		it('Perform signout', function() {
			// Click dropdown button
			element(by.id('profile_dropdown'))
			.element(by.className('dropdown')).click();
			// Click signout
			element(by.className('dropdown-menu'))
			.element(by.linkText('Signout')).click();
		});
	});
	var admin = {
		username: 'admin',
		password: 'adminuser'
	}

	describe('Signin as admin', function() {
		it('Do signin', function() {
			browser.get(browser.baseUrl + '/#!/signin');
			element(by.id('username')).sendKeys(admin.username);
			element(by.id('password')).sendKeys(admin.password);
			element(by.id('signin')).click();
		});
	});*/
});