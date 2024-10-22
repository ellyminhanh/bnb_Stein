import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";
import apiService from "@/app/services/apiService";
import { getUserID } from "@/app/lib/actions";
import Link from "next/link";

const PropertyDetailPage = async ({params}:{params:{id:string }}) => {
  const property = await apiService.get(`/api/properties/${params.id}`)
  const userID = await getUserID();

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">      
        <div className="w-full h-[60vh] mb-4 overflow-hidden rounded-xl relative">
          <Image
            fill
            src="/beach_1.jpg"
            className="object-cover w-full h-full"
            alt="beach house"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="py-6 pr-6 col-span-3">
                <h1 className="mb-4 text-4xl">{property.title}</h1>
                <span className="mb-6 block text-lg text-gray-600">
                    {property.guests} Guests - {property.bedrooms} Bedrooms - {property.bathrooms} Bathrooms
                </span>

                <hr />

                <Link 
                  href={`/landlord/${property.landlord.id}`}
                  className="py-6 flex items-center space-x-4"
                >
                  {property.landlord.url && (
                     <Image
                     src = {property.landlord.avatar_url}
                     alt="profile pics"
                     width={70}
                     height={60}
                     className="rounded-full">
                 </Image>
                  )}

                    <p><strong>{property.landlord.name} </strong>is your host</p>
                    
                </Link>
                <hr />
                <p className="mt-6 text-lg">
                    {property.description}
                </p>
            </div>
            
            <ReservationSidebar
              property={property}
              userID={userID}
            />
          </div>

    </main>
  )
};

export default PropertyDetailPage;