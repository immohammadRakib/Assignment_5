


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
    // const onSubmitForm = async (data: PropertyFormData) => {
    //     // ইমেজ ভ্যালিডেশন চেক (আপলোড বা ডিরেক্ট লিঙ্ক না থাকলে ফর্ম সাবমিট ব্লক হবে)
    //     const finalImage = imageUrl.trim() || FALLBACK_IMAGE;
        
    //     if (!imageUrl.trim()) {
    //     toast.error("Validation Error: Please provide a property photo via Upload or Link.");
    //     return;
    //     }

    //     setLoading(true);
    //     const finalPayload = {
    //     ...data,
    //     images: [finalImage], // ব্যাকএন্ড অ্যারে অব স্ট্রিংস এক্সপেক্ট করে
    //     };

    //     const result = await createProperty(finalPayload);
    //     if (result && result.success !== false) {
    //     toast.success("Property listed and published successfully!");
    //     router.push("/dashboard/landlord/my-properties");
    //     } else {
    //     toast.error(result?.message || "Render Backend Database rejected submission.");
    //     }
    //     setLoading(false);
    // };


const onSubmitForm = async (data: PropertyFormData) => {
  if (!imageUrl.trim()) {
    toast.error("Validation Error: Please upload an image or paste a valid direct link.");
    return;
  }

  setLoading(true);

  try {
    // 🎯 টাইপস্ক্রিপ্টের লাল দাগ দূর করার আসল ট্রিক:
    // জাভাস্ক্রিপ্ট অবজেক্টকে খাঁটি HTML FormData-তে কনভার্ট করছি যাতে অ্যাকশন ফাইল খুশি থাকে
    const rawFormData = new FormData();
    rawFormData.append("title", data.title);
    rawFormData.append("description", data.description);
    rawFormData.append("location", data.location);
    rawFormData.append("city", data.city);
    rawFormData.append("pricePerDay", String(data.pricePerDay));
    rawFormData.append("categoryId", data.categoryId);
    rawFormData.append("images", imageUrl.trim()); // তোমার ড্রপজোন বা ইউআরএল থেকে আসা ইমেজের লিঙ্ক

    // 🚀 প্রথম প্যারামিটারে prevState হিসেবে null এবং দ্বিতীয় প্যারামিটারে rawFormData পাস করা হলো
    const result = await createProperty(null, rawFormData);

    if (result && result.success !== false) {
      toast.success("Property listed and published successfully!");
      router.refresh();
      router.push("/dashboard/landlord/my-properties");
    } else {
      toast.error(result?.message || "Render Backend Database rejected submission.");
    }
  } catch (error) {
    toast.error("Something went wrong during form parsing.");
  } finally {
    setLoading(false);
  }
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
