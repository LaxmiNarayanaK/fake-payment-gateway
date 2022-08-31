const fs = require("fs");
   
// Read users.json file
fs.readFile("data/card-phone-transaction.json", function(err, data) {
      
    // Check for errors
    if (err) throw err;
   
    // Converting to JSON
    const users = JSON.parse(data);

    users.forEach(element => {
        if(element.OTP == 545808){
            console.log("Verified");
        }else{
            console.log("Failed to verify");
        }
    });
});