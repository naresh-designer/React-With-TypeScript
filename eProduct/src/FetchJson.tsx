export const FetchJson = async<T,>(url:string): Promise<T>=>{
    try {
        const res = await fetch(url)
        if(!res.ok){
            throw new Error(`Fail To Fetch ${res.status} or ${res.statusText}`)
        }
        return res.json() as Promise<T>
    } catch (error) {
        if(error instanceof Error){
            console.error(`Show Error ${error.message}`);
        }
        throw Error
    }
}