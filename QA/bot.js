// describe('Jabra Bot', function() {
//     it('RMA Flow', function() {
//         browser.waitForAngularEnabled(false);        
//         browser.get("http://jabrabot.pagify.in/home")
//         browser.switchTo().frame(element(by.id('hfc-frame')));
//         element(by.xpath('.//*[contains(text(),"I need help with my Jabra device")')).click();

//     })
// })


describe('Test Run', function() {
    it('Handle Alert', function() {
        browser.waitForAngularEnabled(false);        
        browser.get("http://jabrabot.pagify.in/home")
        browser.switchTo().frame(element(by.id('hfc-frame')));
        element(by.xpath('.//*[contains(text(),"I need help with my Jabra device")')).click();
    });
});