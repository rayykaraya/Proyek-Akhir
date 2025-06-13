// src/utils/activityLogger.js

/**
 * Fungsi untuk mencatat aktivitas pengguna ke localStorage.
 * @param {object} activityData - Objek berisi data aktivitas (misal: { type: 'string', description: 'string' }).
 */
export const logActivity = (activityData) => {
  // 1. Dapatkan data pengguna yang sedang login
  const loggedInUserText = localStorage.getItem('loggedInUser');
  if (!loggedInUserText) {
    console.error("Tidak bisa mencatat aktivitas: tidak ada pengguna yang login.");
    return;
  }
  
  try {
    const userData = JSON.parse(loggedInUserText);
    if (!userData || !userData.email) {
      console.error("Tidak bisa mencatat aktivitas: data pengguna tidak valid.");
      return;
    }

    // 2. Buat kunci unik untuk riwayat aktivitas pengguna ini
    const userActivitiesKey = `userActivities_${userData.email}`;
    
    // 3. Ambil riwayat yang sudah ada
    const activitiesText = localStorage.getItem(userActivitiesKey);
    const existingActivities = activitiesText ? JSON.parse(activitiesText) : [];

    // 4. Buat objek aktivitas baru dengan timestamp
    const newActivity = {
      ...activityData,
      timestamp: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    // 5. Tambahkan aktivitas baru ke daftar
    existingActivities.push(newActivity);

    // 6. Simpan kembali daftar yang sudah diperbarui ke localStorage
    localStorage.setItem(userActivitiesKey, JSON.stringify(existingActivities));
    console.log("Aktivitas berhasil dicatat:", newActivity);

  } catch (error) {
    console.error("Gagal mencatat aktivitas pengguna:", error);
  }
};