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
import { createProperty, updateProperty } from "../_actions/myPropertiesAction";
import { IProperty } from "./myPropertyCard";

type PropertyFormDialogProps = {
  mode: "create" | "edit";
  property?: IProperty;
};

export function PropertyFormDialog({
  mode,
  property,
}: PropertyFormDialogProps) {
  const [open, setOpen] = useState(false);

  const action =
    mode === "edit" && property
      ? updateProperty.bind(null, property.id)
      : createProperty;

  const [state, formAction, pending] = useActionState(action, null) as any;

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(
        state.message ||
          (mode === "edit"
            ? "Property updated successfully!"
            : "Property listed successfully!"),
      );
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="outline-none focus:ring-0">
        {mode === "edit" ? (
          <div className="inline-flex items-center justify-center gap-2 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 h-9 px-3 rounded-md text-xs font-medium cursor-pointer transition shadow-sm">
            <PencilIcon className="size-3.5" />
            <span>Edit</span>
          </div>
        ) : (
          <div className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white h-10 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer shadow-md">
            <PlusIcon className="size-4" />
            <span>Add New Property</span>
          </div>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-white rounded-xl shadow-xl border-neutral-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            {mode === "edit" ? "Edit Property Details" : "List a New Property"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label
              htmlFor="title"
              className="text-xs font-semibold text-gray-600"
            >
              Property Title
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={property?.title}
              placeholder="e.g. Smart Bachelor Studio Apartment"
              required
              className="focus-visible:ring-rose-500"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="description"
              className="text-xs font-semibold text-gray-600"
            >
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={property?.description}
              placeholder="Describe your property rooms, facilities..."
              required
              className="min-h-24 focus-visible:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="location"
                className="text-xs font-semibold text-gray-600"
              >
                Area/Location
              </Label>
              <Input
                id="location"
                name="location"
                defaultValue={property?.location}
                placeholder="e.g. Zindabazar"
                required
                className="focus-visible:ring-rose-500"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="city"
                className="text-xs font-semibold text-gray-600"
              >
                City
              </Label>
              <Input
                id="city"
                name="city"
                defaultValue={property?.city}
                placeholder="e.g. Sylhet"
                required={mode === "create"}
                className="focus-visible:ring-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label
                htmlFor="pricePerDay"
                className="text-xs font-semibold text-gray-600"
              >
                Price Per Day (৳)
              </Label>
              <Input
                id="pricePerDay"
                name="pricePerDay"
                type="number"
                defaultValue={property?.pricePerDay}
                placeholder="e.g. 1500"
                required
                className="focus-visible:ring-rose-500"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="categoryId"
                className="text-xs font-semibold text-gray-600"
              >
                Category ID
              </Label>
              <Input
                id="categoryId"
                name="categoryId"
                defaultValue={property?.categoryId}
                placeholder="Paste Category UUID"
                required={mode === "create"}
                disabled={mode === "edit"}
                className="focus-visible:ring-rose-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="images"
              className="text-xs font-semibold text-gray-600"
            >
              Images (Comma separated URLs)
            </Label>
            <Input
              id="images"
              name="images"
              defaultValue={property?.images?.join(", ")}
              placeholder="https://image1.com, https://image2.com"
              className="focus-visible:ring-rose-500"
            />
          </div>

          {mode === "edit" ? (
            <Label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer py-1">
              <Checkbox
                name="isAvailable"
                defaultChecked={property?.isAvailable}
                className="data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
              />
              Property is currently available for rent
            </Label>
          ) : (
            <input type="hidden" name="isAvailable" value="true" />
          )}

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              disabled={pending}
              className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:opacity-75"
            >
              {pending
                ? "Saving..."
                : mode === "edit"
                  ? "Save Changes"
                  : "List Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
