"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { z } from 'zod';

export default function Page() {
  const [error, setError] = useState("");
  const router = useRouter();

  const usernameSchema = z.string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must be no longer than 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters, numbers, and underscores");

  const emailSchema = z.string().email({ message: "Email is invalid" });
  const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    const userNameValidation = usernameSchema.safeParse(userName)
    const emailValidation = emailSchema.safeParse(email);
    const passwordValidation = passwordSchema.safeParse(password);

    if(!userNameValidation){
      setError(emailValidation.error.errors[0].message)
      return ;
    }

    if (!emailValidation.success) {
      setError(emailValidation.error.errors[0].message);
      return;
    }

    if (!passwordValidation.success) {
      setError(passwordValidation.error.errors[0].message);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          userName,
          email,
          password
        })
      });

      console.log("Response status:", res.status); // Debugging log

      if (res.status === 400) {
        setError('This email is already registered');
      } else if (res.status === 200) {
        setError('');
        router.push("/sign-in");
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError("Error, try again");
      console.error('Error during registration:', error); // Debugging log
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#d8f0ff] p-8 rounded shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <Image src='/images/indata.png' alt="indata" className="image" width={100} height={100} />
        </div>

        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>

        <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="w-full border border-gray-300 text-primary rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="User Name"
            required
          />
         
          <input
            type="text"
            className="w-full border border-gray-300 text-primary rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          {error && <p className="text-red-600 text-[16px] mb-4">{error}</p>}
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="block text-center text-blue-500 hover:underline mt-2"
          href="/sign-in"
        >
          Login with an existing account
        </Link>
      </div>
    </div>
  );
}
