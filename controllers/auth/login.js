const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, 'Email or password invalid');
    }
    if (!user.verify) {
        throw HttpError(401, 'Email not verified');
    }
    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password invalid');
    }
    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

module.exports = login;
