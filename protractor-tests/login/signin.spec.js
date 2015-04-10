//Signin page object
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

	this.signin_click = function() {
		this.signin_btn().click();
	};

	this.get = function() {
		browser.get(browser.baseUrl + '/#!/signin');
	};

	// Input custom text into the username field
	this.setUsername = function(username) {
		this.username_field().sendKeys(username);
	};

	// Input custom text into password field
	this.setPassword = function(password) {
		this.password_field().sendKeys(password);
	};

	this.errorText = function() {
		return element(by.binding('error'))
	};

};

var signin = new SignInPage();
//sh- is just an abbreviation for "should"
describe('Sign In page', function() {
	describe('Sign In page properties', function() {
		it('Get sign in page', function() {
			signin.get();
		});
		//--------------------------------------------------
		it('Sh- be called Sign In', function() {
			expect(
				browser.getCurrentUrl())
			.toBe(browser.baseUrl + '/#!/signin');
		});
	});

	describe('Sign in with no info', function() {
		it('Do sign in with no info', function() {
			signin.signin_click();
		});
		//--------------------------------------------------
		it('Sh- display error text', function() {
			expect(
				signin.errorText().isDisplayed())
			.toBeTruthy();		
		});
		//--------------------------------------------------
		it('Sh- error text should display "Missing credentials"', function() {
			expect(
				signin.errorText().getText())
			.toBe('Missing credentials');	
		});
	});
	describe('Sign in with invalid info', function () {
		//--------------------------------------------------
		it('Do sign in w/ invalid info', function() {
			signin.setUsername('a');
			signin.setPassword('a');
			signin.signin_click();
		});
		//--------------------------------------------------
		it('Sh- display error text', function() {
			expect(
				signin.errorText().isDisplayed())
			.toBeTruthy();		
		});
		//--------------------------------------------------
		it('Sh- error text should display "Unknown user or invalid password"', function() {
			expect(
				signin.errorText().getText())
			.toBe('Unknown user or invalid password');	
		});
	});
});