	var user_un = 'test';
	var user_pw = 'testuser';
	var instructor_un = 'instructor';
	var instructor_pw = 'instructoruser';
	var admin_un = 'admin';
	var admin_pw = 'adminuser';

var SignInPage = function() {
	// Page object for the sign in page
	
	// This code is already fairly readable
	// 'this' references this function, the SignInPage
	// These are items on the sign in page:
	this.username_field = element(by.id('username'));
	this.password_field = element(by.id('password'));
	this.signin_btn = element(by.buttonText('Sign in'));

	// SignInPage.get will get the page
	this.get = function() {
		browser.get('http://localhost:3000/#!/signin')
	};

	// Input custom text into the username field
	this.setUsername = function(username) {
		this.username_field.sendKeys(username);
	};

	// Input custom text into password field
	this.setPassword = function(password) {
		this.password_field.sendKeys(password);
	};

	// Login as user
	this.user_signin = function() {
		this.setUsername(user_un);
		this.setPassword(user_pw);
		this.signin_btn.click();
	};

	// Login as instructor
	this.instructor_signin = function() {
		this.setUsername(instructor_un);
		this.setPassword(instructor_pw);
		this.signin_btn.click();
	};

	// Login as admin
	this.admin_signin = function() {
		this.setUsername(admin_un);
		this.setPassword(instructor_pw);
		this.signin_btn.click();
	};

};

describe('login as user', function() {
	it('should redirect to the home page', function() {
		var signin_page = new SignInPage();
		signin_page.get();
		signin_page.user_signin();
		expect(browser.getLocationAbsUrl()).toBe('http://localhost:3000/#!/');
	});

	// I had to comment this out because I still can't figure out how to properly translate
	// The user profile nav element should be visible
	// Into a test
	// Should be able to select the element somehow
	// Then see that it's visible or invisible
	//it('should show the user profile nav option', function() {
		
		//var navElement = browser.findElement(protractor.By.className('nav navbar-nav navbar-right'));
		//var navElement = select the nav element somehow
		//expect(navElement.isDisplayed()).toBeTruthy();
	//});
});

describe('login as instructor', function() {

});

describe('login as admin', function() {

});
