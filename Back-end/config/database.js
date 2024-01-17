const mongoose = require("mongoose")

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

        .then(() => console.log("Db connected"))
        .catch((error) => {
            console.log("Db Not Connected");
            console.log(error);
            process.exit(1);
    })
}