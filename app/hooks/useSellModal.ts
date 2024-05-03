import { create } from 'zustand'

interface useSellModelProps {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

const useSellModal = create<useSellModelProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))

export default useSellModal;