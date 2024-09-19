import Image from "next/image";

const Categories = () => {
    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover: border-gray-200 hover:opacity-100">
                <Image 
                    src = "/icn_icon.png"
                    alt = "icons"
                    width = {20}
                    height={20}>
                </Image>

                <span className="text-xs">Newest</span>

            </div>

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover: border-gray-200 hover:opacity-100">
                <Image 
                    src = "/icn_bungee.png"
                    alt = "icons"
                    width = {20}
                    height={20}>
                </Image>

                <span className="text-xs">Bungee</span>

            </div>


            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover: border-gray-200 hover:opacity-100">
                <Image 
                    src = "/icn_room.png"
                    alt = "icons"
                    width = {20}
                    height={20}>
                </Image>

                <span className="text-xs">Room</span>

            </div>    

            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover: border-gray-200 hover:opacity-100">
                <Image 
                    src = "/icn_villa.png"
                    alt = "icons"
                    width = {20}
                    height={20}>
                </Image>

                <span className="text-xs">Villa</span>

            </div> 
            
        </div>
    )    
}
  
  export default Categories; 