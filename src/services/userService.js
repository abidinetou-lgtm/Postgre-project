import prisma from '../moduls/prisma.js';
import { hashPassword } from '../utils/passwords.js';
 

const userSelect = {
id: true,
email: true,
name: true,
createdAt: true,
updatedAt: true,
};
 
const getAllUsers = async ({ page = 1, limit = 10 } = {}) => {
    const skip = (page - 1) * limit;
 
    const [userList, userCount] = await Promise.all([
        prisma.user.findMany({
        skip,
        take: limit,
        select: userSelect,
        }),
        prisma.user.count(),
    ]);
 
return {
    data: userList,
    total: userCount,
    page,
    limit,
    totalPages: Math.ceil(userCount / limit),
    };
};
 
const getUserById = async (id) => {
const user = await prisma.user.findUnique({
    where: { id },
    select: userSelect,
    });
 
return { data: user };
};
 
const createUser = async (userData) => {
    const createdUser = await prisma.user.create({
    data: {
    email: userData.email,
    name: userData.name,
    password: await hashPassword(userData.password),
},
        select: userSelect,
    });
 
    return { data: createdUser };
};
 
const updateUser = async (id, userData) => {
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            ...(userData.email && { email: userData.email }),
            ...(userData.name && { name: userData.name }),
        },
        select: userSelect,
    });
 
    return { data: updatedUser };
};
 
const deleteUser = async (id) => {
    const user = await getUserById(id);
 
    if (user.data) {
    return prisma.user.delete({ where: { id } });
    }
 
    return false;
};
 
export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
 