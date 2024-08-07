import { useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
// import { auth } from '../firebase';
import { AuthContext } from '../components/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  console.log(currentUser);

  const auth = getAuth();

  const { user } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  console.log(email);
  console.log(password);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await fetch('url'),
      // const data = await response.json()
      // console.log(data)
      const response = await signInWithEmailAndPassword(auth, email, password);
      // console.log(response.user);
      setCurrentUser(response.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h3>Login</h3>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmail}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button class="btn btn-primary" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}
