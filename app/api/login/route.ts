import { NextResponse } from "next/server";
import { signToken } from "../../lib/jwt";
import bcrypt from "bcryptjs";
import { PrismaClient } from '../../generated/prisma/client'
const prisma = new PrismaClient()


export async function POST(req: Request) {
    const { username, password } = await req.json();
    console.log(username, password)
    const user = await prisma.user.findUnique({
        select: {
            username: true,
            password_hash: true,
            id: true
        },
        where: {
            username: username
        }
    })
    if (user) {
        const match = await bcrypt.compare(password, user.password_hash)
        if (match) {
            const token = signToken({ username: username,
                id: user.id
             });
            
            const res = NextResponse.json({ success: true });
            res.cookies.set('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24
            })
            return res
        } 
        else {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
    } 
    else {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }   
}