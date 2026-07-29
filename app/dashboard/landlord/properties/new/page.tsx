// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createProperty } from "../../../_actions/landlordAction";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { UploadCloud, Image as ImageIcon, Link as LinkIcon, Loader2, X } from "lucide-react";

// export default function CreateListingPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
  
//   // ইমেজ মোড এবং ফাইনাল ইমেজ URL স্টেট
//   const [imageMode, setImageMode] = useState<"upload" | "link">("upload");
//   const [imageUrl, setImageUrl] = useState("");

//   // ☁️ ImgBB-তে ইমেজ আপলোড করার হ্যান্ডলার
//   const handleImageUpload = async (file: File) => {
//     if (!file) return;
    
//     // শুধু ইমেজ ফাইল ভ্যালিডেশন
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload a valid image file.");
//       return;
//     }

//     setUploadingImage(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       // ⚠️ এখানে তোমার নিজের ImgBB API Key বসাবে (ফ্রি অ্যাকাউন্ট খুলে ২ মিনিটে পাওয়া যায়)
//       // যদি কী না থাকে, তবে এই ফ্রি ডেমো কী-টি সাময়িক কাজ করবে
//       const IMGBB_API_KEY = "6bab8bd4ef72d73189d2d09f7a77d13c"; 
      
//       const response = await fetch(`https://imgbb.com{IMGBB_API_KEY}`, {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setImageUrl(data.data.url);
//         toast.success("Image uploaded to cloud successfully!");
//       } else {
//         toast.error("Cloud upload failed. Try manually entering a link.");
//       }
//     } catch (error) {
//       toast.error("Error connecting to upload server.");
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   // 🖱️ Drag & Drop হ্যান্ডলারস
//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files?.[0];
//     if (file) handleImageUpload(file);
//   };

