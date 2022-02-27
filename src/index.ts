import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

async function main() {
    console.log("Hello World!");
}

main()
    .catch(e => {
        throw e
    })
    .finally(() => {
        prisma.$disconnect();
    });