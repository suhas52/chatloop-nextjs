function RegisterForm() {
    return <div>
        <form className="p-2 flex-col">
            <label>First Name:</label>
            <input name="first_name" type="text" className="border"/>
            <label>Last Name:</label>
            <input name="last_name" type="text" className="border"/>
            <label>Username:</label>
            <input name="username" type="text" className="border"/>
            <label>Password:</label>
            <input name="password" type="password" className="border" />
            <input type="submit" />
        </form>
    </div>
}

export default RegisterForm;