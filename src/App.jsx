
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Login';
import { Olvidar } from './Olvidar';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/recuperar-password" element={<Olvidar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
