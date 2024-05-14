"use client"

import { categories } from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/input/CategoryInput";
import ImageUpload from "@/app/components/input/ImageUpload";
import CitySelect from "@/app/components/input/CitySelect";
import TextInput from "@/app/components/input/TextInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useSellModal from "@/app/hooks/useSellModal"
import Button from "@/app/components/Button";
import { IoMdClose } from "react-icons/io"
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

enum STEPS {
    CATEGORY,
    LOCATION,
    DETAILS,
    IMAGE
}

const SellModal = () => {
    const sellModal = useSellModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            category: "Car",
            location: null,
            brand: "",
            title: "",
            description: "",
            kmDriven: null,
            year: null,
            price: 500,
            imageSrc: ""
        },
    });

    const category = watch("category");
    const location = watch("location");
    const brand = watch("brand");
    const title = watch("title");
    const description = watch("description");
    const kmDriven = watch("kmDriven");
    const year = watch("year");
    const price = watch("price");
    const imageSrc = watch("imageSrc");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.IMAGE) return onNext();
        if(!location) return toast.error("Location is required")
        if(!imageSrc) return toast.error("Please upload image")
        data.location = data.location.label;

        if(isLoading) return;
        setIsLoading(true);
        const toastId = toast.loading("Loading...");

        axios.post("/api/listing", data).then(()=>{
            toast.success("Post created successfully", {id: toastId});
            sellModal.onClose();
            reset();
            setStep(STEPS.CATEGORY);
        }).catch(()=>{
            toast.error("Something went wrong", {id: toastId});
        }).finally(()=>{
            setIsLoading(false);
        })
    }

    let bodyContent = (
        <>
            <h3 className="font-semibold text-lg">Select the Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto">
                {categories.map((item) => (
                    <CategoryInput onClick={setCustomValue} key={item.label} label={item.label} icon={item.icon} selected={item.label === category} />
                ))}
            </div>
        </>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <>
                <h3 className="font-semibold text-lg">Choose your City</h3>
                <CitySelect value={location} onChange={(value) => { setCustomValue("location", value) }} />
            </>
        )
    }

    if (step === STEPS.DETAILS) {
        bodyContent = (
            <>
                <h3 className="font-semibold text-lg">Add Details of your Item</h3>
                <TextInput id="brand" label="Brand" register={register} errors={errors} />
                <TextInput id="title" label="Title" register={register} errors={errors} />
                <TextInput id="description" label="Description" register={register} errors={errors} />
                {(category === "Car" || category === "Motorcycle") && (
                    <TextInput id="kmDriven" label="KM Driven" register={register} errors={errors} type="number"/>
                )}
                <TextInput id="year" label="Year" register={register} errors={errors} type="number"/>
                <TextInput id="price" label="Price" register={register} errors={errors} type="number" price />
            </>
        )
    }

    if (step === STEPS.IMAGE) {
        bodyContent = (
            <>
                <h3 className="font-semibold text-lg">Add Image of your Item</h3>
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue("imageSrc", value)} />
            </>
        )
    }

    if (!sellModal.isOpen) return null;
    return (
        <div className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex">
            <div className='relative p-4 w-full max-w-md h-full md:h-auto'>
                <div className="relative bg-white rounded-lg shadow flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-center w-full">
                        <button onClick={sellModal.onClose} className='p-1 border-2 border-transparent rounded-lg hover:border-black transition  absolute right-5'>
                            <IoMdClose size={18} />
                        </button>
                        <div className="text-xl font-semibold">Sell your Item</div>
                    </div>
                    <hr />
                    {bodyContent}
                    <div className="flex items-center justify-center gap-2">
                        {step !== STEPS.CATEGORY ? (
                            <Button onClick={onBack} className="w-full" label="Back" />
                        ) : null}
                        <Button onClick={handleSubmit(onSubmit)} className="w-full" label={step === STEPS.IMAGE ? "Sell Now" : "Next"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellModal
