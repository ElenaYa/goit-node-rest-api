import {User} from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";

export async function register(req, res, next) {
    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});

        if(user !== null) {
            throw HttpError(409, "Email in use");
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const avatarURL = gravatar.url(email);

        const newUser = await User.create({email, password: passwordHash,
        avatarURL: `${avatarURL}`,
    });

        const {subscription} = newUser;

        res.status(201).json({user: {
            email,
            subscription,
        },
    });
    } catch(error) {
        next(error);
    }
}
export async function login(req, res, next) {

    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if(user === null) {
            throw HttpError(401,"Email or password is wrong");
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch === false) {
            throw HttpError(401, "Email or password is wrong");
        }
        const userInfo = {
            id: user._id,
            email: user.email,
        };
        const token = jwt.sign(userInfo, process.env.JWT_SECRET, { expiresIn: "1h" });

        await User.findByIdAndUpdate(user._id, {token});

        res.status(200).json({token,
        user: {
            email, 
            subscription: user.subscription,
        },
    });
    } catch(error) {
        next(error);
    }
}

export async function logout(req, res, next) {
    try {
        const user = await User.findOneAndUpdate({_id: req.user.id}, {token: null});

        if(!user) {
            throw HttpError(401, "Not authirized");
        }

        res.status(204).end();
    } catch(error){
        next(error);
    }
}
export async function userByToken(req, res, next) {

    try {
        const currentUser = await User.findById(req.user.id);

        if(!currentUser) {
            throw HttpError(401, "Not authorized");
        }
        res.status(200).json({email: currentUser.email, subscription: currentUser.subscription});
    } catch(error) {
        next(error);
    }
}