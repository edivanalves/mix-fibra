import { cpf, cnpj } from 'cpf-cnpj-validator';

/**
 * Aplica uma máscara dinâmica de CPF ou CNPJ.
 * @param {string} value O valor a ser mascarado.
 * @returns {string} O valor com a máscara.
 */
export const maskDocument = (value) => {
  const cleanedValue = value.replace(/\D/g, '');

  if (cleanedValue.length <= 11) {
    // Máscara de CPF: 000.000.000-00
    return cleanedValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  
  // Máscara de CNPJ: 00.000.000/0000-00
  return cleanedValue
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};


/**
 * Verifica se um documento (CPF ou CNPJ) é válido.
 * @param {string} doc O número do documento.
 * @returns {boolean} True se for válido, false caso contrário.
 */
export const isValidDocument = (doc) => {
    const cleanedDoc = doc.replace(/\D/g, '');
    if (!cleanedDoc) return false;
    return cpf.isValid(cleanedDoc) || cnpj.isValid(cleanedDoc);
}