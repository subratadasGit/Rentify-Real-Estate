"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import { toast } from "sonner";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";

const EditListing = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formValues, setFormValues] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [initialValues, setInitialValues] = useState({
    type: "",
    propertyType: "",
    bedroom: "",
    bathroom: "",
    builtin: "",
    parking: "",
    lotsize: "",
    area: "",
    price: "",
    hoa: "",
    description: "",
    profileImage: "",
    fullName: "",
  });

  useEffect(() => {
    if (user) {
      verifyAndLoadListing();
    }
  }, [user]);

  const verifyAndLoadListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingimages(listing_id,url)")
      .eq("id", id)
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .single();

    if (error || !data) {
      toast.error("Unauthorized or listing not found.");
      router.replace("/");
      return;
    }

    setInitialValues({
      type: data.type || "",
      propertyType: data.propertyType || "",
      bedroom: data.bedroom || "",
      bathroom: data.bathroom || "",
      builtin: data.builtin || "",
      parking: data.parking || "",
      lotsize: data.lotsize || "",
      area: data.area || "",
      price: data.price || "",
      hoa: data.hoa || "",
      description: data.description || "",
      profileImage: data.profileImage || "",
      fullName: data.fullName || "",
    });

    setListing(data);
    setImages(
      data.listingimages?.map((img) => ({
        url: img.url,
        existing: true,
      })) || []
    );
  };

  const handleConfirmedSubmit = async () => {
    if (!formValues) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .update({ ...formValues, active: true })
      .eq("id", id)
      .select();

    if (data) {
      toast.success("Listing updated successfully");
      router.push("/");
    } else {
      toast.error("Server Side Error updating listing");
    }

    for (const image of images) {
      if (image.existing) continue;

      const file = image;
      const fileName = Date.now().toString();
      const fileExt = file.name.split(".").pop();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("listingimages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (uploadError) {
        toast.error("Error uploading image");
        continue;
      }

      if (uploadData) {
        const imageurl =
          process.env.NEXT_PUBLIC_IMAAGE_PUBLIC_URL + fileName;

        const { error: insertError } = await supabase
          .from("listingimages")
          .insert([{ url: imageurl, listing_id: id }]);

        if (insertError) {
          toast.error("Failed to link image to listing");
        } else {
          toast.success("Image uploaded successfully");
        }
      }
    }

    setLoading(false);
    setShowConfirmDialog(false);
  };

  return (
    <div className="px-6 md:px-36 my-10">
      <h2 className="font-bold text-3xl mb-8 text-center text-gray-800">
        Edit Property Listing
      </h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          setFormValues(values);
          setShowConfirmDialog(true);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-2xl shadow-xl bg-white space-y-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* All form inputs... */}
                <div>
                  <Label className="mb-2 block">Rent or Sell?</Label>
                  <RadioGroup
                    value={values.type}
                    onValueChange={(val) => setFieldValue("type", val)}
                    className="space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex flex-col">
                  <Label className="mb-2">Property Type</Label>
                  <Select
                    value={values.propertyType}
                    onValueChange={(val) => setFieldValue("propertyType", val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family Room">
                        Single Family Room
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2">Bedrooms</Label>
                  <Input
                    type="number"
                    name="bedroom"
                    placeholder="e.g. 3"
                    onChange={handleChange}
                    value={values.bedroom}
                  />
                </div>

                <div>
                  <Label className="mb-2">Bathrooms</Label>
                  <Input
                    type="number"
                    name="bathroom"
                    placeholder="e.g. 2"
                    onChange={handleChange}
                    value={values.bathroom}
                  />
                </div>

                <div>
                  <Label className="mb-2">Built In</Label>
                  <Input
                    type="number"
                    name="builtin"
                    placeholder="e.g. 2015"
                    onChange={handleChange}
                    value={values.builtin}
                  />
                </div>

                <div>
                  <Label className="mb-2">Parking Spaces</Label>
                  <Input
                    type="number"
                    name="parking"
                    placeholder="e.g. 1"
                    onChange={handleChange}
                    value={values.parking}
                  />
                </div>

                <div>
                  <Label className="mb-2">Lot Size (Sq.Ft)</Label>
                  <Input
                    type="number"
                    name="lotsize"
                    placeholder="e.g. 1500"
                    onChange={handleChange}
                    value={values.lotsize}
                  />
                </div>

                <div>
                  <Label className="mb-2">Area (Sq.Ft)</Label>
                  <Input
                    type="number"
                    name="area"
                    placeholder="e.g. 1100"
                    onChange={handleChange}
                    value={values.area}
                  />
                </div>

                <div>
                  <Label className="mb-2">Selling Price ($)</Label>
                  <Input
                    type="number"
                    name="price"
                    placeholder="e.g. 250000"
                    onChange={handleChange}
                    value={values.price}
                  />
                </div>

                <div>
                  <Label className="mb-2">HOA (per month) ($)</Label>
                  <Input
                    type="number"
                    name="hoa"
                    placeholder="e.g. 150"
                    onChange={handleChange}
                    value={values.hoa}
                  />
                </div>

                <div className="md:col-span-3">
                  <Label className="mb-2">Description</Label>
                  <Textarea
                    name="description"
                    placeholder="Add any additional information about the property..."
                    onChange={handleChange}
                    value={values.description}
                  />
                </div>
              </div>

              <h2 className="font-lg text-black font-bold">
                Upload Your Property Images
              </h2>

              <FileUpload
                setImages={(files) => {
                  setImages((prev) => [...prev, ...files]);
                }}
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={
                        img.existing ? img.url : URL.createObjectURL(img)
                      }
                      alt={`property-image-${idx}`}
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                    {img.existing && (
                      <span className="absolute top-1 right-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded">
                        Existing
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Button variant="outline" type="button">
                  Save Draft
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Update Listing"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>

      {/* AlertDialog Confirmation */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will update your listing and mark it as active.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmedSubmit}>
              {loading ? <Loader className="animate-spin" /> : "Yes, Update"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditListing;
