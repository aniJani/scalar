import { describe, expect, it } from 'vitest'

import { base64Decode, base64Encode } from './base64'

describe('base64Encode', () => {
  it('encodes ASCII strings', () => {
    expect(base64Encode('admin:password')).toBe('YWRtaW46cGFzc3dvcmQ=')
  })

  it('encodes Polish characters (żółć)', () => {
    expect(base64Encode('admin:żółć')).toBe('YWRtaW46xbzDs8WCxIc=')
  })

  it('encodes Cyrillic characters (тест)', () => {
    expect(base64Encode('user:тест')).toBe('dXNlcjrRgtC10YHRgg==')
  })

  it('encodes emoji characters', () => {
    expect(base64Encode('test:🔒')).toBe('dGVzdDrwn5SS')
  })

  it('encodes Chinese characters', () => {
    expect(base64Encode('用户:密码')).toBe('55So5oi3Oud7gOeggg==')
  })

  it('handles empty strings', () => {
    expect(base64Encode('')).toBe('')
  })

  it('encodes mixed Unicode characters', () => {
    const mixed = 'hello世界żółć🌍'
    const encoded = base64Encode(mixed)
    expect(encoded).toBeTruthy()
    // Verify it can be decoded back
    expect(base64Decode(encoded)).toBe(mixed)
  })
})

describe('base64Decode', () => {
  it('decodes ASCII strings', () => {
    expect(base64Decode('YWRtaW46cGFzc3dvcmQ=')).toBe('admin:password')
  })

  it('decodes Polish characters (żółć)', () => {
    expect(base64Decode('YWRtaW46xbzDs8WCxIc=')).toBe('admin:żółć')
  })

  it('decodes Cyrillic characters (тест)', () => {
    expect(base64Decode('dXNlcjrRgtC10YHRgg==')).toBe('user:тест')
  })

  it('decodes emoji characters', () => {
    expect(base64Decode('dGVzdDrwn5SS')).toBe('test:🔒')
  })

  it('decodes Chinese characters', () => {
    expect(base64Decode('55So5oi3Oud7gOeggg==')).toBe('用户:密码')
  })

  it('handles empty strings', () => {
    expect(base64Decode('')).toBe('')
  })
})

describe('base64Encode/Decode round-trip', () => {
  it('correctly encodes and decodes various Unicode strings', () => {
    const testStrings = ['simple', 'admin:password', 'żółć', 'тест', '🔒🌍', '用户:密码', 'mixed_ABC_123_żółć_тест_🌍']

    testStrings.forEach((str) => {
      expect(base64Decode(base64Encode(str))).toBe(str)
    })
  })
})
