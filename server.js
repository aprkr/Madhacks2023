require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser')
var { MongoClient } = require('mongodb');
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
app.on('listening', async function () {

    try{

        await client.connect();
        //await listDatabases(client)
        /*await createMember(client, {
            name: "Heff",
            phone_no: 6080000000,
            meds: [{med_name:"advil", quantity: 3, morning: 0, noon:0, evening:0, color: "red", for: "cold"},{med_name:"percocet", quantity: 2, frequency: 1, color: "white", for: "pain-relief"}]

        })*/
        //await findMember(client, "Jeff");
        //await removeMember(client, "Jeff");
    
    } catch (e){
        console.error(e)
    } finally {
        await client.close();
    }

    
});
const uri = 'mongodb+srv://rbrar:mdb123@cluster0.2r7ytsu.mongodb.net/test'
const client = new MongoClient(uri);


async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:")
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}
async function createMember(client, newMem) {
    const result = await client.db("medbay").collection("dependents").insertOne(newMem);

    console.log(`New member created with the following id: ${result.insertedId}`);
    
}
async function findMember(client, phno) {
    const result = await client.db("medbay").collection("dependents").findOne({phone_no: phno});
    return result;
}

async function findDay(client) {
    const result = await client.db("medbay").collection("dependents").find();

    console.log(result);

    return result;
}

async function removeMember(client, nameMem) {
    const result = await client.db("medbay").collection("dependents").deleteOne({name: nameMem});
    console.log(`${result.deletedCount} member(s) named ${nameMem} were removed`);
    
}

app.post('/form', async (req, res) => {
    var pname = req.body.name
    var phno = req.body.phno
    var medname = req.body.medname
    var sdate = req.body.sdate
    var edate = req.body.edate

    console.log("sdate: " + sdate ", edate: " + edate);
    var quan = req.body.quan

    await createMember(client, {
       name: pname,
       phone_no: phno,
       meds: [{med_name:medname, start_date: sdate, quantity: quan}]

   })

   res.send("New Member Added! <form action='./index.html'><input type='submit' value='Go Back'/></form>")
})
app.post('/lookup', async (req, res) => {
    var lookup = await findDay(client);
   res.send("New Member Added! <form action='./index.html'><input type='submit' value='Go Back'/></form>")
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


