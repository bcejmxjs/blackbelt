var SignInPage = function() {
	// Page object for the sign in page

	this.username_field = browser.element(by.id('username'));
	this.password_field = browser.element(by.id('password'));
	this.signin_btn = browser.element(by.buttonText('Sign in'));

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

};

var signin = new SignInPage();
//sh- is just an abbreviation for "should"
describe('Sign In page', function() {
	describe('Sign In page properties', function() {
		it('Get sign in page', function() {
			signin.get();
		});
		//--------------------------------------------------
		// I cannot, for the life of me, understand why
		// .isDisplayed() returns true for non displayed element
		// <sign up and sign in should be displayed>
		//--------------------------------------------------
		it('Sh- be called Sign In', function() {
			expect(
				browser.getTitle())
			.toBe('Blackbelt - Development Environment');
		});
		//--------------------------------------------------
	});

	describe('Sign in with no info', function() {
		it('Do sign in with no info', function() {
			signin.signin_btn.click();
		});
		//--------------------------------------------------
		it('Sh- display error text', function() {
			expect(
				browser.element(by.binding('error')).isDisplayed())
			.toBeTruthy();		
		});
		//--------------------------------------------------
		it('Sh- error text should display "Missing credentials"', function() {
			expect(
				browser.element(by.binding('error')).getText())
			.toBe('Missing credentials');	
		});
		//--------------------------------------------------
	});
	describe('Sign in with invalid info', function () {
		//--------------------------------------------------
		it('Do sign in w/ invalid info', function() {
			signin.setUsername('a');
			signin.setPassword('a');
			signin.signin_btn.click();
		});
		//--------------------------------------------------
		it('Sh- display error text', function() {
			expect(
				browser.element(by.binding('error')).isDisplayed())
			.toBeTruthy();		
		});
		//--------------------------------------------------
		it('Sh- error text should display "Unknown user or invalid password"', function() {
			expect(
				browser.element(by.binding('error')).getText())
			.toBe('Unknown user or invalid password');	
		});
		//--------------------------------------------------
	});
});