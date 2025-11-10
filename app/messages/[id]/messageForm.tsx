"use client";

import { sendMessage } from "../../actions";
import { useRouter } from "next/navigation";


export default function MessageForm({messages, loggedUser, conversation}) {

    function handleSubmit(event: Event) {
        // const router = useRouter();
        
        const message = event.target.messageContent.value;
        console.log(loggedUser.id, conversation)
        if (loggedUser.id === conversation.user1Id) {
            sendMessage(loggedUser.id, conversation.user2Id, message, conversation.id)
        }
        else {
            sendMessage(conversation.user2Id, loggedUser.id, message, conversation.id)
        }
        // router.refresh(); 

    }

    return <div>
        {console.log(messages)}
    {messages.map((message) => {
        return <div key={message.id}>{message.sender.username}: {message.content}</div>
    })}

    <form onSubmit={(e) => handleSubmit(e)}>
        <input name="messageContent" className='border rounded-2xl'/>
        <input type="submit"  />
    </form>
    </div>
}