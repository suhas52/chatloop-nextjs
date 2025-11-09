import Link from "next/link";

export function Header() {
    return <header className="flex justify-between shadow-black shadow-2xs bg-green-500">
        <div className="p-2">LOGO</div>
        <div className="flex gap-2 p-2">
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
        </div>
    </header>
}