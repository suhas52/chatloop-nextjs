import { PrismaClient } from '../generated/prisma/client'
import { getUser } from '../lib/jwt';
import UsersComponent from './usersComponent';

const prisma = new PrismaClient();
const users = await prisma.user.findMany()
const user = await getUser();

export default function Users() {
    return <UsersComponent users={users} loggedUser={user}/>
}