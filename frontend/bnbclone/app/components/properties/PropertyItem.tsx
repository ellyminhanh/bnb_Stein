import Image from "next/image";
import { PropertyType } from "./PropertyList";
import { useRouter } from "next/navigation";
import FavoriteButton from "../FavoriteButton";

interface PropertyProps{
    property: PropertyType,
    markedFavorite?: (is_favorite:boolean) => void;
}

const PropertyItems: React.FC<PropertyProps> = ({
    property,
    markedFavorite
}) => {
    const router = useRouter();
    return (
        <div 
            className="cursor-pointer"
            onClick={() =>router.push(`/properties/${property.id}`)}
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill={true}
                    priority={true}
                    src={property.image_url}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px) 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full" 
                    alt="Beach house"
                />

                {markedFavorite && (
                    <FavoriteButton
                        id = {property.id}
                        is_favorite= {property.is_favorite}
                        markedFavorite={(is_favorite:any)=> markedFavorite(is_favorite)}
                    />
                )}

            </div>

            <div className="mt-2">
                <div className="text-lg font-bold">{property.title} </div>
            </div>

            <div className="mt-2 ">
                <p className="text-sm text-gray-500"><strong>$ {property.price_per_night} </strong>per night</p>
            </div>

        </div>
    )
};

export default PropertyItems;