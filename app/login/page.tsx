"use client"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassoword] = useState("");

    const router = useRouter();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            console.log(result.error);
        } else {
           router.push("/");
        }

    }
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassoword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <button onClick={() => router.push("/register")}>Register here</button>
        </div>
    );
}

export default LoginPage;