//   // 🚀 ফর্ম সাবমিশন হ্যান্ডলার
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!imageUrl) {
//       toast.error("Please upload an image or provide a valid link first!");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData(e.currentTarget);
    
//     const payload = {
//       title: formData.get("title"),
//       description: formData.get("description"),
//       location: formData.get("location"),
//       city: formData.get("city"),
//       pricePerDay: Number(formData.get("pricePerDay")),
//       images: [imageUrl], // আমাদের জেনারেট হওয়া বা ইনপুট দেওয়া লাইভ URL
//       categoryId: "cf5d2544-ef0b-446f-b2f4-3553c21c9600",
//     };

//     const res = await createProperty(payload);
//     setLoading(false);

//     if (res?.success || res?._id || res?.id) {
//       toast.success("Property listed successfully!");
//       router.push("/dashboard/landlord/my-properties");
//     } else {
//       toast.error(res?.message || "Failed to create listing.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-4 md:p-6">
//       <Card className="rounded-2xl border-neutral-100 shadow-sm bg-white">
//         <CardHeader>
//           <CardTitle className="text-xl font-black text-gray-900">Create Smart Listing</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
            
//             {/* ১. প্রপার্টি টাইটেল */}
//             <div>
//               <label className="text-xs font-bold text-gray-700 block mb-1">Property Title</label>
//               <input name="title" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="e.g. Smart Bachelor Studio Apartment" />
//             </div>

//             {/* ২. ডেসক্রিপশন */}
//             <div>
//               <label className="text-xs font-bold text-gray-700 block mb-1">Description</label>
//               <textarea name="description" required rows={3} className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="Describe smart home features, accessibility..." />
//             </div>

//             {/* ৩. লোকেশন ও সিটি */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-xs font-bold text-gray-700 block mb-1">Area / Location</label>
//                 <input name="location" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="e.g. Zindabazar" />
//               </div>
//               <div>
//                 <label className="text-xs font-bold text-gray-700 block mb-1">City</label>
//                 <input name="city" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="e.g. Sylhet" />
//               </div>
//             </div>

//             {/* ৪. প্রাইস */}
//             <div>
//               <label className="text-xs font-bold text-gray-700 block mb-1">Price Per Day (৳)</label>
//               <input name="pricePerDay" type="number" required className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-rose-500" placeholder="1500" />
//             </div>

//             {/* 🖼️ ৫. স্মার্ট মিডিয়া আপলোডার জোন (টগল ক্যাটাগরি) */}
//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <label className="text-xs font-bold text-gray-700">Property Showcase Media</label>
//                 {/* সুইচ বাটন */}
//                 <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-bold">
//                   <button type="button" onClick={() => setImageMode("upload")} className={`px-3 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}>
//                     Drag & Drop
//                   </button>
//                   <button type="button" onClick={() => setImageMode("link")} className={`px-3 py-1 rounded-md transition-all ${imageMode === "link" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}>
//                     Direct Link
//                   </button>
//                 </div>
//               </div>

//               {imageMode === "upload" ? (
//                 <div>
//                   {imageUrl ? (
//                     /* আপলোড সাকসেস হলে প্রিভিউ দেখাবে */
//                     <div className="relative border border-neutral-200 rounded-2xl overflow-hidden group h-40">
//                       <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
//                       <button type="button" onClick={() => setImageUrl("")} className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors">
//                         <X className="w-4 h-4" />
//                       </button>
//                     </div>
//                   ) : (
//                     /* ড্রপজোন বক্স */
//                     <label onDragOver={handleDragOver} onDrop={handleDrop} className="border-2 border-dashed border-neutral-200 hover:border-rose-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-neutral-50/50 min-h-40">
//                       <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files?.[0]!)} />
//                       {uploadingImage ? (
//                         <div className="flex flex-col items-center gap-2 text-rose-500">
//                           <Loader2 className="w-8 h-8 animate-spin" />
//                           <p className="text-xs font-bold">Uploading to ImgBB Server...</p>
//                         </div>
//                       ) : (
//                         <>
//                           <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-rose-500" />
//                           <p className="text-xs font-bold text-gray-700">Drag & drop your property photo here</p>
//                           <p className="text-[10px] text-gray-400">or click to browse local files</p>
//                         </>
//                       )}
//                     </label>
//                   )}
//                 </div>
//               ) : (
//                 /* নরমাল ডিরেক্ট লিংক ইনপুট */
//                 <div className="relative flex items-center">
//                   <LinkIcon className="w-4 h-4 text-gray-400 absolute left-4" />
//                   <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-rose-500" placeholder="https://unsplash.com" />
//                 </div>
//               )}
//             </div>

//             {/* 🚀 সাবমিট বাটন */}
//             <button type="submit" disabled={loading || uploadingImage} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2">
//               {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//               {loading ? "Publishing Core Code..." : "Launch Listing"}
//             </button>

//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createProperty, getCategories } from "../../../_actions/landlordAction";
// import { toast } from "sonner";
// import { X, UploadCloud, Loader2, Link as LinkIcon, Home, Tag, DollarSign, MapPin } from "lucide-react";

// export default function NewPropertyPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [categories, setCategories] = useState<any[]>([]);
  
//   // মিডিয়া সুইচ স্টেট
//   const [imageMode, setImageMode] = useState<"upload" | "link">("upload");
//   const [imageUrl, setImageUrl] = useState("");

//   const IMGBB_API_KEY = "6bab8bd4ef72d73189d2d09f7a77d13c";

//   // ক্যাটাগরি ফেচিং
//   useEffect(() => {
//     async function fetchLiveCategories() {
//       const data = await getCategories();
//       setCategories(data);
//     }
//     fetchLiveCategories();
//   }, []);

//   // ইমেজিবি ক্লাউড আপলোড লজিক
//   const handleImageUpload = async (file: File) => {
//     if (!file) return;
//     setUploadingImage(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await fetch(`https://imgbb.com{IMGBB_API_KEY}`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         setImageUrl(data.data.url);
//         toast.success("Image uploaded to ImgBB cloud!");
//       } else {
//         toast.error("Cloud upload failed.");
//       }
//     } catch (err) {
//       toast.error("Error uploading image.");
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     const files = e.dataTransfer.files;
//     if (files && files.length > 0) {
//       handleImageUpload(files[0]);
//     }
//   };

//   // ফর্ম সাবমিট হ্যান্ডেলার
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.currentTarget);
    
//     if (!imageUrl.trim()) {
//       toast.error("Please provide a property photo.");
//       setLoading(false);
//       return;
//     }

//     const propertyData = {
//       title: formData.get("title"),
//       description: formData.get("description"),
//       location: formData.get("location"),
//       city: formData.get("city"),
//       pricePerDay: Number(formData.get("pricePerDay")),
//       images: [imageUrl],
//       categoryId: formData.get("categoryId"),
//     };

