import { configDotenv } from "dotenv";
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';
const SECRET = process.env.JWT_SECRET as string;

configDotenv();

if (!SECRET) {
    throw new Error('JWT_SECRET is missing in environment variables');
}

export function signToken(payload: object) {
    const token = jwt.sign(payload, SECRET, {
        expiresIn: '1h'
    })
    return token;
    
}

export function verifyUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export async function getUser() {
    const cookieStore = await cookies(); 
    const token = cookieStore.get('token')?.value;
    
    if (!token) return null;

    try {
        const user = jwt.verify(token, SECRET)
        return user;
        
    } catch {
        console.log("catch test")
    }
}