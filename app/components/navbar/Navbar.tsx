"use client"
import logo from "../../../public/olx.svg"
import { useState } from "react"
import Image from "next/image"
import SearchInput from "@/app/components/input/SearchInput"
import Categories from "@/app/components/navbar/Categories"
import CitySelect from "@/app/components/input/CitySelect"
import UserMenu from "@/app/components/navbar/UserMenu"
import { cityType } from "@/app/hooks/useAllCities"
import Button from "@/app/components/Button"
import { useRouter } from "next/navigation"
import { FaSearch } from "react-icons/fa";


const Navbar = () => {
  const router = useRouter();
  const [city, setCity] = useState<cityType | undefined | null>(undefined);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = true;

  const handle_Sell = () => { };

  const handleSearch = () => { };

  return (
    <>
      <div className="fixed w-full z-10 shadow-sm">
        <nav className="bg-[#EFF1F3] flex items-center gap-2 md:gap-8 px-2 md:px-10 py-2">
          <Image onClick={() => router.push("/")} alt="Logo" src={logo} height={48} width={48} className="hidden md:block" />
          <CitySelect value={city} onChange={(value) => setCity(value)} />
          <div className="flex-1 flex items-center relative">
            <SearchInput
              value={search}
              onChange={(value) => setSearch(value)}
              disabled={isLoading}
              className="w-full p-2 rounded-lg outline outline-1 outline-gray-300"
            />
            <FaSearch onClick={handleSearch} className="absolute right-2 cursor-pointer" />
          </div>
          <Button onClick={handle_Sell} label="Sell Now" className="rounded-xl hidden md:block bg-white py-2 px-3 shadow-lg" />
          <UserMenu />
        </nav>
        <Categories />
      </div>
    </>
  )
}

export default Navbar
