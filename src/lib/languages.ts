export const SA_LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "zu", name: "Zulu", native: "isiZulu" },
  { code: "xh", name: "Xhosa", native: "isiXhosa" },
  { code: "af", name: "Afrikaans", native: "Afrikaans" },
  { code: "st", name: "Sesotho", native: "Sesotho" },
  { code: "tn", name: "Setswana", native: "Setswana" },
  { code: "ts", name: "Tsonga", native: "Xitsonga" },
  { code: "ss", name: "Swati", native: "siSwati" },
  { code: "ve", name: "Venda", native: "Tshivenḓa" },
  { code: "nr", name: "Ndebele", native: "isiNdebele" },
  { code: "nso", name: "Sepedi", native: "Sepedi" },
] as const;

export type LangCode = (typeof SA_LANGUAGES)[number]["code"];
