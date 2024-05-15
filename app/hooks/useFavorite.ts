import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import toast from "react-hot-toast"


interface IuseFavorite {
    listingId: string
    currentUser?: User | null
}

const useFavorite = ({ listingId, currentUser }: IuseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []
        return list.includes(listingId);
    }, [currentUser?.favoriteIds, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!currentUser) {
            toast.error("Please login first to perform this action");
            return loginModal.onOpen();
        }

        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            }
            else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success("Success");
        } catch (error: any) {
            toast.error("Something went wrong");
        }
    }, [currentUser, loginModal, hasFavorited, listingId, router])

    return { hasFavorited, toggleFavorite }
}

export default useFavorite;