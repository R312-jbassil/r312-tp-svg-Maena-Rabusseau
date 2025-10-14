import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request }) {
    const data = await request.json();
    console.log("Received data to update:", data);


    if (!data.id) {
        return new Response(JSON.stringify({ success: false, error: "ID is required for update" }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }

    try {
        const record = await pb
            .collection(Collections.Svg)
            .update(data.id, data);

        console.log("SVG updated with ID:", record.id);

        return new Response(JSON.stringify({ success: true, id: record.id }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error updating SVG:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500,
        });
    }
}


async function update(updatedData) {
    const response = await fetch("/api/updateSVG", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });
    return response;
};


const response = await update({
    id: formData.get("id"),
    code_svg: ...,
    chat_history: JSON.stringify(...),
});
const data = await response.json();

if (data.success) {
    alert("SVG updated successfully");
} else {
    alert("Failed to update SVG");
}
