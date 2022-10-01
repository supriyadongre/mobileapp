const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine','ejs');
app.use(express.static("public"));

app.use(cors({
    origin: '*'
}));

mongoose.connect("mongodb://127.0.0.1:27017/mobileShopDB");
// **********Schema For Users Registration**************//
const userSchema = {
    name: String,
    mobNumber: Number,
    expectetedRange: String,
    intrestedIn: String,
    email: String,
    password: String
}


// **********Schema For Owner Registration**************//

const ownerSchema = {
    name: String,
    email: String,
    password: String
}

// **********Schema For adding  New Mobile Model**************//

const addModelSchema = {
    brandName: String,
    modelName: String,
    varrient: {
        type: String
    },
    color: {
        type: String
    }
}

// **********Schema For adding New Accessories**************//

const addAccessoriesSchema = {
    itemName: String,
    itemSpecs1: String,
    itemSpecs2: String
}



// **********Schema For adding Distributer Detail **************//

const distributerSchema = {
    name: String,
    gstNumber: String,
    address: String,
    ContactNumber: Number
}

// **********Schema For adding Mobiles To Stock**************//

const mobileStockSchema = {
    brandName: String,
    modelName: String,
    varrient: String,
    color: String,
    quantity: Number,
}

// **********Schema For adding Accessories To Stock**************//

const accessoriesStockSchema = {
    itemName: String,
    itemSpecs1: String,
    itemSpecs2: String,
    quantity: Number
}

// **********Schema For Distributer Invoice**************//

const distributerInvoiceSchema = {
    invoiceNumber: Number,
    distributerDetails: String,
    itemNumber: Number,
    productDetails: String,
    productQuantity: Number,
    netAmount: Number,
    amountPaid: Number,
    paymentMode: String,
    balanceAmount: Number
}

//Invoice Number
//Distributer Name
//Gst. Number og dist.
//item Number
//Brand Name
//Model Name
//Varrinet
//Color
//price/unit
//Quantity
//total Amount
//Net Amount

//Payment Method
//Amount Paid
//Amount Balance




// **********Model And Collection  For Users**************//

const User = mongoose.model("User", userSchema);

// **********Model And Collection  For Owner**************//

const Owner = mongoose.model("Owner", ownerSchema);

// **********Model And Collection for adding New Accessories**************//


const Accessories = mongoose.model("Accessories", addAccessoriesSchema);


// **********Model And Collection for adding Mobile Model**************//

const Model = mongoose.model("Model", addModelSchema);


// **********Model And Collection for adding New Distributers**************//

const Distributer = mongoose.model("Distributer", distributerSchema)


// **********Model And Collection for adding Mobile To Stock**************//

const MobileStock = mongoose.model("MobileStock", mobileStockSchema);

// **********Model And Collection for adding Accessories To Stock**************//

const AccessoriesStock = mongoose.model("AccessoriesStock", accessoriesStockSchema);

// **********Get Request For Owner Login**************//

app.get("/login", function (req, res) {

    res.sendFile(__dirname + "/login.html");
});

// **********Get Request For Home Page**************//

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

// **********Get Request For Customer Registration**************//

app.get("/register", function (rec, res) {

    res.sendFile(__dirname + "/register.html");

});

// **********Get Request For Owner Login**************//

app.get("/ownerlogin", function (req, res) {
    res.sendFile(__dirname + "/ownerLogin.html")
});

// **********Get Request For Owner Registration**************//

app.get("/ownerRegister", function (req, res) {
    res.sendFile(__dirname + "/ownerReg.html");
});


// **********  add model **************//

app.get("/add_model", function (req, res) {

    res.sendFile(__dirname + "/add_model.html");
});


app.get("/model_list", function (req, res) {

    res.sendFile(__dirname + "/model_list.html");
});

// **********Get Request For Owner Registration**************//

app.get("/distributer_list", function (req, res) {
    console.log('distributer list');
    res.sendFile(__dirname + "/distributer_list.html");
});

// **********Get Request For Owner Registration**************//

app.get("/add_accessories", function (req, res) {

    res.sendFile(__dirname + "/add_accessories.html");
});


app.get("/add_distributer", function (req, res) {

    res.sendFile(__dirname + "/add_distributer.html");
});

// ********** get distributor list **************//
app.get("/getDistributerData", function (req, res) {
    Distributer.find(function (err, results) {
        res.json(results);
    })
});

// ********** get distributor list **************//
app.get("/getModelList", function (req, res) {
    Model.find(function (err, results) {
        res.json(results);
    })
});


