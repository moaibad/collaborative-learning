export function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }

export function createCookie (cookieName, cookieValue, time, timeUnit) {
    const timeUnitValue = {"second" : 1,"minute" :60,"hour":60*60}
    let date = new Date();
    date.setTime(date.getTime()+(time*timeUnitValue[timeUnit]*1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " +date.toGMTString();
}

export const formatTanggalMDY = (tanggal_lahir) => {
  const dateOfBirth = new Date(tanggal_lahir);
  const formattedDateOfBirth = dateOfBirth.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  return formattedDateOfBirth;
};

// Fungsi untuk mengubah waktu epoch menjadi format tanggal "mm / dd / yyyy"
export function formatDate(epochTime) {
  // Membuat objek Date dari epoch time
  var date = new Date(epochTime * 1000);
  
  // Mendapatkan bulan, tanggal, dan tahun
  var month = date.getMonth() + 1; // Penambahan 1 karena bulan dimulai dari 0
  var day = date.getDate();
  var year = date.getFullYear();
  
  // Menambahkan leading zero jika diperlukan
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  
  // Mengembalikan tanggal yang diformat
  return month + '/' + day + '/' + year;
}
