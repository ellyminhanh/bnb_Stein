import Image from "next/image";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import UserNav from "./UserNav";
import { getUserID } from "@/app/lib/actions";
import PropertyButton from "./PropertyButton";


const Navbar = async () => {
    const userID = await getUserID(); 
    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10 ">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href = "/">
                        <Image 
                            src = "/logo.png"
                            alt = "bnblogo"
                            width={180}
                            height={38}
                            />
                    </Link>

                    <div className="flex space-x-6">
                        <SearchFilter/>
                    </div>

                    <div className="flex items-center space-x-6">
                        <PropertyButton 
                            userID={userID}
                        />                        
                        <UserNav 
                            userID = {userID}
                        />
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar; 