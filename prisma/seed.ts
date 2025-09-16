import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Delete existing test user if exists
    await prisma.user.deleteMany({
        where: {
            username: 'john',
        },
    });
    console.log('Removed existing john user');

    // Create new user
    const hashedPassword = await bcrypt.hash('hussein@123', 10);

    const user = await prisma.user.create({
        data: {
            username: 'hussein',
            email: 'hussein@example.com',
            firstName: 'Hussein',
            lastName: 'Tirawi',
            password: hashedPassword,
        },
    });

    console.log('New user created:', user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
