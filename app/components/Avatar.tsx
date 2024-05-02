"use client"

import Image from "next/image"

interface AvatarProps {
    src? : string | null
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
  return (
    <Image alt="Avatar" src={src || "/images/placeholder.jpg"} height={30} width={30} className="rounded-full"/>
  )
}

export default Avatar
