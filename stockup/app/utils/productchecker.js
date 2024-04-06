import supabase from "./supabase";

export async function productchecker(id) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq("id", id);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};