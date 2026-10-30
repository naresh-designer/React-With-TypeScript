export const FetchJson = async<T,>(url:string): Promise<T> =>{
    try {
        const res = await fetch(url)
        if(!res.ok){
            throw new Error('Faild To Fetch Api')
        }
        return res.json()
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
        }
        throw Error
    }
}