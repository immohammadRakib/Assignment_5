"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateProfileAction } from "../_actions/profileAction";
import { ImageUploader } from "@/components/shared/imageUploader"; // 🎯 আপলোডার ইম্পোর্ট
import { toast } from "sonner";
import {
  Phone,
  MapPin,
  AlignLeft,
  Mail,
  Edit2,
  Loader2,
  ImageIcon,
} from "lucide-react";

const profileSchema = z.object({
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  profileImage: z.string().url("Please provide a valid image URL"),
  bio: z.string().min(10, "Bio must be at least 10 characters long"),
});

export default function ProfileViewClient({
  profileData,
  userEmail,
}: {
  profileData: any;
  userEmail: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: profileData?.phone || "",
      address: profileData?.address || "",
      profileImage: profileData?.profileImage || "",
      bio: profileData?.bio || "",
    },
  });

  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const result = await updateProfileAction(data);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.error(result.message || "Failed to save profile changes.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden bg-white border border-neutral-100 rounded-3xl shadow-xl shadow-neutral-100/40 relative group">
        <div className="absolute -right-6 -top-6 w-32 h-24 bg-rose-50 rounded-full blur-2xl opacity-60" />

        <CardContent className="p-6 md:p-8 space-y-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-neutral-100/80 pb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 shadow-inner relative shrink-0">
              <img
                src={profileData?.profileImage || "https://unsplash.com"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center sm:text-left space-y-1 flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-rose-500">
                Verified Tenant
              </p>
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                Active Tenant User
              </h2>
              <p className="text-xs text-neutral-400 font-medium flex items-center justify-center sm:justify-start gap-1.5 truncate">
                <Mail size={13} /> {userEmail || "tenant@rentnest.com"}
              </p>
            </div>

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

              <DialogContent
                onDragOver={(e) => e.preventDefault()}
                className="bg-white rounded-3xl p-6 md:p-8 border-none shadow-2xl max-w-[420px]"
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
                    Update Profile
                  </DialogTitle>
                  <p className="text-xs text-neutral-400">
                    Modify your secure credentials below.
                  </p>
                </DialogHeader>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  onDragOver={(e) => e.preventDefault()}
                  className="space-y-4 pt-4"
                >
                  <div className="flex flex-col items-center justify-center space-y-2 border-b border-neutral-50 pb-2">
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

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-0.5 flex items-center gap-1">
                      <Phone size={12} /> Contact Number
                    </label>
                    <Input
                      {...register("phone")}
                      className="rounded-xl h-11 focus-visible:ring-rose-500 border-neutral-200 text-xs font-semibold text-gray-800"
                    />
                    {errors.phone && (
                      <p className="text-[10px] text-rose-500 font-semibold">
                        {errors.phone.message as string}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-0.5 flex items-center gap-1">
                      <MapPin size={12} /> Present Address
                    </label>
                    <Input
                      {...register("address")}
                      className="rounded-xl h-11 focus-visible:ring-rose-500 border-neutral-200 text-xs font-semibold text-gray-800"
                    />
                    {errors.address && (
                      <p className="text-[10px] text-rose-500 font-semibold">
                        {errors.address.message as string}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 pl-0.5 flex items-center gap-1">
                      <AlignLeft size={12} /> Rental Bio
                    </label>
                    <Textarea
                      {...register("bio")}
                      rows={3}
                      className="rounded-xl resize-none focus-visible:ring-rose-500 border-neutral-200 text-xs font-medium text-gray-600"
                    />
                    {errors.bio && (
                      <p className="text-[10px] text-rose-500 font-semibold">
                        {errors.bio.message as string}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 bg-gray-900 hover:bg-black text-white font-bold rounded-xl mt-3 flex items-center justify-center gap-2 cursor-pointer transition disabled:opacity-50 text-xs"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 text-sm font-semibold">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <Phone size={13} className="text-rose-500" /> Phone Number
              </span>
              <p className="text-gray-800 bg-neutral-50 border border-neutral-100 px-4 py-3 rounded-xl font-mono">
                {profileData?.phone || "Not provided yet"}
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <MapPin size={13} className="text-rose-500" /> Address Location
              </span>
              <p className="text-gray-800 bg-neutral-50 border border-neutral-100 px-4 py-3 rounded-xl truncate">
                {profileData?.address || "Not provided yet"}
              </p>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
              <AlignLeft size={13} className="text-rose-500" /> About Me / Bio
              Description
            </span>
            <p className="text-gray-600 bg-neutral-50 border border-neutral-100 px-4 py-4 rounded-xl text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line">
              {profileData?.bio ||
                "Tell landlords about your renting profiles or employment to build immediate marketplace trust."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
