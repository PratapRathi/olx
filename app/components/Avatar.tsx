"use client"

import Image from "next/image"

interface AvatarProps {
  src?: string | null
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({ src, size }) => {
  return (
    <Image alt="Avatar" src={src || "/images/placeholder.jpg"} height={size || 30} width={size || 30} className="rounded-full" />
  )
}

export default Avatar
