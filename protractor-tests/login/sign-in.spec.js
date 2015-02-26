var SignInPage = function() {
	// Page object for the sign in page
	
	// This code is already fairly readable
	// 'this' references this function, the SignInPage
	// These are items on the sign in page:
	this.username_field = element(by.id('username'));
	this.password_field = element(by.id('password'));
	this.signin_btn = element(by.buttonText('Sign in'));

	var admin = {
		username: 'admin',
		password: 'adminuser'
	};
	var instructor = {
		username: 'instructor',
		password: 'instructoruser'
	};
	var basic = {
		username: 'test',
		password: 'testuser'
	};

	// SignInPage.get will get the page
	this.get = function() {
		browser.get('/#!/signin');
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
		this.setUsername(basic.username);
		this.setPassword(basic.password);
		this.signin_btn.click();
	};

	// Login as instructor
	this.instructor_signin = function() {
		this.setUsername(instructor.username);
		this.setPassword(instructor.password);
		this.signin_btn.click();
	};

	// Login as admin
	this.admin_signin = function() {
		this.setUsername(admin.username);
		this.setPassword(admin.password);
		this.signin_btn.click();
	};

};

describe('login as user', function() {
	var signin = new SignInPage();
	it('Should be called Sign In', function() {
		signin.get();
		expect(browser.getTitle()).toBe('Sign In');
	});
	it('should redirect to the home page', function() {
		signin.user_signin();
		expect(browser.getCurrentUrl()).toBe(browser.baseUrl);
	});

	// I still don't know how to access the element without an id
	// So I just added an id
	it('should show the user profile nav option', function() {
		expect(browser.findElement(by.id('profile_dropdown')).isDisplayed()).toBeTruthy();
	});
});

describe('login as instructor', function() {

});

describe('login as admin', function() {

});
