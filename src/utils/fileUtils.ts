export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (!password) return strength;

  // Check for lowercase letters
  if (password.match(/[a-z]|[а-я]/)) strength += 1;

  // Check for uppercase letters
  if (password.match(/[A-Z]|[А-Я]/)) strength += 1;

  // Check for numbers
  if (password.match(/\d/)) strength += 1;

  // Check for special characters
  if (password.match(/[^a-zA-Zа-яА-Я\d]/)) strength += 1;

  return strength;
};
