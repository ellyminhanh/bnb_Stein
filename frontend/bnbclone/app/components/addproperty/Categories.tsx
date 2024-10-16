import Image from "next/image";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="flex flex-row items-center justify-between space-x-4 mb-8"> {/* Added mb-8 for spacing */}
                {/* Category Item - Newest */}
                <div
                    onClick={() => setCategory('Newest')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Newest' ? 'border-gray-900' : 'border-transparent'} 
                        opacity-60 hover:border-gray-200 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer`}
                >
                    <Image
                        src="/icn_icon.png"
                        alt="icons"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Newest</span>
                </div>

                {/* Category Item - Bungee */}
                <div
                    onClick={() => setCategory('Bungee')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Bungee' ? 'border-gray-900' : 'border-transparent'} 
                        opacity-60 hover:border-gray-200 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer`}
                >
                    <Image
                        src="/icn_bungee.png"
                        alt="icons"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Bungee</span>
                </div>

                {/* Category Item - Room */}
                <div
                    onClick={() => setCategory('Room')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Room' ? 'border-gray-900' : 'border-transparent'} 
                        opacity-60 hover:border-gray-200 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer`}
                >
                    <Image
                        src="/icn_room.png"
                        alt="icons"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Room</span>
                </div>

                {/* Category Item - Villa */}
                <div
                    onClick={() => setCategory('Villa')}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${dataCategory === 'Villa' ? 'border-gray-900' : 'border-transparent'} 
                        opacity-60 hover:border-gray-200 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer`}
                >
                    <Image
                        src="/icn_villa.png"
                        alt="icons"
                        width={20}
                        height={20}
                    />
                    <span className="text-xs">Villa</span>
                </div>
            </div>

            
        </>
    );
}

export default Categories;
