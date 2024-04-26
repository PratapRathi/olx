"use client"
import Image from "next/image"
import logo from "../../../public/olx.svg"
import { useState } from "react"
import CitySelect from "@/app/components/input/CitySelect"
import SearchInput from "@/app/components/input/SearchInput"
import { cityType } from "@/app/hooks/useAllCities"
import Button from "@/app/components/Button"
import { FaSearch } from "react-icons/fa";


const Navbar = () => {
  const [city, setCity] = useState<cityType | undefined | null>(undefined);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedIn = true;

  return (
    <nav className="fixed w-full z-10 shadow-sm bg-[#EFF1F3] flex items-center gap-2 md:gap-8 px-2 md:px-10 py-2">
      <Image alt="Logo" src={logo} height={48} width={48} className="hidden md:block"/>
      <CitySelect value={city} onChange={(value) => setCity(value)} />
      <div className="flex-1 flex items-center relative">
        <SearchInput
          value={search}
          onChange={(value) => setSearch(value)}
          disabled={isLoading}
          className="w-full p-2 rounded-lg outline outline-1 outline-gray-300"
        />
        <FaSearch className="absolute right-2 cursor-pointer"/>
      </div>
      <Button label={isLoggedIn? "Sell Now" : "Login"} className="rounded-xl bg-white py-2 px-3"/>
    </nav>
  )
}

export default Navbar
