// import React from 'react'
import Switcher from './Switcher'
import img1 from "../Static/india-flag.svg"
import { Link, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import Login from './Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
import { Request, setAuthHeader } from '../helper/axios_helper';
const Navbar = () => {
  const navigate = useNavigate("");
    const [formData, setFormData] = useState({
      
        login: '',
        password: '',
    });
    const [user,setUser]=useState(null);
    const u = window.localStorage.getItem("user");
    const [singUpData,setSignUpData] = useState({
      firstName:'',
      lastName:'',
      login:'',
      password:''
  });
  const handleChangeSignup = (e)=>{
      setSignUpData({ ...singUpData, [e.target.name]: e.target.value });
  }
  
    // const tok = useSelector(state=>state.token);
    // console.log(tok);
    // const user = useSelector(state => state.user);
    // const dispatch = useDispatch();

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignupSubmit = async (e) => {
      e.preventDefault();
      if (singUpData.firstName === "") {
        toast.error("Enter your first name");
      } else if (!/^[A-Za-z\s]+$/.test(singUpData.firstName)) {
        toast.error("First name should only contain letters and spaces.");
      }
      
      if (singUpData.lastName === "") {
        toast.error("Enter your last name");
      } else if (!/^[A-Za-z\s]+$/.test(singUpData.lastName)) {
        toast.error("Last name should only contain letters and spaces.");
      }
      
      if (singUpData.login === "") {
        toast.error("Enter your username");
      } else if (singUpData.login.length < 6) {
        toast.error("Username should be at least 6 characters long.");
      }
      
      if (singUpData.password === "") {
        toast.error("Enter the password");
      } else if (singUpData.password.length < 8) {
        toast.error("Password should be at least 8 characters long.");
      } else if (!/[a-z]/.test(singUpData.password)) {
        toast.error("Password should contain at least one lowercase letter.");
      } else if (!/[A-Z]/.test(singUpData.password)) {
        toast.error("Password should contain at least one uppercase letter.");
      } else if (!/[0-9]/.test(singUpData.password)) {
        toast.error("Password should contain at least one digit.");
      }
      else{
      try {
          const response = await Request("POST", "/register", singUpData);
          console.log(response);
          if (response.status === 200) {
              const  token  = response.data.token;
              console.log(token);
              setAuthHeader(token);
              const user={
                "username": response.data.login,
                "firstName": response.data.firstName,
                "lastName": response.data.lastName,
                "id":response.data.id
              }
              window.localStorage.setItem("user",user);
              toast.success(`welcome ${user.username}`)
              setUser(user);
              setSignUpData({ firstName: '', lastName:"",username:"",password: '' });
              setError('');
          } else {
              setError('Login failed. Please check your credentials.');
          }
      } catch (error) {
          setError('Login failed. Please check your credentials.');
          console.error('Login error:', error);
      }
    }
  };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Request("POST", "/login", formData);
            console.log(response);
            if (response.status === 200) {
                const  token  = response.data.token;
                console.log(token);
                setAuthHeader(token);
                if(response.login === "admin"){
                  alert("welcome admin");
                  window.localStorage.setItem("admin",true);
              }
              const user = {
                "username": response.data.login,
                "firstName": response.data.firstName,
                "lastName": response.data.lastName,
                "id": response.data.id
            };
            
            // Store the user object as a JSON string in local storage
            window.localStorage.setItem("user", JSON.stringify(user));
            
            console.log(user);
            window.localStorage.setItem("login", true);
            setUser(user);
            setFormData({ login: '', password: '' });
            setError('');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Login error:', error);
            window.localStorage.setItem("admin",false);
            window.localStorage.setItem("login",false);
        }
    };

    const handleLogout = () => {
        window.localStorage.setItem('auth_token', null);
        setUser(null);
        window.localStorage.setItem('user', null);
        navigate("/")
    };
    const wt = window.localStorage.getItem('auth_token') === null ;
  return (
    <div className='dark:bg-black'>
        <nav className=" dark:bg-black w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a  className="flex items-center"><Link to="/home">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bloggy</span>
      </Link>
  </a>
  <div className="flex md:order-2">
  {user ?(
    <>
    <div className='text-center font-sans font-bold'>{user.username}</div>
    <button type="button" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleLogout} >Logut</button>
    </>
):(<div>
  <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-bs-toggle="modal" data-bs-target="#staticsBackdrop">
signup
</button>
<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
Login
</button></div>)}
  
      {/* <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button> */}
      
      <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="flex justify-end col-span-1"><button data-tooltip-target="navbar-solid-bg-example-toggle-dark-mode-tooltip" type="button" data-toggle-dark="light" className="flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <Switcher/>
            <span className="sr-only">Toggle dark/light mode</span>
          </button>
          <div id="navbar-solid-bg-example-toggle-dark-mode-tooltip" role="tooltip" className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 opacity-0 invisible" data-popper-placement="top" style={{position: "absolute", inset: "auto auto 0px 0px", margin: "0px" ,transform: "translate3d(804.8px, 8110.4px, 0px)"}}>Toggle dark mode</div>
          </div>
  </div>

{user ?(  <div className="items-center justify-between hidden  content-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
<ul className="flex flex-col p-1 md:p-0 mt-1 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
  <li>
    <a className="block  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page"><Link to="/posts">Posts</Link></a>
  </li>
  {window.localStorage.getItem("admin")===true? (<li>
    <a  className="block  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/posts">Admin</Link></a>
  </li>):(
    <li>
    <a  className="block  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/posts">Topics</Link></a>
  </li>
  )}
  
  <li>
    <a  className="block  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/blog">blogs</Link></a>
  </li>
  <li>
    <a  className="block  text-gray-900  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><Link to="/create">CreateNew</Link></a>
  </li>
</ul>
</div>):(
  <div></div>
)}
  </div>
</nav>

<div class="modal fade" id="staticsBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Signup</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSignupSubmit}>
      <div class="modal-body">
      <div>
            {/* {error && <div style={{ color: 'red' }}>{error}</div>}
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : ( */}
                FirstName:<input
                        type="text"
                        name="firstName"
                        placeholder="FirstName"
                        value={singUpData.firstName}
                        onChange={handleChangeSignup}
                    /><br/>
                    Last Name:<input
                        type="text"
                        name="lastName"
                        placeholder="LastName"
                        value={singUpData.lastName}
                        onChange={handleChangeSignup}
                    /><br/>

UserName: <input
                        type="text"
                        name="login"
                        placeholder="Username"
                        value={singUpData.login}
                        onChange={handleChangeSignup}
                    />
                    <br/>
                    PassWord:<input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={singUpData.password}
                        onChange={handleChangeSignup}
                    />
                    {/* <button type="submit">Login</button> */}
                
            {/* )} */}
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-bs-dismiss="modal">Signup</button>
        {/* <button type="button" class="btn btn-primary">Understood</button> */}
      </div>
      </form>
    </div>
  </div>
</div>
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Login</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div class="modal-body">
      <div>
            {/* {error && <div style={{ color: 'red' }}>{error}</div>}
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : ( */}
                
                    <input
                        type="text"
                        name="login"
                        placeholder="Username"
                        value={formData.login}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {/* <button type="submit">Login</button> */}
                
            {/* )} */}
        </div>
      </div>
      
      <div class="modal-footer">
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" data-bs-dismiss="modal">login</button>
        {/* <button type="button" class="btn btn-primary">Understood</button> */}
      </div>
      </form>
    </div>
  </div>
</div>
<ToastContainer />
    </div>
  )
}

export default Navbar