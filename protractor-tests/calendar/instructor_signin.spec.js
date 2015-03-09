// signin as instructor

var SignInPage = function() {
	// Page object for the sign in page

	this.username_field = element(by.id('username'));
	this.password_field = element(by.id('password'));
	this.signin_btn = element(by.buttonText('Sign in'));

	var info = {
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

	// Sign in
	this.do_signin = function() {
		this.setUsername(info.username);
		this.setPassword(info.password);
		this.signin_btn.click();
	};
};

describe('Signin as instructor', function() {
	it('Do signin', function() {
		var signin = new SignInPage();
		signin.get();
		signin.do_signin();
	});
});