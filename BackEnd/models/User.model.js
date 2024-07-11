const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ROUNDS = 10;

const EMAIL_PATTERN =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "required field"],
            match: [EMAIL_PATTERN, "invalid email pattern"],
            trim: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "required field"],
            minlength: [8, "invalid length"],
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        profilePicture: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

UserSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt
            .hash(this.password, ROUNDS)
            .then((hash) => {
                this.password = hash;
                next();
            })
            .catch(next);
    } else {
        next();
    }
});

UserSchema.methods.checkPassword = function (passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
