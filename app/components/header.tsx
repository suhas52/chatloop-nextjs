"use client"
import Link from "next/link";
import { useUser } from "../userContext";



export function Header() {
    const { user, isLoading } = useUser();
    return <header className="flex justify-between shadow-black shadow-2xs bg-green-500">
    <div className="p-2">LOGO</div>
    <div className="flex gap-2 p-2">
    {!user ? (
        <>
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
        </>
    ) : (
        <>
        <Link href={"/users"}>Users</Link>
        <Link href={"/"}>Conversations</Link>
        </>
    )}    
    
    </div>
    </header>
}