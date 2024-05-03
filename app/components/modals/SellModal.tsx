"use client"

import useSellModal from "@/app/hooks/useSellModal"
import { IoMdClose } from "react-icons/io"
import Button from "../Button";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { categories } from "@/app/components/navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import CitySelect from "../input/CitySelect";

enum STEPS {
    CATEGORY,
    LOCATION,
    DETAILS,
    IMAGE
}

const SellModal = () => {
    const sellModal = useSellModal();
    const [step, setStep] = useState(STEPS.CATEGORY);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            category: "",
            location: null,
        },
    });

    const category = watch("category");
    const location = watch("location");

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

    const onSubmit = () => {
        console.log(location);
        if (step !== STEPS.IMAGE) return onNext();
    }

    let bodyContent = (
        <>
            <h3 className="font-semibold text-lg">Select the Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 overflow-y-auto">
                {categories.map((item) => (
                    <CategoryInput onClick={setCustomValue} key={item.label} label={item.label} icon={item.icon} selected={item.label === category}/>
                ))}
            </div>
        </>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <>
                <h3 className="font-semibold text-lg">Choose your City</h3>
                <CitySelect value={location} onChange={(value)=>{setCustomValue("location", value)}}/>
            </>
        )
    }

    if(step === STEPS.DETAILS) {
        bodyContent = (
            <>
                <h3 className="font-semibold text-lg">Add Detials of your Item</h3>
                
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
                        <Button onClick={onSubmit} className="w-full" label={step === STEPS.LOCATION ? "Sell Now" : "Next"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellModal
