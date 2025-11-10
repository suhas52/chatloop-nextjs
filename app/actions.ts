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
