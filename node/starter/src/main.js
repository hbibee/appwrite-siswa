import { Client, Databases, ID } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  try {
    log("=== FUNCTION USER TO SISWA STARTED ===");

    // 1. Ambil payload dari trigger event (SDK v20+)
    let user = req.bodyJson;
    
    // Fallback jika bodyJson berupa string
    if (typeof user === "string") {
      user = JSON.parse(user);
    } else if (!user && req.bodyText) {
      user = JSON.parse(req.bodyText);
    }

    log(`Proses User ID: ${user.$id}`);
    log(`User Name: ${user.name}`);

    // 2. Inisialisasi Appwrite Client
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    // 3. Buat baris baru di tabel/collection 'siswa'
    const siswa = await databases.createDocument(
      "6a97a74400128c858a56", // Database ID
      "siswa",                 // Table / Collection ID
      ID.unique(),            // Document ID unik
      {
        name: user.name || "Siswa Baru", // Mengisi kolom name di tabel siswa
      }
    );

    log(`BERHASIL: Siswa dibuat dengan ID ${siswa.$id}`);

    return res.json({
      success: true,
      siswaId: siswa.$id,
    });

  } catch (err) {
    error(`GAGAL: ${err.message}`);

    return res.json({
      success: false,
      error: err.message,
    }, 500);
  }
};