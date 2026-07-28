/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProperties } from "../../_actions/propertiesAction"; 
import { PropertyCard, IProperty } from "./propertiesCard"; 

type PublicPropertiesListProps = {
  searchParams?: {
    search?: string;
    category?: string;
    city?: string;
  };
};

export async function PublicPropertiesList({ searchParams }: PublicPropertiesListProps) {
  const result = await getAllProperties(searchParams);
  
  const propertiesData = result?.data;
  
  const finalProperties: IProperty[] = Array.isArray(propertiesData) 
    ? propertiesData 
    : (Array.isArray(propertiesData?.data) ? propertiesData.data : []);

  if (!finalProperties || finalProperties.length === 0) {
    return (
      <div className="py-16 text-center bg-neutral-50 rounded-xl w-full border border-dashed border-neutral-200">
        <p className="text-muted-foreground font-medium">
          No properties found in the database.
        </p>
        <p className="text-xs text-neutral-400 mt-1">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {finalProperties.map((property: any) => (
          <PropertyCard key={property.id || property._id} property={property} />
        ))}
      </div>
    </div>
  );
}
