const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all inputs'})
        }

        const user = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        const isPasswordCorrect = user && (await brypt.compare(password, user.password));
        const secret = process.env.JWT_SECRET;

        if (user && isPasswordCorrect && secret) {
            res.status(200).json({
                id: user.id,
                email: user.email,
                name: user.name,
                token: jwt.sign({id: user.id}, secret, { expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({ message: 'Uncorrected login or password' })
        }
    } catch {
        res.status(500).json({ message: 'Something goes wrong' })
    }
}

/**
 *
 * @route POST /api/user/register
 * @desc Register
 * @access publick
 */

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ message: 'Please feel important inputs'})
        }

        const registeredUser = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if (registeredUser) {
            return res.status(400).json({ message: 'This email is currently in use'})
        }

        const salt = await brypt.genSalt(10);
        const hashedPassword = await brypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        const secret = process.env.JWT_SECRET;

        if (user && secret) {
            res.status(201).json({
                id: user.id,
                email: user.email,
                name,
                token: jwt.sign({id: user.id}, secret, { expiresIn: '30d'})
            })
        } else {
            return res.status(400).json({ message: 'Cant create a user'})
        }
    } catch {
        res.status(500).json({ message: 'Something goes wrong'})
    }

}

/**
 *
 * @route GET /api/user/current
 * @desc current user
 * @access Private
 */

const current = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    login,
    register,
    current
}