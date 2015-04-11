// Signin as basic user
var SignInPage = function() {

	this.username_field = function() {
		return element(by.id('username'));
	};

	this.password_field = function() {
		return element(by.id('password'));
	};

	this.signin_btn = function() {
		return element(by.buttonText('Sign in'));
	};

	var user = {
		username: 'test',
		password: 'testuser'
	};

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/signin');
	}

	// Input custom text into the username field
	this.setUsername = function(username) {
		this.username_field().sendKeys(username);
	};

	// Input custom text into password field
	this.setPassword = function(password) {
		this.password_field().sendKeys(password);
	};

	// Sign in
	this.do_signin = function() {
		this.setUsername(user.username);
		this.setPassword(user.password);
		this.signin_btn().click();
	};
};

var signin = new SignInPage();
describe('Signin as basic user', function() {
	it('Do signin', function() {
		signin.get();
		signin.do_signin();
	});
});