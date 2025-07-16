import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  error?: boolean;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length = 6, error }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle input change and auto-focus next
  const handleChange = (index: number, newValue: string) => {
    const newOtp = value.split('');
    newOtp[index] = newValue;
    onChange(newOtp.join(''));
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to focus previous
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    onChange(pastedData);
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex gap-2 justify-center" role="group" aria-label="OTP input">
      {Array.from({ length }, (_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-lg font-semibold border-2 ${error ? 'border-destructive' : 'border-input'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
          pattern="[0-9]*"
          inputMode="numeric"
          aria-label={`OTP digit ${index + 1}`}
          aria-invalid={!!error}
          aria-required="true"
        />
      ))}
    </div>
  );
};

export default OtpInput;
