import { Client, Databases, ID } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  try {
    log("=== FUNCTION USER TO SISWA STARTED ===");

    // Ambil payload
    let user = req.bodyJson || req.body;
    if (typeof user === "string") {
      user = JSON.parse(user);
    }

    log(`Proses User ID: ${user.$id}`);
    log(`User Name: ${user.name}`);

    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    const siswa = await databases.createDocument(
      "6a97a74400128c858a56",
      "siswa",
      ID.unique(),
      {
        name: user.name || "Siswa Baru",
      }
    );

    log(`BERHASIL: Siswa dibuat dengan ID ${siswa.$id}`);

    return res.json({ success: true, siswaId: siswa.$id });

  } catch (err) {
    error(`GAGAL: ${err.message}`);
    return res.json({ success: false, error: err.message }, 500);
  }
};