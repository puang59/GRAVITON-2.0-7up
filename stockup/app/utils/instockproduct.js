import supabase from "./supabase";

export async function instockproduct() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq("availability", 1);
            console.log(data)
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};