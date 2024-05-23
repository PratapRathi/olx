"use client"
import { Dialog } from "@headlessui/react";
import Modal from "@/app/components/Modal"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import { FiAlertTriangle } from "react-icons/fi"
import Button from "@/app/components/Button";

interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    conversationId: string
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ conversationId, isOpen, onClose }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = useCallback(() => {
        if (isLoading) return;
        setIsLoading(true);
        const toastId = toast.loading("Loading");
        axios.delete(`/api/conversations/${conversationId}`).then(() => {
            onClose();
            toast.success("Deleted Successfully", { id: toastId });
            router.push("/conversations");
            router.refresh()
        }).catch(() => {
            onClose();
            toast.error("Something went wrong", { id: toastId });
        }).finally(() => {
            setIsLoading(false);
        })
    }, [isLoading, conversationId, router, onClose])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10 sm:mx-0">
                    <FiAlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Delete Conversation
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">Are you sure you wants to delete this conversation?</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex flex-row-reverse gap-2 flex">
                <Button disabled={isLoading} onClick={onDelete} label="Delete" />
                <Button disabled={isLoading} onClick={onClose} label="Cancel" />
            </div>
        </Modal>
    )
}

export default ConfirmModal
