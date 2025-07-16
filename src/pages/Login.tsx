import LoginForm from "@/components/Auth/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-500">
            Welcome to Gemini Chat
          </CardTitle>
          <p className="text-muted-foreground">
            {step === "phone"
              ? "Enter your phone number to get started"
              : "Enter the verification code sent to your phone"}
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm step={step} setStep={setStep} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
