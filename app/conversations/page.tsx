import { getUser } from "../lib/jwt";
import { PrismaClient } from '../generated/prisma/client'
import Convos from "./conversationsComponent";


const prisma = new PrismaClient();
const user = await getUser() as any;



const conversations = await prisma.conversation.findMany({
  where: {
    OR: [
      { user1Id: user.id },
      { user2Id: user.id },
    ],
  },
  select: {
    id: true,
    user1: {
        select: {
            id: true,
            username: true
        }
    },
    user2: {
        select: {
            id: true,
            username: true
        }
    }
  }
});

export default function Conversations() {
    return <Convos conversations={conversations} loggedUser={user}/>
}