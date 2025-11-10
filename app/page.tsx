"use client"
import { useUser } from "./userContext";


export default function Home() {
  
  const { user, isLoading } = useUser();
  

  return (
    <div>Welcome {user && user.username}</div>
  )
}
