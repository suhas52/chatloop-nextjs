import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET as string;

export async function GET(req: NextRequest) {
    
    const cookieStore = await cookies(); 
    const token = cookieStore.get('token')?.value;
    
    if (!token) return null;
    
    
    const user = jwt.verify(token, SECRET)
    const res = NextResponse.json(user);
    
    return res;
}