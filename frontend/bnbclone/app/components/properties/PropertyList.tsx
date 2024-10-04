'use client';
import { useEffect, useState } from 'react';
import PropertyItems from "./PropertyItem";

export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
}

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  
  const getProperties = async () => {
    const url = 'http://localhost:8000/api/properties'
    try {
      const response = await fetch(url);
      const json = await response.json();
      
      // Add this console.log to inspect the image URLs
      json.data.forEach((property: PropertyType) => {
        console.log('Image URL:', property.image_url);
      });

      setProperties(json.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getProperties()
  }, []);

  return (
    <>
      {properties.map((property) => (
        <PropertyItems
          key={property.id}
          property={property}
        />
      ))}
    </>
  )
}

export default PropertyList;