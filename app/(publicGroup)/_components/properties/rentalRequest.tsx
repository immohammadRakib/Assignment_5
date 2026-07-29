"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../_actions/bookingSchema";
import { requestToRentAction } from "../../_actions/bookingAction";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Phone, Calendar, Clock } from "lucide-react";

export function RentalRequestModal({ propertyId, price }: { propertyId: string, price: number }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { propertyId, phone: "", checkInDate: "", stayDuration: 1 }
  });

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const result = await requestToRentAction(data);
      if (result.success) {
        toast.success("Booking request sent! Wait for landlord approval.");
        reset();
        setOpen(false);
      } else {
        toast.error(result.message || "Failed to submit request.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogTrigger className="w-full block border-none p-0 bg-transparent outline-none">
  <div 
    role="button"
    tabIndex={0}
    className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center select-none active:scale-[0.98] px-4"
  >
    Request to Rent 
  </div>
</DialogTrigger>

      <DialogContent className="bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Booking Details</DialogTitle>
          <p className="text-xs text-neutral-400">Fill in the details to send request to host.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-4">
          <input type="hidden" {...register("propertyId")} />

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-1 flex items-center gap-1">
              <Phone size={12} /> Phone Number
            </label>
            <Input {...register("phone")} placeholder="017XXXXXXXX" className={`rounded-xl h-11 focus-visible:ring-rose-500 ${errors.phone ? "border-rose-500" : "border-neutral-200"}`} />
            {errors.phone && <p className="text-[10px] text-rose-500 font-medium pl-1">{errors.phone.message as string}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-1 flex items-center gap-1">
                <Calendar size={12} /> Check-in
              </label>
              <Input {...register("checkInDate")} type="date" className="rounded-xl h-11 focus-visible:ring-rose-500 border-neutral-200" required />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-1 flex items-center gap-1">
                <Clock size={12} /> Days
              </label>
              <Input {...register("stayDuration")} type="number" min={1} className="rounded-xl h-11 focus-visible:ring-rose-500 border-neutral-200" required />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending} 
            className="w-full h-12 bg-gray-900 hover:bg-black text-white rounded-xl mt-4 font-bold shadow-md transition-all active:scale-[0.97] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              "Confirm Request"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
