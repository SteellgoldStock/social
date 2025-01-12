export const generateId = (size: number = 21): string => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  
  let id = "";
  for (let i = 0; i < size; i++) {
    id += chars[bytes[i] % chars.length];
  }
  
  return id;
};