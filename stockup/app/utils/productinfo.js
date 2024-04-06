import supabase from "./supabase";

export async function productinfo() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};