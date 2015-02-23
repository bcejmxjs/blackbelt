var SignInPage = function() {
	// Page object for the sign in page
	
	// This code is already fairly readable
	// 'this' references this function, the SignInPage
	// These are items on the sign in page:
	this.username_field = element(by.id('username'));
	this.password_field = element(by.id('password'));
	this.signin_btn = element(by.buttonText('Sign In'));

	this.user_un = 'test';
	this.user_pw = 'testuser';
	this.instructor_un = 'instructor';
	this.instructor_pw = 'instructoruser';
	this.admin_un = 'admin';
	this.admin_pw = 'adminuser';

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

});

describe('login as instructor', function() {

});

describe('login as admin', function() {

});
