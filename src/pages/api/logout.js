import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";


// Fonction pour gérer la déconnexion de l'utilisateur
export const POST = async ({ cookies }) => {
  cookies.delete("pb_auth", { path: "/" });
  return new Response(null, { status: 303, headers: { Location: '/' } });
}; 
