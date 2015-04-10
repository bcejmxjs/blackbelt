var SignInPage = function() {
	// Page object for the sign in page
	
	this.username_field = element(by.id('username'));
	this.password_field = element(by.id('password'));
	this.signin_btn = element(by.buttonText('Sign in'));

	var instructor = {
		username: 'instructor',
		password: 'instructoruser'
	};

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/signin');
	}

	// Input custom text into the username field
	this.setUsername = function(username) {
		this.username_field.sendKeys(username);
	};

	// Input custom text into password field
	this.setPassword = function(password) {
		this.password_field.sendKeys(password);
	};

	// Login as instructor
	this.instructor_signin = function() {
		this.setUsername(instructor.username);
		this.setPassword(instructor.password);
		this.signin_btn.click();
	};

};
describe('Instructor signin', function() {
	//--------------------------------------------------
	it('Do instructor sign in', function() {
		var signin = new  SignInPage();
		signin.get();
		signin.instructor_signin();
	});
	//--------------------------------------------------
	it('Sh- redirect to the admin dashboard', function() {
		expect(
			browser.getCurrentUrl())
		.toBe(browser.baseUrl + '/#!/admindashboard');
	});
	//--------------------------------------------------
	it('Sh- not allow access of sign in page', function() {
		browser.get(browser.baseUrl + '/#!/signin');
		expect(
			browser.getCurrentUrl())
		.toBe(browser.baseUrl + '/#!/');
	});
	//--------------------------------------------------
});