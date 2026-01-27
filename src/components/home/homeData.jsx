/**
 * homeData.js
 * Dados auxiliares da HomeScreen
 */

export const TIPS = [
  "O 'I' é egoísta — só ele usa AM.",
  "Actually não é 'atualmente'. É 'na verdade'.",
  "'I am agree' está ERRADO. Diga 'I agree'.",
  "Você não TEM idade. Você É a idade: I am 30.",
  "Make = criar algo novo. Do = executar ação.",
  "AT horas, ON dias, IN meses/anos.",
];

export const FireIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 23C16.5 23 20 19.5 20 15C20 11.5 18 9.5 16.5 8C16 7.5 15 6 15 4C15 4 13 6 12 8C11 6 9 4 9 4C9 6 8 7.5 7.5 8C6 9.5 4 11.5 4 15C4 19.5 7.5 23 12 23Z"
      fill="url(#fireGradient)"
    />
    <path
      d="M12 23C14.5 23 16.5 20.5 16.5 17.5C16.5 15 15 13.5 14 12.5C13.5 12 13 11 13 10C13 10 12 11 11.5 12C11 11 10 10 10 10C10 11 9.5 12 9 12.5C8 13.5 7 15 7 17.5C7 20.5 9 23 12 23Z"
      fill="url(#fireInnerGradient)"
    />
    <defs>
      <linearGradient id="fireGradient" x1="12" y1="4" x2="12" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="1" stopColor="#F97316" />
      </linearGradient>
      <linearGradient id="fireInnerGradient" x1="12" y1="10" x2="12" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF3C7" />
        <stop offset="1" stopColor="#FBBF24" />
      </linearGradient>
    </defs>
  </svg>
);