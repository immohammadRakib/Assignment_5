"use client";

import { useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateProfileAction } from "../_actions/profileAction";
import { ImageUploader } from "@/components/shared/imageUploader";
import { toast } from "sonner";
import { Loader2, Phone, MapPin, AlignLeft, ImageIcon } from "lucide-react";

// 🎯 ম্যান্ডেটরি জড ভ্যালিডেশন স্কিমা
const profileSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  profileImage: z.string().url("Please provide a valid image URL"),
  bio: z.string().min(10, "Bio must be at least 10 characters long"),
});

interface ProfileFormClientProps {
  initialData: any;
  onSuccess: () => void; // 🎯 মডাল বন্ধ করার জন্য সাকসেস কলব্যাক
}

export default function ProfileFormClient({ initialData, onSuccess }: ProfileFormClientProps) {
  const [isPending, startTransition] = useTransition();

  // 🎯 control অবজেক্ট এক্সট্র্যাক্ট করা হয়েছে যাতে কাস্টম প্লাস বাটন ইমেজ উন্ডো কাজ করে
//   const { register, handleSubmit, control, formState: { errors } } = useForm({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       phone: initialData?.phone || "",
//       address: initialData?.address || "",
//       profileImage: initialData?.profileImage || "",
//       bio: initialData?.bio || "",
//     }
//   });

const { register, handleSubmit, control, formState: { errors } } = useForm({
  resolver: zodResolver(profileSchema),
  defaultValues: {
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    // 🎯 ফিক্স ৩: হার্ডকোডেড লিঙ্ক কেটে পিওর ব্ল্যাঙ্ক স্ট্রিং করা হলো, যাতে ডাটাবেসে না থাকলে ডিরেক্ট প্লাস বাটন আসে
    profileImage: initialData?.profileImage || "", 
    bio: initialData?.bio || "",
  }
});

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const result = await updateProfileAction(data);
      if (result.success) {
        toast.success(result.message);
        onSuccess(); // 🎯 ডাটাবেস আপডেট সফল হলে মডালটি অটোমেটিক বন্ধ হয়ে যাবে
      } else {
        toast.error(result.message || "Failed to save profile changes.");
      }
    });
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative z-10 select-none">
    <form 
  onSubmit={handleSubmit(onSubmit)} 
  onDragOver={(e) => e.preventDefault()} // 🎯 ফর্ম লেভেলের ব্রাউজার রিডাইরেক্ট লক
  className="space-y-5 relative z-10 select-none"
>
      
      {/* 📸 প্লাস (+) বাটন এবং ড্র্যাগ/ড্রপ কাস্টম ইমেজ আপলোডার সেকশন */}
      <div className="flex flex-col items-center justify-center space-y-2 border-b border-neutral-50 pb-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
          <ImageIcon size={12} /> Profile Avatar Photograph
        </label>
        <Controller
          control={control}
          name="profileImage"
          render={({ field: { value, onChange } }) => (
            <ImageUploader value={value} onChange={onChange} />
          )}
        />
        {errors.profileImage && (
          <p className="text-[10px] text-rose-500 font-bold mt-1">
            {errors.profileImage.message as string}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
          <Phone size={11} /> Contact Number
        </label>
        <Input 
          {...register("phone")} 
          className="rounded-xl h-11 focus-visible:ring-rose-500 border-neutral-200 text-xs font-semibold text-gray-800" 
        />
        {errors.phone && <p className="text-[10px] text-rose-500 font-semibold">{errors.phone.message as string}</p>}
      </div>

      {/* Address */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
          <MapPin size={11} /> Home Address
        </label>
        <Input 
          {...register("address")} 
          className="rounded-xl h-11 focus-visible:ring-rose-500 border-neutral-200 text-xs font-semibold text-gray-800" 
        />
        {errors.address && <p className="text-[10px] text-rose-500 font-semibold">{errors.address.message as string}</p>}
      </div>

      {/* Bio Description */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
          <AlignLeft size={11} /> Rental Bio
        </label>
        <Textarea 
          {...register("bio")} 
          rows={3} 
          className="rounded-xl resize-none focus-visible:ring-rose-500 border-neutral-200 text-xs font-medium text-gray-600" 
        />
        {errors.bio && <p className="text-[10px] text-rose-500 font-semibold">{errors.bio.message as string}</p>}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={isPending} 
        className="w-full h-11 bg-gray-900 hover:bg-black text-white font-bold rounded-xl mt-2 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50 text-xs"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Syncing Cloud Base...</span>
          </>
        ) : (
          "Save Secure Changes"
        )}
      </Button>

    </form>
  );
}
