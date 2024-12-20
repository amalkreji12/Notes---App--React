import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Link, useNavigate } from "react-router-dom"
import InputPassword from '../../components/Input/InputPassword'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("")


    //Login API call

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      console.log('login response :', response);

      if (response.data && response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error(error)
      };
    };

  }

  return (
    <div>
      <NavBar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>

          <form onSubmit={handleLogin}>

            <h4 className='text-2xl mb-7'>Login</h4>

            <input type="text" className='input-box' placeholder='Email' value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              Login
            </button>

            <p className='text-sm text-center mt-4'>
              No account ?{""}
              <Link to='/signup' className='font-medium text-primary underline'>
                Create a new account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login