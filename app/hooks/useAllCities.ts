import { Country, State, City }  from 'country-state-city';

export interface cityType {
    label: string,
    value: string
}

export function getCities (country : string) {
    const allCities = City.getCitiesOfCountry(country);
    const data = allCities?.map((city)=> ({
        label: city.name,
        value: city.name
    }))
    return data;
}