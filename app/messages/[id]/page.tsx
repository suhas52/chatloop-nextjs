import { PrismaClient } from '../../generated/prisma/client'
import { getUser } from '../../lib/jwt';
import MessageForm from './messageForm';

const prisma = new PrismaClient();

export default async function Messages( {params}: any) {
    const id = (await params).id;
    const conversation = await prisma.conversation.findUnique({
        where: {
            id: id,
        },
        
        select: {
            id: true,
            user1Id: true,
            user2Id: true
        }
    })
    const messages = await prisma.message.findMany({
        where: {
            conversationId: id
        },
        select: {
            content: true,
            sender: {
                select: {
                    username: true,
                    id: true
                }
            },
            receiver: {
                select: {
                    username: true,
                    id: true
                }
            },
            id: true
        }
    })
    const loggedUser = await getUser();

    

    return <MessageForm messages={messages} loggedUser={loggedUser} conversation={conversation}/>
}