//     const result = await createProperty(propertyData);
//     if (result && result.success !== false) {
//       toast.success("Property listed successfully!");
//       router.push("/dashboard/landlord/my-properties");
//     } else {
//       toast.error(result?.message || "Submission failed.");
//     }
//     setLoading(false);
//   };
//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white border border-neutral-100 shadow-sm rounded-2xl my-6 space-y-6">
//       <div>
//         <h1 className="text-xl font-black text-gray-900">🚀 Launch New Smart Property Listing</h1>
//         <p className="text-xs text-neutral-500">Live API mapped backend sync and dual media controller.</p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* টাইটেল এবং ক্যাটাগরি */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
//               <Home className="w-3.5 h-3.5 text-neutral-400" /> Property Title
//             </label>
//             <input required type="text" name="title" className="mt-1 block w-full p-2.5 text-sm border border-neutral-200 rounded-xl focus:ring-1 focus:ring-rose-500 outline-none" placeholder="e.g., Smart Bachelor Studio" />
//           </div>
//           <div>
//             <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
//               <Tag className="w-3.5 h-3.5 text-neutral-400" /> Category (Live Backend API)
//             </label>
//             <select required name="categoryId" className="mt-1 block w-full p-2.5 text-sm border border-neutral-200 rounded-xl bg-white focus:ring-1 focus:ring-rose-500 outline-none">
//               <option value="">-- Select Live Category --</option>
//               {categories.map((cat) => (
//                 <option key={cat._id || cat.id} value={cat._id || cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* প্রাইস, লোকেশন এবং সিটি */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
//               <DollarSign className="w-3.5 h-3.5 text-neutral-400" /> Price / Day (৳)
//             </label>
//             <input required type="number" name="pricePerDay" className="mt-1 block w-full p-2.5 text-sm border border-neutral-200 rounded-xl focus:ring-1 focus:ring-rose-500 outline-none" placeholder="e.g., 1500" />
//           </div>
//           <div>
//             <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
//               <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Location / Area
//             </label>
//             <input required type="text" name="location" className="mt-1 block w-full p-2.5 text-sm border border-neutral-200 rounded-xl focus:ring-1 focus:ring-rose-500 outline-none" placeholder="e.g., Zindabazar" />
//           </div>
//           <div>
//             <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
//               <MapPin className="w-3.5 h-3.5 text-neutral-400" /> City
//             </label>
//             <input required type="text" name="city" className="mt-1 block w-full p-2.5 text-sm border border-neutral-200 rounded-xl focus:ring-1 focus:ring-rose-500 outline-none" placeholder="e.g., Sylhet" />
//           </div>
//         </div>

//         {/* ডেসক্রিপশন */}
//         <div>
//           <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
//           <textarea required name="description" rows={3} className="mt-1 block w-full p-2.5 text-sm border border-neutral-200 rounded-xl focus:ring-1 focus:ring-rose-500 outline-none" placeholder="Efficiently designed studio with smart features..." />
//         </div>

//         {/* ডুয়াল মিডিয়া সুইচ জোন */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <label className="text-xs font-bold text-gray-700 uppercase">Property Showcase Media</label>
//             <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-bold">
//               <button 
//                 type="button" 
//                 onClick={() => setImageMode("upload")} 
//                 className={`px-3 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}
//               >
//                 Drag & Drop
//               </button>
//               <button 
//                 type="button" 
//                 onClick={() => setImageMode("link")} 
//                 className={`px-3 py-1 rounded-md transition-all ${imageMode === "link" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}
//               >
//                 Direct Link
//               </button>
//             </div>
//           </div>

//           {imageMode === "upload" ? (
//             <div>
//               {imageUrl ? (
//                 <div className="relative border border-neutral-200 rounded-2xl overflow-hidden group h-40">
//                   <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
//                   <button 
//                     type="button" 
//                     onClick={() => setImageUrl("")} 
//                     className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <label 
//                   onDragOver={handleDragOver} 
//                   onDrop={handleDrop} 
//                   className="border-2 border-dashed border-neutral-200 hover:border-rose-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-neutral-50/50 min-h-40"
//                 >
//                   <input 
//                     type="file" 
//                     accept="image/*" 
//                     className="hidden" 
//                     onChange={(e) => {
//                       if (e.target.files && e.target.files[0]) {
//                         handleImageUpload(e.target.files[0]);
//                       }
//                     }} 
//                   />
//                   {uploadingImage ? (
//                     <div className="flex flex-col items-center gap-2 text-rose-500">
//                       <Loader2 className="w-8 h-8 animate-spin" />
//                       <p className="text-xs font-bold">Uploading to ImgBB Server...</p>
//                     </div>
//                   ) : (
//                     <>
//                       <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-rose-500" />
//                       <p className="text-xs font-bold text-gray-700">Drag & drop your property photo here</p>
//                       <p className="text-[10px] text-gray-400">or click to browse local files</p>
//                     </>
//                   )}
//                 </label>
//               )}
//             </div>
//           ) : (
//             <div className="relative flex items-center">
//               <LinkIcon className="w-4 h-4 text-gray-400 absolute left-4" />
//               <input 
//                 type="url" 
//                 value={imageUrl} 
//                 onChange={(e) => setImageUrl(e.target.value)} 
//                 className="w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-rose-500 outline-none" 
//                 placeholder="https://unsplash.com" 
//               />
//             </div>
//           )}
//         </div>

