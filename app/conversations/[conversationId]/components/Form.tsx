"use client"
import axios from "axios"
import { CldUploadButton } from "next-cloudinary"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2"

interface FormProps {
  conversationId: string
}

const Form: React.FC<FormProps> = ({ conversationId }) => {
  const id = "message";
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message: ""
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId
    })
  }

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    })
  }

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton uploadPreset="qvk6pwjd" options={{ maxFiles: 1 }} onSuccess={handleUpload}>
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
        <div className="relative w-full">
          <input id={id} autoComplete={id} {...register(id, { required: true })} placeholder={"Write a message"}
            className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
          />
        </div>
        <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer transition hover:bg-sky-600">
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  )
}

export default Form
