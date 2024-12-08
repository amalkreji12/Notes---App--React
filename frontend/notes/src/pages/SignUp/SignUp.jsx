import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar';
import InputPassword from '../../components/Input/InputPassword';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';


function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter a name")
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    setError("")

    //API

  };

  return (
    <div>
      <NavBar />

      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>

          <form onSubmit={handleSignUp}>

            <h4 className='text-2xl mb-7'>SignUp</h4>

            <input type="text" className='input-box' placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input type="text" className='input-box' placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              Create Account
            </button>

            <p className='text-sm text-center mt-4'>
              Already registred ?{""}
              <Link to='/login' className='font-medium text-primary underline'>
                Login
              </Link>
            </p>



          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp