const mongoose = require('mongoose')

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.database_url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }, () => {
                console.log("MongoDB connected Successfully")
            })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
module.exports = connectToDB