import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CountrySelect from './CountrySelect';
import OtpInput from './OtpInput';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const phoneSchema = z.object({
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  countryCode: z.string().min(2, 'Please select a country'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

interface LoginFormProps {
  step: 'phone' | 'otp';
  setStep: React.Dispatch<React.SetStateAction<'phone' | 'otp'>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ step, setStep }) => { 
  const [phoneData, setPhoneData] = useState<PhoneFormData | null>(null);
  const [dialCode, setDialCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: '',
      countryCode: '',
    },
  });

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onPhoneSubmit = async (data: PhoneFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setPhoneData(data);
      setStep('otp');
      setIsLoading(false);
      toast.success(`Verification code sent to ${dialCode} ${data.phone}`);
    }, 1500);
  };

  const onOtpSubmit = async (data: OtpFormData) => {
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      if (data.otp === '123456') {
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          phone: phoneData!.phone,
          countryCode: phoneData!.countryCode,
          isAuthenticated: true,
        };
        setUser(user);
        navigate("/")
        toast.success('You have been successfully logged in.');
      } else {
        toast.error('Please enter the correct verification code (123456 for demo).');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCountryChange = (countryCode: string, dialCodeValue: string) => {
    phoneForm.setValue('countryCode', countryCode);
    setDialCode(dialCodeValue);
  };

  return (
          step === 'phone' ? (
            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country<span className='text-destructive'>*</span></Label>
                <CountrySelect
                  value={phoneForm.watch('countryCode')}
                  onChange={handleCountryChange}
                />
                {phoneForm.formState.errors.countryCode && (
                  <p className="text-sm text-destructive">
                    {phoneForm.formState.errors.countryCode.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number<span className='text-destructive'>*</span></Label>
                <div className="flex gap-2">
                  <div className="w-20 px-3 py-2 border rounded-md bg-muted text-center text-sm">
                    {dialCode || '+1'}
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    {...phoneForm.register('phone')}
                    className="flex-1"
                  />
                </div>
                {phoneForm.formState.errors.phone && (
                  <p className="text-sm text-destructive">
                    {phoneForm.formState.errors.phone.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  Code sent to {dialCode} {phoneData?.phone}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <OtpInput
                  value={otpForm.watch('otp')}
                  onChange={(value) => otpForm.setValue('otp', value)}
                  error={!!otpForm.formState.errors.otp}
                />
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-destructive">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  Use 123456 for demo purposes
                </p>
              </div>

              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Continue'
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => setStep('phone')}
                >
                  Back to Phone Number
                </Button>
              </div>
            </form>
          )
    //      </CardContent>
    //   </Card>
    // </div> 
  );
};

export default LoginForm;
