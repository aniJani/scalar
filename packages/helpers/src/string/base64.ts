/**
 * Encodes a string to Base64, supporting Unicode characters
 *
 * This function handles Unicode characters properly by first encoding the string
 * as UTF-8 bytes using TextEncoder, then converting to Base64. This is more robust
 * than the native btoa() function which only supports Latin1 (ISO-8859-1) characters.
 *
 * @see https://stackoverflow.com/questions/23223718/failed-to-execute-btoa-on-window-the-string-to-be-encoded-contains-characte
 *
 * @param str - The string to encode (supports Unicode characters)
 * @returns The Base64-encoded string
 *
 * @example
 * ```ts
 * base64Encode('admin:password') // 'YWRtaW46cGFzc3dvcmQ='
 * base64Encode('admin:żółć') // 'YWRtaW46xbzDs8WCxIc='
 * base64Encode('user:тест') // 'dXNlcjrRgtC10YHRgg=='
 * ```
 */
export function base64Encode(str: string): string {
  // Handle empty strings
  if (!str) return ''

  // Convert the string to UTF-8 bytes using TextEncoder
  const bytes = new TextEncoder().encode(str)

  // Convert bytes to a binary string
  const binaryString = String.fromCharCode(...bytes)

  // Use btoa to convert the binary string to Base64
  return btoa(binaryString)
}

/**
 * Decodes a Base64 string to its original Unicode string
 *
 * @param base64 - The Base64-encoded string to decode
 * @returns The decoded Unicode string
 *
 * @example
 * ```ts
 * base64Decode('YWRtaW46cGFzc3dvcmQ=') // 'admin:password'
 * base64Decode('YWRtaW46xbzDs8WCxIc=') // 'admin:żółć'
 * base64Decode('dXNlcjrRgtC10YHRgg==') // 'user:тест'
 * ```
 */
export function base64Decode(base64: string): string {
  // Handle empty strings
  if (!base64) return ''

  // Decode Base64 to binary string
  const binaryString = atob(base64)

  // Convert binary string to byte array
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  // Decode UTF-8 bytes to string
  return new TextDecoder().decode(bytes)
}
