var SignInPage = function() {
	// Page object for the sign in page
	
	// This code is already fairly readable
	// 'this' references this function, the SignInPage
	// These are items on the sign in page:
	this.username_field = element(by.id('username'));
	this.password_field = element(by.id('password'));
	this.signin_btn = element(by.buttonText('Sign In'));

	// SignInPage.get will get the page
	this.get = function() {
		browser.get('http://localhost:3000/#!/signin')
	}

	// SignInPage.setUsername('bob') will input 'bob' in the field
	this.setUsername = function(username) {
		this.username_field.sendKeys(username);
	}

	// SignInPage.setPassword('thebuilder') will input 'thebuilder' in the password field
	this.setPassword = function(password) {
		this.password_field.sendKeys(password);
	}

	this.sign_in = function() {
		this.signin_btn.click();
	}

}