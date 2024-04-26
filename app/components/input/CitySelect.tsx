"use client"
import { cityType, getCities } from '@/app/hooks/useAllCities';
import Select from 'react-select'

interface CitySelectProps {
    value: cityType | undefined | null
    onChange: (value: cityType | undefined | null) => void
}

const CitySelect: React.FC<CitySelectProps> = ({ value, onChange }) => {
    const data = getCities("IN");
    return (
        <Select
            placeholder="Anywhere"
            isClearable
            value={value}
            onChange={onChange}
            options={data}
            classNames={{
                control: () => "p-1 border-1 md:w-40",
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
    )
}

export default CitySelect
