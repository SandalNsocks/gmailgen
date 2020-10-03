const puppeteer = require('puppeteer');
const random = require('random')
const useProxy = require('puppeteer-page-proxy');
const xlsx = require('xlsx')
const fs = require('fs');
const figlet = require('figlet')
const chalk = require('chalk')
const clear = require('clear')
const inquirer = require('inquirer');
//const { finished } = require('stream');
var stream = require('stream');
const readline = require('readline');
const lineReader = require('line-reader');

const firstName = 'Testfred'
const lastName = 'Lastwee'
finished = false
counter = 0
proxiecounter = -1
//amount = 2

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Set up the CLI
clear()
console.log(
    chalk.red(
        figlet.textSync("Gmail Generator", {horizontalLayout: 'fitted' })
    ),
)
/*fs.readFile('./proxies.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });*/
ogline = ''
//ogproxies = []

lineReader.eachLine('proxies.txt', (line, last) => {
    //console.log(line + ',');
    ogline = ogline + line + ','
    //console.log(ogline)
    //ogproxies = ogproxies + line
});
//console.log(ogline)
// Initalization
inquirer.prompt([
    {
        type: 'input',
        name: 'prefix',
        message: chalk.red('Please enter a prefix for the gmails (random numbers will be added on for each gmail)'),   
    }
  ])
  .then (answer => {
    numraw = random.int(0, 100)
    num = numraw.toString()
    num2raw = random.int(0, 100)
    num2 = num2raw.toString()
    num3raw = random.int(0, 100)
    num3 = num3raw.toString()
    rawmail = answer.prefix
    gmail = answer.prefix + num + num2 + num3
    prefix = answer.prefix
    //prefix = answer.prefix + num + num2 + num3
    //console.log(prefix)
    //console.log(ogline)
    ogproxies = ogline.split(',');
    amount = ogproxies.length - 1
    //console.log(amount)
    //console.log(ogproxies)
    //console.log(ogproxies[1])
    //console.log(ogproxies[4])
    //proxiecounter = proxiecounter + 1
    //console.log(proxiecounter)
    //console.log(ogproxies[proxiecounter])
    //proxiecounter = proxiecounter + 1
    //console.log(proxiecounter)
    //console.log(ogproxies[proxiecounter])
    //proxiecounter = proxiecounter + 1
    })
    .then (async () => {
        //console.log('hold your horses')
        await inquirer.prompt([
        {
            type: 'list',
            name: 'start',
            message: chalk.red('Select start when you want to launch the gmail gen'),
            choices: ['Start']
        }
        ])
            .then (() => {
                counter = counter + 1
                console.log("Atempting " + counter + " go")
                main()
                //console.log('wagwan')
                    /*while (finished == false) {
                        if (finished == true) {
                            main()
                        }
                    }*/
            })
    })

phone = 'phone'

function genpassword() {
    numraw = random.int(0, 100)
    num = numraw.toString()
    num2raw = random.int(0, 100)
    num2 = num2raw.toString()
    num3raw = random.int(0, 100)
    num3 = num3raw.toString()
    num4raw = random.int(0, 100)
    num4 = num4raw.toString()
    num5raw = random.int(0, 100)
    num5 = num4raw.toString()
    num6raw = random.int(0, 100)
    num6 = num4raw.toString()
    num7raw = random.int(0, 100)
    num7 = num4raw.toString()
    num8raw = random.int(0, 100)
    num8 = num4raw.toString()

    password = num + num2 + num3 + num4 + num5 + num6 + num7 + num8
    //console.log(password)
    

}

function writeToFile() {
    const stream = fs.createWriteStream('./gmails.txt');
    stream.write(gmail + '@gmail.com' + ':' + password + "\n");
    stream.write(gmail + ':' + password + "\n");
    //console.log(password)
}



async function main() {
    numraw = random.int(0, 100)
    num = numraw.toString()
    num2raw = random.int(0, 100)
    num2 = num2raw.toString()
    num3raw = random.int(0, 100)
    num3 = num3raw.toString()
    gmail = rawmail + num + num2 + num3
    //console.log('wagwan')
    genpassword()
    const customArgs = [
        `--start-maximized`,
        //`--load-extension=${process.env.extdarkreader}`
        //`--proxy-server=93.115.26.100:3128`
      ];
    var options = {
    headless: false,
    //args: [ '--proxy-server=93.115.26.100:3128' ],
    executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    ignoreDefaultArgs: ["--disable-extensions","--enable-automation","--disable-sync"],
    args: customArgs,
    
    },
    browser = await puppeteer.launch(options);
    page = await browser.newPage();  
    /*await page.authenticate({
        username: '290495640319033345',
        password: 'psWB2LEBkZUZWN3B_country-UnitedKingdom_session-OwAgNeib'
    });*/
    await sleep(3000)
    await useProxy(page, ogproxies[proxiecounter]); 
    proxiecounter = proxiecounter + 1
    //await page.goto('https://whatismyipaddress.com/');
    writeToFile()
    //await useProxy(page, 'proxy.tridentproxies.com:31112:572142033116856353:VvCVNq2xeNGAqyEK_country-UnitedKingdom_session-yvPqowrv'); 
    //await page.waitForNavigation()
    await page.goto('https://accounts.google.com/signup/v2/webcreateaccount?service=mail&continue=https%3A%2F%2Fmail.google.com%2Fmail&hl=en&dsh=S-905468974%3A1600710988255040&gmb=exp&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp');
    await page.type('#firstName', prefix);
    await page.type('#lastName', prefix);
    await page.type('#username', gmail);
    await page.type('#passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input', password);
    await page.type('#confirm-passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input', password);
    await page.click('#accountDetailsNext > div.ZFr60d.CeoRYc');
    await sleep(3000)
    await page.waitForSelector('#phoneNumberId');
    await page.type('#phoneNumberId', ' ');
    await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > div.VfPpkd-RLmnJb');
    await sleep(60000);
    await page.waitForSelector('#month');
    await page.select('select#month', '4');
    await sleep(3000)
    await page.type('#day', '17');
    await sleep(3000)
    await page.type('#year', '1999');
    await page.select('select#gender', '1');
    await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > div.VfPpkd-RLmnJb')
    await sleep(10000)
    ///await page.waitForSelector('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.daaWTb > div > div > button > div.VfPpkd-RLmnJb');
    await page.click('view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.daaWTb > div > div > button > div.VfPpkd-RLmnJb')
    await page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight);
        });
    await page.click('#view_container > form > div.mbekbe.bxPAYd > div > div > div > div.TP3k4e > span > div > div.N3M02b > div:nth-child(1) > div > div.iVsznb > div > div > div.AU165e > div > div.uHMk6b.fsHoPb')
    await page.click('#view_container > form > div.mbekbe.bxPAYd > div > div > div > div.TP3k4e > span > div > div.N3M02b > div:nth-child(2) > div > div.iVsznb > div > div > div.AU165e > div > div.uHMk6b.fsHoPb')
    await page.click('#termsofserviceNext > div.ZFr60d.CeoRYc')

    finished = true
    if (counter < amount) {
        counter = counter + 1
        console.log("Atempting " + counter + " go")
        main()
    } else {
        console.log('finished at ' + counter)
    }


   /*const wb = xlsx.utils.book_new();
   const ws = xlsx.utils.aoa_to_sheet(aoa);
   xlsx.utils.book_append_sheet(wb, ws);
   xlsx.writeFile(wb, 'gmails.xlsx')*/
}
