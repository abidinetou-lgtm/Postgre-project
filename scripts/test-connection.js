import prisma from "../src/moduls/prisma.js";

try {
await prisma.$connect();
     console.log('Connection to the database was successful!');

const result = await prisma.$queryRaw`SELECT NOW()`;
console.log('Current time from the database:', result[0].now);

}catch (error) {
console.error('Error connecting to the database:', error.message);

} finally {await prisma.$disconnect();
}