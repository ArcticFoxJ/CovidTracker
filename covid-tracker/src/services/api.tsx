const BASE_URL = 'https://disease.sh/v3/covid-19/'

export interface Data {
    updated: number
    cases: number
    todayCases: number
    deaths: number
    todayDeaths: number
    recovered: number
    todayRecovered: number
    active: number
    critical: number
    casesPerOneMillion: number
    deathsPerOneMillion: number
    tests: number
    testsPerOneMillion: number
    population: number
    oneCasePerPeople: number
    oneDeathPerPeople: number
    oneTestPerPeople: number
    activePerOneMillion: number
    recoveredPerOneMillion: number
    criticalPerOneMillion: number
}

export interface AllData extends Data {
    affectedCountries: number
}

export interface CountryData extends Data {
    country: string
    countryInfo:{
       _id: number
       iso2: string
       iso3: string
       lat: number
       long: number
       flag: string
    },
    population: number
}

export interface HistoricalDates {
    cases: {}
    deaths: {}
    recovered: {}
}

export interface CountryHistoricalData{
    country: string
    province: string[]
    timeline: HistoricalDates
}

export const getCountries = async (callback: (data: CountryData[]) => any) => {
    await fetchData('countries', callback)
}

export const getCountry = async (country: string, callback: (data: CountryData) => any) => {
    await fetchData('countries/' + country, callback)
}

export const getAll = async (callback: (data: AllData) => any) => {
    await fetchData('all', callback)
}

export const getAllHistorical = async (callback: (data: HistoricalDates) => any, lastdays: number = 360) => {
    await fetchData('historical/all' + '?lastdays=' + lastdays, callback)
}

export const getCountryHistorical = async (country: string, callback: (data: CountryHistoricalData) => any, lastdays: number = 360) => {
    await fetchData('historical/' + country + '?lastdays=' + lastdays, callback)
}

async function fetchData<T>(endpoint: string, callback: (data: T) => any) {
    await fetch(BASE_URL + endpoint)
        .then(result => result.json())
        .then((data: T) => callback(data))
}