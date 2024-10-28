'use client';
import { useEffect, useState } from 'react';
import PropertyItems from "./PropertyItem";
import apiService from '@/app/services/apiService';

export type PropertyType = {
  id: string;
  title: string;
  image_url: string;
  price_per_night: number;
  is_favorite: boolean;
};

interface PropertyListProps {
  landlord_id?: string | null;
}

const PropertyList: React.FC<PropertyListProps> = ({ landlord_id }) => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const markedFavorite = (id: string, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id === id) {
        property.is_favorite = is_favorite;
        if (is_favorite) {
          console.log('added to favorite list');
        } else {
          console.log('remove from favorite list');
        }
      }
      return property;
    });
    setProperties(tmpProperties);
  };

  const getProperties = async () => {
    let url = '/api/properties';

    if (landlord_id) {
      url += `?landlord_id=${landlord_id}`;
    }
    const tmpProperties = await apiService.get(url);
    setProperties(tmpProperties.data.map((property:PropertyType)=>{
      if (tmpProperties.favorites.includes(property.id)){
        property.is_favorite = true
      } else {
        property.is_favorite = false
      }
      return property

    }));
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <>
      {properties.map((property) => (
        <PropertyItems
          key={property.id}
          property={property}
          markedFavorite={(is_favorite: boolean) => markedFavorite(property.id, is_favorite)}
        />
      ))}
    </>
  );
};

export default PropertyList;