// 705.404.450-52  -  070.9.87.720-03
/*

7x  0x  5x  4x  8x  4x  4x  5x  0
10  9   8   7   6   5   4   3   2
70  0   40  28  48  20  16  15  0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0

7x  0x  5x  4x  8x  4x  4x  5x  0
10  9   8   7   6   5   4   3   2
70  45  32  56  24  20  20  0  10 = 284

11 - (284 % 11) = 2 (Segundo dígito)
Se o número digito for maior que 9, consideramos 0
*/

// Função Construtora
// Objeto molde
function ValidaCPF(cpfEnviado) {   
    // Propriedade cpfLimpo
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true, // mostrar a chave 

        // Método Getter
        // Trocando tudo o que não é número (/\D+/g) para nada ('')
        get: function() {
            return cpfEnviado.replace(/\D+/g, '')
        }
    })
}

// Métodos do objeto ValidaCPF dentro do seu __proto__
ValidaCPF.prototype.valida = function () {
    // Validação do CPF
    if (typeof this.cpfLimpo === 'undefined') return false
    if (this.cpfLimpo.length !== 11) return false
    if (this.isSequencia()) return false

    // Pegando o CPF menos os 2 últimos dígitos
    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const digito1 = this.criaDigito(cpfParcial)
    const digito2 = this.criaDigito(cpfParcial + digito1)
    
    // Concatenando o CPF
    const novoCpf = cpfParcial + digito1 + digito2
    return novoCpf === this.cpfLimpo
}

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    // String para Array
    const cpfArray = Array.from(cpfParcial)

    // Conta
    let regressivo = cpfArray.length + 1 // tamanho do array
    const total = cpfArray.reduce((acumulador, val) => {
        acumulador += (regressivo * Number(val))
        regressivo--

        return acumulador
    }, 0)

    const digito = 11 - (total % 11)

    return digito > 9 ? '0' : String(digito)
}

// Verifianco se o cpf não é uma sequencia de um número
// Por exemplo: 111.111.111-11
ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length)
    return sequencia === this.cpfLimpo
}

// Instanciando um objeto com o molde do objeto ValidaCPF
const cpf = new ValidaCPF('705.404.450-52')

if (cpf.valida()) {
    console.log('CPF válido')
} else {
    console.log('CPF inválido')
}