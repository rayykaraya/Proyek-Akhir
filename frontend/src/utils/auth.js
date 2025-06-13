// src/utils/auth.js

// Fungsi untuk membuat hash dari password (sama seperti sebelumnya)
export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Fungsi untuk mencatat aktivitas pengguna ke localStorage
export function logUserActivity(activityDetails) {
  try {
    const loggedInUserText = localStorage.getItem('loggedInUser');
    if (!loggedInUserText) return;

    const loggedInUser = JSON.parse(loggedInUserText);
    if (!loggedInUser || !loggedInUser.email) return;

    const userActivitiesKey = `userActivities_${loggedInUser.email}`;
    let activities = JSON.parse(localStorage.getItem(userActivitiesKey)) || [];
    if (!Array.isArray(activities)) activities = [];
    const maxLogEntries = 20;
    const activityEntry = {
        ...activityDetails,
        timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };
    activities.unshift(activityEntry);
    if (activities.length > maxLogEntries) {
      activities = activities.slice(0, maxLogEntries);
    }
    localStorage.setItem(userActivitiesKey, JSON.stringify(activities));
    console.log(`Aktivitas untuk ${loggedInUser.email} dicatat:`, activityEntry);
  } catch (error) {
    console.error('Gagal mencatat aktivitas pengguna:', error);
  }
}