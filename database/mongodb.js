import mongoose from "mongoose";
const connect = () => {
    mongoose.connect(process.env.ATLAS_URI, {
        autoIndex: true,
    }).then(() => console.log('Connected!'));
}

export default connect;