import Image from "next/image"
import apiService from "../services/apiService"

import { getUserID } from "../lib/actions"
import PropertyList from "../components/properties/PropertyList"

const MyPropertiesPage = async () => {
    const userID = await getUserID();
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">     
                <h1 className="text-2xl mb-6 my-6 ">
                    My Properties
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PropertyList 
                        landlord_id={userID}
                    />
                </div>
        </main>
    )
}

export default MyPropertiesPage