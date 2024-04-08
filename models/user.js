import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already in use'],
        required: [true, 'Email is required']
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [/^(?![_.-])[\w.-](?!.*[_.-]{2,})(?!.*[._-]$)[\w .-]{5,29}$/, "Username invalid, it should contain 8-35 alphanumeric letters and be unique!"]
    },

    image: String
});

//The "models" object is provided by the Mongoose Library and stores all the registered models.
//If a model named "user" already exists in the "models" object it assigns that model to the "User" variable.
//This prevents redefining the model and ensures that the existing model is used.

//If a model named "User" does not exist in the "models" object, the "model" function from mongoose is called to create a new model.
//The newly created model is then assigned to the "User" variable.

//All this is done because Next.js routes are serverless functions by default and are only called and created when they are needed either by an event trigger such as a GET request or by a POST request,unlike our typical servers that we communicate with in express applications that the routes in the application are always live by default and their callback functions called when the routes are hit either by a GET request or by a POST request.

//This means for Next.js, the routes are only going to be created and running for the time it is getting called.

//In a typical express application, we instantiate the model like this:
//* const User = model("User", UserSchema);
//* export default User;

//In Next.js apps:
const User = models.User || model("User", UserSchema);

export default User;

//This is additional check is done because the auth route handler is called every single time and the connection to the DB is established every single time from scratch.