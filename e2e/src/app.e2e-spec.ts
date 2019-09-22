import { browser, element, by } from 'protractor';

describe('Enter PIN component - alert', () => {

  beforeAll(() => {
    browser.get('/');
    browser.sleep(2500);
  });

  beforeEach(() => {
    element(by.id('pin')).clear();
    browser.sleep(250);
  });

  it('should display when letters are submitted instead of numbers', () => {
    element(by.id('pin')).sendKeys('eee');
    element(by.id('submit')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Think you missed the point. The 'N' in PIN stands for NUMBER.");
    alert.dismiss();
  });

  it('should display when too many numbers are submitted', () => {
    element(by.id('pin')).sendKeys('70707');
    element(by.id('submit')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("You wanna give that another try? PINs have four numbers.");
    alert.dismiss();
  });

  it('should display when too few numbers are submitted', () => {
    element(by.id('pin')).sendKeys('707');
    element(by.id('submit')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("You wanna give that another try? PINs have four numbers.");
    alert.dismiss();
  });

  it('should display when an incorrect pin is submitted', () => {
    element(by.id('pin')).sendKeys('7070');
    element(by.id('submit')).click();
    browser.sleep(1000);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("We don't recognise that PIN. It's okay, just give it another try!");
    alert.dismiss();
  });

  it('should navigate to the home page when the correct pin is submitted', () => {
    element(by.id('pin')).sendKeys('1111');
    element(by.id('submit')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + "/home");
  });
})

describe('Home component', () => {

  it('should have £220 as the current balance', () => {
    expect(element(by.id('current-balance')).getText()).toEqual("Current Balance: £220");
  });


})

describe('Home component - alert to prevent withdrawal', () => {

  beforeEach(() => {
    element(by.id('withdrawal')).clear();
    browser.sleep(250);
  });

  it('should display when letters are submitted instead of numbers', () => {
    element(by.id('withdrawal')).sendKeys('eee');
    element(by.id('withdraw-button')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("I don't know what money you trade in, but here we use numbers.");
    alert.dismiss();
  });

  it('should display when 0 is submitted', () => {
    element(by.id('withdrawal')).sendKeys('0');
    element(by.id('withdraw-button')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Wonderful. Let me just dispense you a £0 note.");
    alert.dismiss();
  });

  it('should display when a decimal is submitted', () => {
    element(by.id('withdrawal')).sendKeys('0.5');
    element(by.id('withdraw-button')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Wonderful. Let me just dispense you a £0 note.");
    alert.dismiss();
  });

  it('should display when a negative amount is submitted', () => {
    element(by.id('withdrawal')).sendKeys('-20');
    element(by.id('withdraw-button')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("The word you're looking for is 'deposit', and you can't do it here.");
    alert.dismiss();
  });

  it('should display when an amount too large for overdraft is submitted', () => {
    element(by.id('withdrawal')).sendKeys('400');
    element(by.id('withdraw-button')).click();
    browser.sleep(500);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Your balance is a little light for that. We're not a charity.");
    alert.dismiss();
  });
})

describe('Home component - alert for valid withdrawal', () => {

  beforeEach(() => {
    element(by.id('withdrawal')).clear();
    browser.sleep(250);
  });

  it('should display when a number not divisible by 5 is submitted', () => {
    element(by.id('withdrawal')).sendKeys('2');
    element(by.id('withdraw-button')).click();
    browser.sleep(250);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("We can't dispense coins, so I'll round this up to the nearest note for you. No need to thank me.");
    alert.dismiss();
  });

  it('should display when a withdrawal will put them into overdraft and cancel when dismissed', () => {
    element(by.id('withdrawal')).sendKeys('225');
    element(by.id('withdraw-button')).click();
    browser.sleep(250);
    var alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("That'll put you into overdraft, so uh, don't go too crazy.");
    alert.dismiss();
    expect(element(by.id('current-balance')).getText()).toEqual('Current Balance: £215');
  });

  it('should display the overdraft alert and go through when accepted', () => {
    element(by.id('withdrawal')).sendKeys('225');
    element(by.id('withdraw-button')).click();
    browser.sleep(250);
    var alert = browser.switchTo().alert();
    alert.accept();
    expect(element(by.id('current-balance')).getText()).toEqual('Current Balance: £-10');
  });
})

describe('Home component - alert for failed withdrawal', () => {

  beforeEach(() => {
    element(by.id('withdrawal')).clear();
    browser.sleep(250);
  });

  it('should display when the ATM is out of the required note', () => {
    element(by.id('withdrawal')).sendKeys('5');
    element(by.id('withdraw-button')).click();
    browser.sleep(250);
    var alert = browser.switchTo().alert();
    alert.accept();
    element(by.id('withdraw-button')).click();  
    browser.sleep(250);
    alert = browser.switchTo().alert();
    alert.accept();
    element(by.id('withdraw-button')).click();  
    browser.sleep(250);
    alert = browser.switchTo().alert();
    expect(alert.getText()).toEqual("Well, this is awkward. We're a little light on funds and can't give you that amount. We're just concerned about your spending habits, is all.");
    alert.dismiss();
  });
})
