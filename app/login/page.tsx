function LoginForm() {
    return <div className="">
        <form className="p-2 flex-col">
            <label>Username:</label>
            <input name="username" type="text" className="border"/>
            <label>Password:</label>
            <input name="password" type="password" className="border" />
            <input type="submit" />
        </form>
    </div>
}

export default LoginForm;