import Main from '/src/pages/Main';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Edit from '/src/pages/Edit';
import Login from '/src/pages/Login';
import SignUp from '/src/pages/SignUp';
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <>
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
