'use client';

import Modal from "./Modal";

import { useState } from "react";
import useSignupModal from "@/app/hooks/useSignupModal";
import CustomButton from "../forms/CustomButton";

const SignupModal = () => {
    const signupModal = useSignupModal()

    const content = (
        <>
            <h2 className="mb-6 text-2xl justify-center flex"> Welcome to Airbnb, please Signup</h2>
            <form className="space-y-4">
                <input placeholder="Type in your email" type="email" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" />
                <input placeholder="Type in your password" type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" />
                <input placeholder="Repeat password" type="password" className="w-full h-[54px] border px-4 border-gray-300 rounded-xl" />
                
                <div className="p-5 bg-airbnb text-white rounded-xl opacity-80">
                    Errors
                </div>
                
                <CustomButton
                    label="Submit"
                    onClick= {() => console.log('Clicked button')}
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