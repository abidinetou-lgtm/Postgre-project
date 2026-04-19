import prisma from '../moduls/prisma.js';
import { hashPassword, comparePasswords } from '../utils/passwords.js';
import { generateToken } from '../utils/token.js';
 
const login = async ({ email, password }) => {
const user = await prisma.user.findUnique({
        where: { email },
});
 
        if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
}
 
const isPasswordValid = await comparePasswords(password, user.password);
 
        if (!isPasswordValid) {
        const error = new Error('Invalid email or password');
        error.statusCode = 401;
        throw error;
}
 
const token = generateToken(user.id);
 
        return {
        user: {
        id: user.id,
        email: user.email,
        name: user.name,
        },
        token,
    };
};
 
const register = async ({ email, name, password }) => {
//Vérifie si l'email est déjà pris
    const existing = await prisma.user.findUnique({
    where: { email },
    });
 
    if (existing) {
     const error = new Error('Cet email est déjà utilisé');
    error.statusCode = 409;
    throw error;
    }
 
const hashed = await hashPassword(password);
 
const user = await prisma.user.create({
        data: { email, name, password: hashed },
    });
 
const token = generateToken(user.id);
 
    return {
    user: {
    id: user.id,
    email: user.email,
    name: user.name,
},
        token,
    };
};
 
const getMe = async (userId) => {
    const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
    id: true,
    email: true,
    name: true,
    createdAt: true,
},
    });
 
if (!user) {
    const error = new Error('Utilisateur introuvable');
    error.statusCode = 404;
    throw error;
}
 
    return { data: user };
};
 
export default {
    login,
    register,
    getMe,
};