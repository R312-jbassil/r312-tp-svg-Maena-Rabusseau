import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export const POST = async ({ request, cookies }) => {


  const { email, password, passwordConfirm, name } = await request.json();
  console.log(email, password, passwordConfirm, name);
  try {
    //     const data = {
    //     "email": email,
    //     "emailVisibility": true,
    //     "name": name,
    //     "password": password,
    //     "passwordConfirm": passwordConfirm
    // };
    const data = {
      "email": JSON.stringify(email).replace(/"/g, ''),
      "emailVisibility": true,
      "name": JSON.stringify(name).replace(/"/g, ''),
      "password": JSON.stringify(password).replace(/"/g, ''),
      "passwordConfirm": JSON.stringify(passwordConfirm).replace(/"/g, '')
    };
    console.log('data:', data);

    const newUser = await pb.collection(Collections.Users).create(data);

    // const authData = await pb
    //   .collection(Collections.Users)
    //   .authWithPassword(email, password);


    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    return new Response(
      JSON.stringify({ message: "Inscription réussie", user: newUser }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Erreur d'inscription :", err);


    return new Response(
      JSON.stringify({
        error:
          err?.message ||
          "Une erreur est survenue lors de la création du compte.",
      }),
      { status: 400 }
    );
  }
};
