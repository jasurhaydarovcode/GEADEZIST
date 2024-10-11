import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmCode() {
  const code = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  return (
    <div>
      <input type="text" ref={code} />
      <button onClick={() => navigate('/auth/signin')}>Tasdiqlash</button>
    </div>
  );
}

export default ConfirmCode;