//         {/* সাবমিট বাটন */}
//         <button 
//           type="submit" 
//           disabled={loading || uploadingImage} 
//           className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
//         >
//           {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//           {loading ? "Publishing Core Code..." : "Launch Listing"}
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// আমাদের তৈরি করা সেন্ট্রালাইজড স্কিমা ফাইল এবং টাইপ ইম্পোর্ট
import { propertySchema, PropertyFormData } from "../../../_actions/propertyListingSchema"; 
import { createProperty, getCategories } from "../../../_actions/landlordAction";
import { toast } from "sonner";
import { X, UploadCloud, Loader2, Link as LinkIcon, Home, Tag, DollarSign, MapPin } from "lucide-react";

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  
  // মিডিয়া টগল সুইচ এবং ইমেজ ইউআরএল স্টেট
  const [imageMode, setImageMode] = useState<"upload" | "link">("upload");
  const [imageUrl, setImageUrl] = useState("");

  // NEXT_PUBLIC_ দিয়ে এনভায়রনমেন্ট ফাইল থেকে ImgBB API Key ও ডিফল্ট ফলব্যাক রিড করা হচ্ছে
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "6bab8bd4ef72d73189d2d09f7a77d13c";
  const FALLBACK_IMAGE = process.env.NEXT_PUBLIC_FALLBACK_IMAGE || "https://unsplash.com";

  // React Hook Form-এ কাস্টম Zod স্কিমা ডিক্লেয়ারেশন
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      categoryId: "",
      location: "",
      city: "",
      description: "",
    },
  });

  // রিয়াল ব্যাকএন্ড থেকে ডাইনামিক ক্যাটাগরি ডাটা পুশ
  useEffect(() => {
    async function fetchLiveCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    fetchLiveCategories();
  }, []);

  // ইমেজিবি ক্লাউড আপলোডার ইঞ্জিন (টাইপ-সেফ গার্ডসহ)
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://imgbb.com{IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Image uploaded to ImgBB cloud!");
      } else {
        toast.error("Cloud upload failed. Please verify API key in env.");
      }
    } catch (err) {
      toast.error("Error uploading image to cloud.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  // জড ভ্যালিডেটেড ফর্ম সাবমিশন পাইপলাইন
  const onSubmitForm = async (data: PropertyFormData) => {
    // ইমেজ ভ্যালিডেশন চেক (আপলোড বা ডিরেক্ট লিঙ্ক না থাকলে ফর্ম সাবমিট ব্লক হবে)
    const finalImage = imageUrl.trim() || FALLBACK_IMAGE;
    
    if (!imageUrl.trim()) {
      toast.error("Validation Error: Please provide a property photo via Upload or Link.");
      return;
    }

    setLoading(true);
    const finalPayload = {
      ...data,
      images: [finalImage], // ব্যাকএন্ড অ্যারে অব স্ট্রিংস এক্সপেক্ট করে
    };

    const result = await createProperty(finalPayload);
    if (result && result.success !== false) {
      toast.success("Property listed and published successfully!");
      router.push("/dashboard/landlord/my-properties");
    } else {
      toast.error(result?.message || "Render Backend Database rejected submission.");
    }
    setLoading(false);
  };
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-white border border-neutral-100 shadow-sm rounded-2xl my-6 space-y-6">
      <div>
        <h1 className="text-xl font-black text-gray-900">🚀 Launch New Smart Property Listing</h1>
        <p className="text-xs text-neutral-500">Zod engine validated type-safe server pipeline deployment.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">
        {/* টাইটেল এবং ক্যাটাগরি */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
              <Home className="w-3.5 h-3.5 text-neutral-400" /> Property Title
            </label>
            <input 
              type="text" 
              {...register("title")}
              className={`mt-1 block w-full p-2.5 text-sm border bg-white rounded-xl focus:ring-1 outline-none ${errors.title ? "border-rose-500 focus:ring-rose-500" : "border-neutral-200 focus:ring-rose-500"}`} 
              placeholder="e.g., Smart Bachelor Studio" 
            />
            {errors.title && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-neutral-400" /> Category (Live Backend API)
            </label>
            <select 
              {...register("categoryId")}
              className={`mt-1 block w-full p-2.5 text-sm border bg-white rounded-xl focus:ring-1 outline-none ${errors.categoryId ? "border-rose-500 focus:ring-rose-500" : "border-neutral-200 focus:ring-rose-500"}`}
            >
              <option value="">-- Select Live Category --</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.categoryId.message}</p>}
          </div>
        </div>

        {/* প্রাইস, লোকেশন এবং সিটি */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-neutral-400" /> Price / Day (৳)
            </label>
            <input 
              type="number" 
              {...register("pricePerDay", { valueAsNumber: true })}
              className={`mt-1 block w-full p-2.5 text-sm border bg-white rounded-xl focus:ring-1 outline-none ${errors.pricePerDay ? "border-rose-500 focus:ring-rose-500" : "border-neutral-200 focus:ring-rose-500"}`} 
              placeholder="e.g., 1500" 
            />
            {errors.pricePerDay && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.pricePerDay.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" /> Location / Area
            </label>
            <input 
              type="text" 
              {...register("location")}
              className={`mt-1 block w-full p-2.5 text-sm border bg-white rounded-xl focus:ring-1 outline-none ${errors.location ? "border-rose-500 focus:ring-rose-500" : "border-neutral-200 focus:ring-rose-500"}`} 
              placeholder="e.g., Zindabazar" 
            />
            {errors.location && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" /> City
            </label>
            <input 
              type="text" 
              {...register("city")}
              className={`mt-1 block w-full p-2.5 text-sm border bg-white rounded-xl focus:ring-1 outline-none ${errors.city ? "border-rose-500 focus:ring-rose-500" : "border-neutral-200 focus:ring-rose-500"}`} 
              placeholder="e.g., Sylhet" 
            />
            {errors.city && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.city.message}</p>}
          </div>
        </div>

        {/* ডেসক্রিপশন */}
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase">Description</label>
          <textarea 
            {...register("description")}
            rows={3} 
            className={`mt-1 block w-full p-2.5 text-sm border bg-white rounded-xl focus:ring-1 outline-none ${errors.description ? "border-rose-500 focus:ring-rose-500" : "border-neutral-200 focus:ring-rose-500"}`} 
            placeholder="Efficiently designed studio with smart home features..." 
          />
          {errors.description && <p className="text-rose-500 text-[11px] font-bold mt-1">{errors.description.message}</p>}
        </div>

        {/* ডুয়াল মিডিয়া সুইচ জোন */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-gray-700 uppercase">Property Showcase Media</label>
            <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs font-bold">
              <button 
                type="button" 
                onClick={() => setImageMode("upload")} 
                className={`px-3 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}
              >
                Drag & Drop
              </button>
              <button 
                type="button" 
                onClick={() => setImageMode("link")} 
                className={`px-3 py-1 rounded-md transition-all ${imageMode === "link" ? "bg-white text-rose-500 shadow-sm" : "text-gray-500"}`}
              >
                Direct Link
              </button>
            </div>
          </div>

          {imageMode === "upload" ? (
            <div>
              {imageUrl ? (
                <div className="relative border border-neutral-200 rounded-2xl overflow-hidden group h-40">
                  <img src={imageUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
                  <button 
                    type="button" 
                    onClick={() => setImageUrl("")} 
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label 
                  onDragOver={handleDragOver} 
                  onDrop={handleDrop} 
                  className="border-2 border-dashed border-neutral-200 hover:border-rose-400 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-neutral-50/50 min-h-40"
                >
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }} 
                  />
                  {uploadingImage ? (
                    <div className="flex flex-col items-center gap-2 text-rose-500">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <p className="text-xs font-bold">Uploading to ImgBB Server...</p>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-neutral-400 group-hover:text-rose-500" />
                      <p className="text-xs font-bold text-gray-700">Drag & drop your property photo here</p>
                      <p className="text-[10px] text-gray-400">or click to browse local files</p>
                    </>
                  )}
                </label>
              )}
            </div>
          ) : (
            <div className="relative flex items-center">
              <LinkIcon className="w-4 h-4 text-gray-400 absolute left-4" />
              <input 
                type="url" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="w-full border border-neutral-200 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-rose-500 outline-none bg-white" 
                placeholder="https://unsplash.com" 
              />
            </div>
          )}
        </div>

        {/* সাবমিট বাটন */}
        <button 
          type="submit" 
          disabled={loading || uploadingImage} 
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-xl text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Validating & Publishing..." : "Launch Listing"}
        </button>
      </form>
    </div>
  );
}
