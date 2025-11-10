"use server";
import bcrypt from 'bcryptjs';
import { PrismaClient } from './generated/prisma/client'
import { configDotenv } from "dotenv";
configDotenv();


const prisma = new PrismaClient()
const SALT = Number(process.env.SALT);

export async function registerUser(formData: FormData) {
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const hash = await bcrypt.hash(password, SALT)
    const user = await prisma.user.create({
        data: {
            first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1),
            last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1),
            username: username,
            password_hash: hash
        }
    })
}


export async function getConversation(loggedUser: any, otherUser: any) {
    const checkConvo = await prisma.conversation.findFirst({
        where: {
            OR: [
                {user1Id: loggedUser, user2Id: otherUser},
                {user1Id: otherUser, user2Id: loggedUser}
            ]
        },
        select: {
            id: true
        }
    })
    if (!checkConvo) {
        const newConvo = await prisma.conversation.create({
            data: {
                user1Id: loggedUser,
                user2Id: otherUser
            }
        })
        return newConvo.id;
    }
    return checkConvo.id
}

export async function sendMessage(sender, receiver, content, conversationId) {
    const newMessage = await prisma.message.create({
        data: {
            content: content,
            conversationId: conversationId,
            senderId: sender,
            receiverId: receiver
        }
    })
}