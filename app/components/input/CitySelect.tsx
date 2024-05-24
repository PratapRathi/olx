"use client"
import { cityType, getCities } from '@/app/hooks/useAllCities';
import { useEffect, useId, useState } from 'react';
import ReactSelect from 'react-select'

interface CitySelectProps {
    value: cityType | undefined | null
    onChange: (value: cityType | undefined | null) => void
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
    const id = useId();
    const data = getCities("IN");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    return isMounted ? (
        <ReactSelect
            placeholder="Anywhere"
            id={id}
            isClearable
            value={value}
            onChange={onChange}
            options={data}
            classNames={{
                control: () => "p-1 border-1 w-full",
                input: () => "text-md",
                option: () => "text-md"
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: "black",
                    primary25: "ffe4e6"
                }
            })}
        />
    ) : null
}

export default CitySelect
