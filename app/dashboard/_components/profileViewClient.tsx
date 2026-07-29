"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updateProfileAction } from "../_actions/profileAction";
import { toast } from "sonner";
import { Phone, MapPin, AlignLeft, User, Mail, Edit2, Loader2, Image as ImageIcon } from "lucide-react";

// জড ভ্যালিডেশন স্কিমা
const profileSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  profileImage: z.string().url("Please provide a valid image URL"),
  bio: z.string().min(10, "Bio must be at least 10 characters long"),
});

export default function ProfileViewClient({ profileData, userEmail }: { profileData: any; userEmail: string }) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // রিঅ্যাক্ট হুক ফর্ম বাইন্ডিং
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: profileData?.phone || "",
      address: profileData?.address || "",
      profileImage: profileData?.profileImage || "https://unsplash.com",
      bio: profileData?.bio || "",
    }
  });

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const result = await updateProfileAction(data);
      if (result.success) {
        toast.success(result.message);
        setOpen(false); // সফল হলে মডাল বন্ধ হবে
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* 🏡 ১. লাক্সারি প্রোফাইল ডিসপ্লে কার্ড (ইউজার প্রথমে এটি দেখবে) */}
      <Card className="border border-neutral-100 rounded-3xl bg-white shadow-xl shadow-neutral-100/40 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-32 h-24 bg-rose-50 rounded-full blur-2xl opacity-60" />
        
        <CardContent className="p-6 md:p-8 space-y-6 relative z-10">
          {/* প্রোফাইল পিকচার এবং নাম-ইমেইল রো */}
          <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-neutral-100/80 pb-6">
            <div className="w-20 h-24 sm:w-24 bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 shadow-inner relative shrink-0">
              <img 
                src={profileData?.profileImage || "https://unsplash.com"} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left space-y-1 flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-500">Verified Tenant</p>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Active Tenant User</h2>
              <p className="text-xs text-neutral-400 font-medium flex items-center justify-center sm:justify-start gap-1.5 truncate">
                <Mail size={13} className="text-neutral-400" /> {userEmail || "tenant@rentnest.com"}
              </p>
            </div>

            {/* 🎯 এডিট প্রোফাইল মডাল ট্রিগার বাটন */}
            {/* <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-xl border-neutral-200 text-gray-700 font-bold text-xs h-10 px-4 cursor-pointer hover:bg-neutral-50 active:scale-95 flex items-center gap-1.5 shrink-0 shadow-sm mt-3 sm:mt-0">
                  <Edit2 size={13} /> Edit Profile
                </Button>
              </DialogTrigger> */}
              <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger>
    <div 
      role="button"
      tabIndex={0}
      className="rounded-xl border border-neutral-200 text-gray-700 font-bold text-xs h-10 px-4 cursor-pointer hover:bg-neutral-50 active:scale-95 flex items-center gap-1.5 shrink-0 shadow-sm mt-3 sm:mt-0 select-none bg-white transition-all inline-flex items-center justify-center"
    >
      <Edit2 size={13} /> Edit Profile
    </div>
  </DialogTrigger>
              
              {/* 🛠️ পপ-আপ এডিট ফর্ম মডাল কন্টেন্ট */}
              <DialogContent className="bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl max-w-[420px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Update Profile</DialogTitle>
                  <p className="text-xs text-neutral-400">Modify your secure credentials below.</p>
                </DialogHeader>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-0.5 flex items-center gap-1"><Phone size={12} /> Contact Number</label>
                    <Input {...register("phone")} className="rounded-xl h-11 focus-visible:ring-rose-500" />
                    {errors.phone && <p className="text-[10px] text-rose-500 font-semibold">{errors.phone.message as string}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-0.5 flex items-center gap-1"><MapPin size={12} /> Present Address</label>
                    <Input {...register("address")} className="rounded-xl h-11 focus-visible:ring-rose-500" />
                    {errors.address && <p className="text-[10px] text-rose-500 font-semibold">{errors.address.message as string}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-0.5 flex items-center gap-1"><ImageIcon size={12} /> Profile Image URL</label>
                    <Input {...register("profileImage")} className="rounded-xl h-11 focus-visible:ring-rose-500" />
                    {errors.profileImage && <p className="text-[10px] text-rose-500 font-semibold">{errors.profileImage.message as string}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-0.5 flex items-center gap-1"><AlignLeft size={12} /> Rental Bio</label>
                    <Textarea {...register("bio")} rows={3} className="rounded-xl resize-none focus-visible:ring-rose-500" />
                    {errors.bio && <p className="text-[10px] text-rose-500 font-semibold">{errors.bio.message as string}</p>}
                  </div>

                  <Button type="submit" disabled={isPending} className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold rounded-xl mt-3 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50">
                    {isPending ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Saving...</span></> : "Save Changes"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* ডাটা ভিউ ফিল্ডসমূহ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 text-sm font-semibold">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1"><Phone size={13} className="text-rose-500" /> Phone Number</span>
              <p className="text-gray-800 bg-neutral-50 border border-neutral-100 px-4 py-3 rounded-xl font-mono">{profileData?.phone || "Not provided yet"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1"><MapPin size={13} className="text-rose-500" /> Address Location</span>
              <p className="text-gray-800 bg-neutral-50 border border-neutral-100 px-4 py-3 rounded-xl truncate">{profileData?.address || "Not provided yet"}</p>
            </div>
          </div>

          {/* বায়ো ভিউ বক্স */}
          <div className="space-y-1 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1"><AlignLeft size={13} className="text-rose-500" /> About Me / Bio Description</span>
            <p className="text-gray-600 bg-neutral-50 border border-neutral-100 px-4 py-4 rounded-xl text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line">
              {profileData?.bio || "Tell landlords about your renting profiles or employment to build immediate marketplace trust."}
            </p>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}
