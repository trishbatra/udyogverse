import { useState } from 'react';
import { Input } from './ui/input';
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ className = '', ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-input-wrap">
      <Input
        {...props}
        type={visible ? 'text' : 'password'}
        className={`password-input-field ${className}`}
      />
      <button
        type="button"
        className="password-eye-btn"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}
