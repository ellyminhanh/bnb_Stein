'use client';

import Modal from "./Modal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";
import apiService from "@/app/services/apiService";
import { handleLogin } from "@/app/lib/actions";
import { sign } from "crypto";

const SignupModal = () => {

    // var
    const router = useRouter();
    const signupModal = useSignupModal();
    const [email,setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // function

    const submitSignup = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form from reloading the page
        setErrors([]); // Clear previous errors
        setLoading(true);
        const formdata = {
            email: email,
            password1:password1,
            password2:password2
        }


        const response = await apiService.postWithoutToken('/api/auth/register/',JSON.stringify(formdata));
        
        if(response.access){

            handleLogin(response.user.pk, response.access, response.refresh); 

            signupModal.close();
            router.push('/')

        }else {
            const tmpErrors: string[] = [];
            if (response.email) tmpErrors.push(...response.email);
            if (response.password1) tmpErrors.push(...response.password1);
            if (response.password2) tmpErrors.push(...response.password2);
            setErrors(tmpErrors);
        }

    }

const content = (
        <>
            <h2 className="mb-6 text-2xl justify-center flex"> Welcome to Airbnb, please Signup</h2>
            <form
                onSubmit={submitSignup} 
                className="space-y-4"
                >
                <input onChange={(e) => setEmail(e.target.value)} placeholder="Type in your email" type="email" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword1(e.target.value)} placeholder="Type in your password" type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" />
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Repeat password" type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" />
                
                {errors.map((error, index) => {
                    return(
                        <div 
                            key={`error_${index}`}
                            className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                            {error}
                        </div>
                    )
                })}
                
                
                <CustomButton
                    label="Submit"
                    onClick={submitSignup}
                />
            </form>
        </>
    )

    return (
            <Modal 
                    isOpen = {signupModal.isOpen}
                    close = {signupModal.close}
                    label="Sign Up"    
                    content={content}
            />

    )
}

export default SignupModal