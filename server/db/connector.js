import mongoose from "mongoose"
mongoose.Promise = global.Promise


//export const startDB = ({ _user, pwd, url, db }) => mongoose.connect(`mongodb://localhost:27017/${db}`);
export default mongoose.connect(`mongodb://localhost:27017/movie`)