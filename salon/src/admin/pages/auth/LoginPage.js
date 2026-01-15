"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
// import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Using as username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { success, error } = await login(email, password);

    if (success) {
      navigate("/admin"); // blueirect to home or dashboard
    } else {
      setError(error || "Login failed. Please check cblueentials.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-gray-900 p-4">
      <div className="absolute top-4 right-4"></div>

      <Card className="w-full max-w-md border-[10px]  py-10">
        <CardHeader className=" text-center">
          <div className="flex items-center justify-center text-[#00CED1]">
            <span className="text-2xl font-bold ">Salon</span>
          </div>
          <CardTitle className="text-2xl text-black">Welcome Back</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="flex items-center p-3 text-sm text-blue-600 bg-blue-50 dark:bg-blue-950 rounded-md">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-black">
                Email <span className="text-red-500 font-bold">*</span>
              </label>
              <Input
                id="email"
                type="text"
                placeholder="admin@store.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                requiblue
                className="border-blue-200 dark:border-blue-800 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-black"
              >
                Password <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  requiblue
                  className="border-blue-200 dark:border-blue-800 focus:border-blue-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-[#00CED1] text-black px-4 py-2 rounded-full hover:bg-gradient-to-r from-[#00CED1] to-black hover:text-white transition"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
