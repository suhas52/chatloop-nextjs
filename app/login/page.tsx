"use client"

import axios from "axios";

function LoginForm() {

    async function handleSubmit(formData: FormData) {
        const response = await axios.post('http://localhost:3000/api/login', {
            username: formData.get('username'),
            password: formData.get('password')
        })
    }

    return <div>
        <form className="p-2 flex-col" action={handleSubmit}>
            <label>Username:</label>
            <input name="username" type="text" className="border"/>
            <label>Password:</label>
            <input name="password" type="password" className="border" />
            <input type="submit" />
        </form>
    </div>
}

export default LoginForm;