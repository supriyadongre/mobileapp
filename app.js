const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require('cors');
const { response } = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.set('view engine','ejs');
app.use(express.static("public"));

// this is testing for git

// app.use(cors({
//     origin: '*'
// }));

mongoose.connect("mongodb://127.0.0.1:27017/mobileShopDB");

// **********Schema customer relation management**************//
const customerSchema = {
    name: String,
    mb_no: Number,
    dob: String,
    status: String,
    email: String,
    date: String,
}

// **********model creation for  customer relation management**************//
const CustReg = new mongoose.model("CustReg", customerSchema)


// **********Post Request For Customer Registration**************//

app.post("/register", function (req, res) {
 
    const custReg = new CustReg({
        name: req.body.name,
        mb_no: req.body.mb_no,
        dob: req.body.dob,
        email: req.body.email,
        date :  new Date()
    });

    custReg.save();
    res.sendFile(__dirname + "/index.html")

})


// **********Schema for owner login **************//
const ownerLoginSchema = {
    email: String,
    pwd: String,
}

// **********Get Request For Owner Login**************//

app.get("/ownerlogin", function (req, res) {
    res.sendFile(__dirname + "/ownerLogin.html")
});

// **********Get Request For dashboard**************//

app.post("/ownerlogin", function (req, res) {
    res.sendFile(__dirname + "/ownerlogin.html")
});

// **********  after login redirects to dashboard   **************//
app.post("/dashboard", function (req, res) {
    res.sendFile(__dirname + "/dashboard.html")
})

// **********  siderbar menu redirects to dashboard   **************//
app.get("/dashboard", function (req, res) {
    res.sendFile(__dirname + "/dashboard.html")
})

// **********model creation for distributer**************//
const ownerLogin = new mongoose.model("ownerLogin", ownerLoginSchema)

// **********  add model **************//

app.get("/add_model", function (req, res) {

    res.sendFile(__dirname + "/add_model.html");
});

// ********** display  model **************//

app.get("/model_list", function (req, res) {

    res.sendFile(__dirname + "/model_list.html");
});

// ********** get model list **************//
app.get("/getModelList", function (req, res) {
    Product.find(function (err, results) {
        res.json(results);
    })
});

// **********Schema for distributer **************//
const distributerSchema = {
    name: String,
    gst: Number,
    address: String,
    mb_no: 
    {
        type:Number,
        minLength: 10,       
    },
    date: Date,

}
// **********model creation for  customer relation management**************//
const Distributer = new mongoose.model("Distributer", distributerSchema)

// ********** add distributor list **************//

app.get("/add_distributer", function (req, res) {

    res.sendFile(__dirname + "/add_distributer.html");
});

// ********** get distributor list **************//

app.get("/getDistributerData", function (req, res) {
    Distributer.find(function (err, results) {
        res.json(results);
    })
});

// **********Post Request For Adding New distributor **************//
app.post("/saveDistributer", function (req, res) {
  
    if (req.body.rowid) {
        console.log("in if", req.body.rowid)
        Distributer.findByIdAndUpdate(req.body.rowid, {
            name: req.body.name,
            gst: req.body.gst,
            address: req.body.address,
            mb_no: req.body.mb_no,
        }, function (err, result) {
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
            gst: req.body.gst,
            address: req.body.address,
            mb_no: req.body.mb_no,
            date : new Date()
        });
        distributer.save();
        res.redirect('/distributer_list');
    }
})
// **********display distributer**************//

app.get("/distributer_list", function (req, res) {
    console.log('distributer list');
    res.sendFile(__dirname + "/distributer_list.html");
});

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


// **********dispalye edit data in  distributer popup**************//
app.put("/getData/:id", function (req, res) {
    Distributer.find({ _id: req.params.id }, function (err, result) {
        res.json(result);
        // res.sendFile(__dirname + "/edit_distributer.html")
    })

})

// **********Schema for adding  stock  **************//
const stockSchema = {
    dist_id: Number,
    model_name: String,
    brand_name: String,
    varrient: String,
    invoice_no: Number,
    date: Date,
    qty: Number,
    invoice_amount: Number,
    invoice_status: String,
    invoice_amount_paid: Number,
    invoice_bal: Number,

}

// **********model creation for stock**************//
const stock = new mongoose.model("stock", stockSchema)


// **********Schema for stock status**************//
const stockStatusSchema = {
    name: String,
    date: Date,
    cust_name: String,
    mb_no: String,
    dob: Date,
    pwd: String,
    source: String,
    status: String
}

// **********model creation for stock status**************//
const stockStatus = new mongoose.model("stockStatus", stockStatusSchema)

// **********Schema for customer mobile invoice**************//
const custMbInvoiceSchema = {
    invoice_no: Number,
    mb_brand: String,
    mb_model: String,
    mb_varrient: String,
    mb_color: String,
    imei_no_1: Number,
    imei_no_2: Number,
    payment_mode: String,
    mobile_price: Number,

}

// **********model creation for stock status**************//
const custMbInvoice = new mongoose.model("custMbInvoice", custMbInvoiceSchema)

app.get("/register", function (req, res) {
    res.sendFile(__dirname + "/customer_register.html");
})

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

// **********Listeninig Port**************//

app.listen(3000, function (req, res) {
    console.log("Server is running on localhost 3000");
});
