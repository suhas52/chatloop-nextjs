"use client";
import { useRouter } from "next/navigation";



export default function Convos({conversations, loggedUser}: any) {
    const router = useRouter();
    return <div>
        {conversations.map((convo: any) => {
            return <div key={convo.id} onClick={() => router.push(`/messages/${convo.id}`)}>{convo.user1.username}</div>
        })}
    </div>
}