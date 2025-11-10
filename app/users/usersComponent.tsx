"use client";

import { redirect } from "next/navigation";
import { getConversation } from "../actions";

export default function UsersComponent({users, loggedUser}) {


    async function handleClick(id: any) {
        const conversation = await getConversation(loggedUser.id, id);
        
        redirect(`/messages/${conversation}`)
        
    }

    return users.map((user) => {
        return <div key={user.id}>
            <div onClick={() => handleClick(user.id)}>{user.id !== loggedUser.id && user.first_name}</div>
        </div>
    })
} 