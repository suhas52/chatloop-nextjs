import { PrismaClient } from '../generated/prisma/client'

const prisma = new PrismaClient();
const users = await prisma.user.findMany()

export default function Users() {
    return <h1>Test {console.log(users)}</h1>
}