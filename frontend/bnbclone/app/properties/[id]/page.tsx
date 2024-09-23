import Image from "next/image";
import ReservationSidebar from "@/app/components/properties/ReservationSidebar";

const PropertyDetailPage = () => {
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
                <h1 className="mb-4 text-4xl">Name</h1>
                <span className="mb-6 block text-lg text-gray-600">
                    4 Guests - 2 Bedrooms - 1 bathroom
                </span>

                <hr />

                <div className="py-6 flex items-center space-x-4">

                    <Image
                        src = "/profile_pic_1.jpg"
                        alt="profile pics"
                        width={70}
                        height={60}
                        className="rounded-full">
                    </Image>
                

                    <p><strong>John Doe </strong>is your host</p>
                    
                </div>
                <hr />
                <p className="mt-6 text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos assumenda ratione perferendis laboriosam, at officiis expedita tempore sint numquam omnis minus dolor dolorum qui, explicabo quae, quas perspiciatis nulla voluptate?
                </p>
            </div>
            
            <ReservationSidebar />
          </div>

    </main>
  )
};

export default PropertyDetailPage;