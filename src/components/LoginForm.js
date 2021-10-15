import React from 'react'

const LoginForm = ({ onSubmit, handleChange, nameValue, passwordValue }) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    Username
                    <input
                        type="text"
                        name="username"
                        value={nameValue}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={passwordValue}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
}

export default LoginForm