/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createProperty, updateProperty } from "../_actions/myPropertiesAction"; // তোমার তৈরি করা নতুন অ্যাকশন পাথ
import { IProperty } from "./myPropertyCard"; // কার্ড থেকে ইন্টারফেস ইম্পোর্ট করা হলো

type PropertyFormDialogProps = {
  mode: "create" | "edit";
  property?: IProperty;
};

export function PropertyFormDialog({ mode, property }: PropertyFormDialogProps) {
  const [open, setOpen] = useState(false);

  // ১. লেটেস্ট Next.js ১৫+ নিয়ম অনুযায়ী অ্যাকশন ডাইনামিক বাইন্ডিং
  const action = mode === "edit" && property ? updateProperty.bind(null, property.id) : createProperty;
  const [state, formAction, pending] = useActionState(action, null) as any;

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || (mode === "edit" ? "Property updated successfully!" : "Property listed successfully!"));
      setOpen(false); // ফর্ম সাবমিট সফল হলে পপআপ বন্ধ হয়ে যাবে
    } else {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="outline" size="sm" className="border-gray-200 hover:bg-neutral-50 text-gray-600 cursor-pointer">
            <PencilIcon className="size-3.5 mr-1" /> Edit
          </Button>
        ) : (
          <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg px-4 py-2 text-sm font-semibold transition cursor-pointer">
            <PlusIcon className="size-4 mr-1" /> Add New Property
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="max-w-lg bg-white rounded-xl shadow-xl border-neutral-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {mode === "edit" ? "Edit Property Details" : "List a New Property"}
          </DialogTitle>
        </DialogHeader>
        
        <form action={formAction} className="space-y-4 pt-2">
          {/* ১. প্রপার্টি টাইটেল */}
          <div className="space-y-1">
            <Label htmlFor="title" className="text-xs font-semibold text-gray-600">Property Title</Label>
            <Input id="title" name="title" defaultValue={property?.title} placeholder="e.g. Smart Bachelor Studio Apartment" required className="focus-visible:ring-rose-500" />
          </div>

          {/* ২. ডেসক্রিপশন */}
          <div className="space-y-1">
            <Label htmlFor="description" className="text-xs font-semibold text-gray-600">Description</Label>
            <Textarea id="description" name="description" defaultValue={property?.description} placeholder="Describe your property rooms, facilities..." required className="min-h-24 focus-visible:ring-rose-500" />
          </div>

          {/* ৩. লোকেশন ও সিটি (এক লাইনে দুটি ইনপুট - রেসপন্সিভ গ্রিড) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="location" className="text-xs font-semibold text-gray-600">Area/Location</Label>
              <Input id="location" name="location" defaultValue={property?.location} placeholder="e.g. Zindabazar" required className="focus-visible:ring-rose-500" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="city" className="text-xs font-semibold text-gray-600">City</Label>
              <Input id="city" name="city" defaultValue={property?.city} placeholder="e.g. Sylhet" required={mode === "create"} className="focus-visible:ring-rose-500" />
            </div>
          </div>

          {/* ৪. প্রতিদিনের ভাড়া ও ক্যাটাগরি আইডি (এক লাইনে) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="pricePerDay" className="text-xs font-semibold text-gray-600">Price Per Day (৳)</Label>
              <Input id="pricePerDay" name="pricePerDay" type="number" defaultValue={property?.pricePerDay} placeholder="e.g. 1500" required className="focus-visible:ring-rose-500" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="categoryId" className="text-xs font-semibold text-gray-600">Category ID</Label>
              <Input id="categoryId" name="categoryId" defaultValue={property?.categoryId} placeholder="Paste Category UUID" required={mode === "create"} disabled={mode === "edit"} className="focus-visible:ring-rose-500 disabled:opacity-50" />
            </div>
          </div>

          {/* ৫. ইমেজ ইউআরএল */}
          <div className="space-y-1">
            <Label htmlFor="images" className="text-xs font-semibold text-gray-600">Images (Comma separated URLs)</Label>
            <Input id="images" name="images" defaultValue={property?.images?.join(", ")} placeholder="https://image1.com, https://image2.com" className="focus-visible:ring-rose-500" />
          </div>

          {/* ৬. অ্যাভেইলেবিলিটি স্ট্যাটাস (শুধুমাত্র এডিট মোডে দেখাবে) */}
          {mode === "edit" ? (
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer py-1">
              <Checkbox name="isAvailable" defaultChecked={property?.isAvailable} className="data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500" />
              Property is currently available for rent
            </Label>
          ) : (
            // ক্রিয়েট মোডের জন্য বাই ডিফল্ট অন বা ট্রু পাস করার সেফ ফিল্ড
            <input type="hidden" name="isAvailable" value="true" />
          )}

          {/* সাবমিট বোতাম (Airbnb Style Rose Gradient) */}
          <DialogFooter className="pt-2">
            <Button 
              type="submit" 
              disabled={pending}
              className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:opacity-75"
            >
              {pending ? "Saving..." : mode === "edit" ? "Save Changes" : "List Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
