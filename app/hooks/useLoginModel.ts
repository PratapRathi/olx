import { create } from 'zustand'

interface useLoginModelProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useLoginModel = create<useLoginModelProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useLoginModel;