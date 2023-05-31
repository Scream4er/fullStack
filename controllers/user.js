const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email && !password) {
        return res.status(400).json({ message: 'Please fill all inputs'})
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    });

    const isPasswordCorrect = user && (await brypt.compare(password, user.password));

    if (user && isPasswordCorrect) {
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
        })
    } else {
        return res.status(400).json({ message: 'Uncorrected login or password' })
    }
}

const register = async (req, res) => {
    res.send('register');
}

const current = async (req, res) => {
    res.send('current');
}

module.exports = {
    login,
    register,
    current
}