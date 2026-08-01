import { updateProperty } from "../../../../_actions/landlordAction";
import { getPropertyDetails } from "../../../../../(publicGroup)/_actions/propertiesAction";
import { notFound } from "next/navigation";
import { EditFormWrapper } from "../../../../_components/editFromWarapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type EditPropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps) {
  const { id } = await params;

  const result = await getPropertyDetails(id);

  if (!result || !result.success || !result.data) {
    return notFound();
  }

  const property = result.data;

  return (
    <main className="min-h-screen bg-slate-50/50 pt-10 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-1 text-left border-b border-slate-200/60 pb-5">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Edit Property Listing
          </h1>
          <p className="text-sm font-medium text-slate-400">
            Update your space details, configuration, and rental configurations
            securely.
          </p>
        </div>
        <EditFormWrapper property={property} />
      </div>
    </main>
  );
}
