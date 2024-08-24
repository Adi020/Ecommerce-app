function obfuscateName(name) {
  const firstChar = name.charAt(0);
  const lastChar = name.charAt(name.length - 1);
  const obfuscatedMiddle = '*'.repeat(name.length - 2);
  return `${firstChar}${obfuscatedMiddle}${lastChar}`;
}

module.exports = obfuscateName;
