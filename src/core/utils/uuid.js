import { log } from "console";

// Convierte UUID string → Buffer (binario)
export function uuidToBuffer(uuid) {
  return Buffer.from(uuid.replace(/-/g, ""), "hex");
}

// Convierte Buffer (binario) → UUID string
export function bufferToUuid(buffer) {
  const hex = buffer.toString("hex");
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20)
  ].join("-");
}

// Genera un UUID v4 aleatorio
export  async function generarUuid() {
  const crypto = await import("crypto");
  const buffer = crypto.randomBytes(16);

  // Ajustar bits para cumplir con la versión 4 de UUID
  buffer[6] = (buffer[6] & 0x0f) | 0x40; // Versión 4
  buffer[8] = (buffer[8] & 0x3f) | 0x80; // Variante RFC4122

  return bufferToUuid(buffer);
}