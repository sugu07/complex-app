describe('Test Run', function() {
    it('Bot',function(){
        browser.waitForAngularEnabled(false);
        browser.get("http://jabrabot.pagify.in/home").then(function(){
            browser.sleep(15000)
            var until = protractor.ExpectedConditions;
            var elem = element(by.id('hfc-frame'));
            browser.wait(until.presenceOf(elem), 15000, 'Element taking too long to appear in the')
            browser.switchTo().frame(element(by.id('hfc-frame')).getWebElement());
            element(by.xpath('//*[contains(text(),\'I need help with my Jabra device\')]')).click().then(function(){
                browser.sleep(10000)
                let input = element(by.css('input#downshift-0-input'));
                browser.wait(until.presenceOf(input), 1000, 'Element taking too long to appear in the')
                input.sendKeys('Boost').then(function(){
                    browser.sleep(1000)
                    input.sendKeys(protractor.Key.ENTER).then(function(){
                        input.sendKeys(protractor.Key.ENTER)
                    });
                })
        });               
        })
        let until = protractor.ExpectedConditions;
        let ele = element(by.xpath('//*[contains(text(),\'I Am Having Audio Issues\')]'))
        browser.wait(until.presenceOf(ele), 15000, 'Element taking too long to appear in the').then(function(){
            // browser.sleep(15000)
            ele.click();
        })
        
    })

    // it('Bot 2', function(){
    //     let until = protractor.ExpectedConditions;
    //     let ele = element(by.xpath('//*[contains(text(),\'I Am Having Audio Issues\')]'))
    //     browser.wait(until.presenceOf(ele), 15000, 'Element taking too long to appear in the').then(function(){
    //         browser.sleep(15000)
    //         ele.click();
    //     })
    // })

//     it('Handle Alert', function() {
//         browser.waitForAngularEnabled(false);
//         // browser.get('https://www.google.com/');
//         browser.get("file:///Users/tenmiles/Desktop/alert.html");
//         element(by.xpath('.//*[contains(text(),"Create Alert")]')).click();
//         let alerts = browser.switchTo().alert();
//         alerts.accept()
//     });

//     it("Handle WebTable", function(){
//         browser.waitForAngularEnabled(false);
//         browser.get("https://www.toolsqa.com/automation-practice-table/")
//         browser.driver.manage().window().maximize();

//         browser.element.all(by.xpath('//table[@class="tsc_table_s13"]//tbody/tr')).each(function(elements, index) {
//             index= index+1;
//             element(by.xpath("//table[@class='tsc_table_s13']//tbody/tr["+index.toString()+"]/td[1]")).getText().then(function(text){
//                 if(text == 'Taiwan'){
//                     console.log(index)
//                     element.all(by.xpath("//table[@class='tsc_table_s13']//thead/tr/th")).count().then(function(column){
//                         column = column - 1
//                         element(by.xpath("//table[@class='tsc_table_s13']//tbody/tr["+index.toString()+"]/td["+column.toString()+"]/a")).click();
//                         console.log(column)
//                     })
//                 }

//             })
//           });
          
//   });

//     it("Handles Windows", function(){
//         browser.get("http://demo.automationtesting.in/Windows.html")
//         browser.driver.manage().window().maximize();

//         element(by.css('a[href="http://www.sakinalium.in"]')).click().then(function(){
//             browser.sleep(2000)
//             var winHandles=browser.getAllWindowHandles();
//             winHandles.then(function(handles) 
//             {
//                 var parentWindow=handles[0];
//                 var popUpWindow=handles[1];
//                 browser.switchTo().window(parentWindow);
//                 browser.sleep(2000)
//                 browser.switchTo().window(popUpWindow);
//                 browser.sleep(2000)
//             })
//         })
        
//     })  
});