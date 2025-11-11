    import mongoose from "mongoose";

    const themeSchema = new mongoose.Schema({
        name: {type: String, require: true, unique: true},
        words: [{type: String, required: true}], 
    }); 

    export default mongoose.model("Theme", themeSchema);