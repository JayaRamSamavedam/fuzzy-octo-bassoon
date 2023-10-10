import React, { useState } from 'react'

const Login = () => {
    const [name,setname] = useState("");
    const [password,setpassword] = useState("");

    const onSubmit =    (e)  => {
        e.preventDefault();
        console.log(name);
        console.log(password);
        setname("");
        setpassword("");
    ;}

  return (
    <div>
        <form onSubmit={onSubmit}>
            Name:<input type="text" onChange={(e) => setname(e.target.value)} value={name}/><br></br>
            Password:<input type="password" onChange={(e) => setpassword(e.target.value)} value={password}/><br/>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login