// **********Post Request For Customer Registration**************//

app.post("/register", function (req, res) {

    const newUser = new User({

        name: req.body.name,
        mobNumber: req.body.mobNumber,
        intrestedIn: req.body.phone,
        ExpectetedRange: req.body.range,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(function (err) {
        if (!err) {
            res.send(`<h2>Thanks For Registration Mr/Mrs. <h1> ${req.body.name}</h1></h2> <a href="/"><button>Login</button></a>`);
        } else {
            console.log(err);
        }
    })

})


// **********Post Request For Customer Login**************//

app.post("/login", function (req, res) {

    User.findOne({ mobNumber: req.body.userName }, function (err, foundUser) {
        if (!err) {
            if (foundUser.password === req.body.password) {

                res.send(`<h2>You Are Successfully LogedIn <h1> ${foundUser.name}</h1></h2>`);
            } else {
                res.send("User id And Password Dosen't Matched ");
            }
        } else {
            console.log(err);
        }
    })
})


// **********Post Request For Owner Login**************//

app.post("/ownerlogin", function (req, res) {

    res.sendFile(__dirname + "/dashboard.html")


})



// **********Post Request For Owner Registarion**************//

app.post("/ownerRegistration", function (req, res) {

    console.log("id=" + req.body.ownerId)
    console.log("name= " + req.body.ownerName)
    console.log("password=" + req.body.password)

    const newOwner = new Owner({
        name: req.body.ownerName,
        email: req.body.ownerId,
        password: req.body.password
    });

    newOwner.save(function (err) {
        if (!err) {
            res.send(`<h2>You are Succesfully registered to Admin Panel <br/> Mr. <h1> ${req.body.ownerName}</h1></h2>`);

        } else {
            console.log(err);
        }


    });

});

// **********Post Request For Adding New Mobile Model**************//

app.post("/saveModel", function (req, res) {
    if (req.body.rowid) {
        Model.findByIdAndUpdate(req.body.rowid, {
            brandName: req.body.brandName,
            modelName: req.body.modelName,
            varrient: req.body.varrient,
            color: req.body.color
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({
                    status: true,
                    message: "Row Updated"
                })
            }
        });
    } else {
        
        const model = new Model({
            brandName: req.body.brandName,
            modelName: req.body.modelName,
            varrient: req.body.varrient,
            color: req.body.color
        });
        model.save();
        res.redirect('/model_list');
    }
})





// **********Post Request For Adding New Accessories Item**************//
app.post("/newAccessories", function (req, res) {
    const newAccessories = new Accessories({

        itemName: req.body.itemName,
        itemSpecs1: req.body.itemSpecs1,
        itemSpecs2: req.body.itemSpecs2

    })
    newAccessories.save(function (err) {
        if (!err) {
            res.send(`successfully added New accessories item of ${req.body.itemName}`);
        }
    })
})


// **********Post Request For Adding New distributor **************//
app.post("/saveDistributer", function (req, res) {
    if (req.body.rowid) {
        console.log("in if", req.body.rowid)
        Distributer.findByIdAndUpdate(req.body.rowid, {
            name: req.body.name,
            gstNumber: req.body.gstNumber,
            address: req.body.address,
            ContactNumber: req.body.ContactNumber,
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                res.json({
                    status: true,
                    message: "Row Updated"
                })
            }
        });
    } else {
        console.log("in else", req.body.rowid)
        const distributer = new Distributer({
            name: req.body.name,
            gstNumber: req.body.gstNumber,
            address: req.body.address,
            ContactNumber: req.body.ContactNumber,
        });
        distributer.save();
        res.redirect('/distributer_list');
    }
})


app.put("/getData/:id", function (req, res) {
    Distributer.find({ _id: req.params.id }, function (err, result) {
        res.json(result);
        // res.sendFile(__dirname + "/edit_distributer.html")
    })

})
app.put("/getModelData/:id", function (req, res) {
    Model.find({ _id: req.params.id }, function (err, result) {
        res.json(result);
        // res.sendFile(__dirname + "/edit_distributer.html")
    })

})


// **********Post Request For delete distributer Item**************//

app.delete("/deleteData/:id", function (req, res) {

    Distributer.findOneAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: true,
                message: "record deleted"
            })
        }
    });
})

// **********Post Request For delete distributer Item**************//

app.delete("/deleteModelData/:id", function (req, res) {

    Model.findOneAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                status: true,
                message: "record deleted"
            })
        }
    });
})

// **********Listeninig Port**************//

app.listen(3000, function (req, res) {
    console.log("Server is running on localhost 3000");
});
