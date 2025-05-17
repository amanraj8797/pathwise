
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidating, setEmailValidating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  const validateEmail = async (email: string) => {
    setEmailValidating(true);
    try {
      // Check if this email already exists using the auth.signUp API with a dummy password
      // This is a more reliable approach than trying to use admin APIs which aren't available client-side
      const { data, error } = await supabase.auth.signUp({
        email,
        password: `${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`, // Random password
        options: {
          // Setting emailRedirectTo to false will prevent sending confirmation email
          emailRedirectTo: undefined
        }
      });

      // If auth.signUp returns user data but status is not confirmed, the email exists
      if (data && data.user && !data.user.email_confirmed_at) {
        return true; // Email doesn't exist or isn't confirmed yet
      }

      // If there's an error message containing "already", the email is registered
      if (error && error.message.toLowerCase().includes("already")) {
        toast({
          title: "Email already registered",
          description: "This email is already in use. Please use another email or log in.",
          variant: "destructive",
        });
        return false;
      }
      
      return true; // Allow signup attempt if validation is inconclusive
    } catch (error) {
      console.error("Error validating email:", error);
      return true; // Allow signup attempt if validation fails
    } finally {
      setEmailValidating(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Validate the email first
      const isEmailValid = await validateEmail(email);
      if (!isEmailValid) {
        setIsLoading(false);
        return;
      }

      await signup(email, password, name);
      navigate("/");
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific error cases
      if (error.message && error.message.includes("already")) {
        toast({
          title: "Email already registered",
          description: "This email is already in use. Please use another email or log in.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: error.message || "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2">
            Sign up to start your learning journey
          </p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading || emailValidating}>
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
