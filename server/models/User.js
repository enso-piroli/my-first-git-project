const moonguse = require('moonguse');


let UserSchema = new moonguse.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user' }
    },

    { timestamp: true }
)

module.exports = mongoose.model("User", UserSchema)