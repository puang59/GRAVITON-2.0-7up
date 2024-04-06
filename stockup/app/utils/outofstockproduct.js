import supabase from "./supabase";

export async function outofstockproduct() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq("availability", 0);
            console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};