require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var path = require("path")
app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
var port = 8000;
app.listen(port);
app.post('/sms', (req, res) => {
    console.log(req.body.input1)
    res.sendFile(path.join(__dirname,'./index.html'));
    res.send
})



const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

function sendTwilioMessage(body, number) {
    twilio.messages.create({from: process.env.TWILIO_PHONE_NUMBER,
        to: number,
        body: body
    })
}

var verifyServiceSID = "VA3f76d5c346096c73a5999710d0c4adde"
var number = "+16083146678"
var currVerificationSID
// Create Verify Service, only needs to be run one time
function createVerifyService(name) {
  return twilio.verify.v2.services.create({friendlyName: name}).then(service => verifyServiceSID = service.sid)
}
// Send verification code to number
function sendVerify(sid, number) {
  twilio.verify.v2.services(sid).verifications.create({to: number, channel: 'sms', amount: 5}).then(verification => {
    currVerificationSID = verification.sid
    // console.log(verification.sid)
  })
}
// Check verification code
function checkVerify(serviceSID, verifySID, number, code) {
  twilio.verify.v2.services(verifyServiceSID).verifications(verifySID).fetch().then(verification => {
    // console.log(verification.status)
    if (verification.status != "pending") {
      // Verification is no longer valid, return some error
    } else {
      twilio.verify.v2.services(serviceSID).verificationChecks.create({to: number, code: code}).then(verification_check => {
        if (verification_check.status == "approved") {
          console.log("Success!!")
          // Verification is complete
        } else {
          console.log("Incorrect")

        }
      })
    }
    }
  )
}

// createVerifyService("Pill Pal").then(serv => console.log(serv))
// sendVerify(verifyServiceSID, number)
// setTimeout(() => {
//   checkVerify(verifyServiceSID, currVerificationSID, number, '836125')
// }, 2000);