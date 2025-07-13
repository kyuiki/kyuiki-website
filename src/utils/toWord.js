function IntToWords(n) {
  const units = ["", "ribu", "juta", "miliar", "triliun", "kuadriliun", "kuintiliun", "sekstiliun"];
  const words = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas"
  ];

  if (n < 0) return ["minus", ...IntToWords(-n)];
  if (n < 12) return [words[n]];
  if (n < 20) return [words[n - 10], "belas"];
  if (n < 100) return [words[Math.floor(n / 10)], "puluh", ...IntToWords(n % 10)];
  if (n < 200) return ["seratus", ...IntToWords(n - 100)];
  if (n < 1000) return [words[Math.floor(n / 100)], "ratus", ...IntToWords(n % 100)];
  if (n < 2000) return ["seribu", ...IntToWords(n - 1000)];

  for (let i = 0; i < units.length; i++) {
    const unitValue = Math.pow(1000, i + 1);
    if (n < unitValue * 1000) {
      return [...IntToWords(Math.floor(n / unitValue)), units[i], ...IntToWords(n % unitValue)];
    }
  }

  return ["Angka terlalu besar"];
}

console.log(IntToWords(0).join(" "));
