var SignInPage = function() {
	// Page object for the sign in page

	this.username_field = function() {
		return element(by.id('username'));
	};

	this.password_field = function() {
		return element(by.id('password'));
	};

	this.signin_btn = function() {
		return element(by.buttonText('Sign in'));
	};

	var admin = {
		username: 'admin',
		password: 'adminuser'
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

	// Login as admin
	this.admin_signin = function() {
		this.setUsername(admin.username);
		this.setPassword(admin.password);
		this.signin_btn().click();
	};

};

var signin = new  SignInPage();
describe('Admin signin', function() {
	it('Do admin sign in', function() {
		signin.get();
		signin.admin_signin();
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
});