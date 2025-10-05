export class FormatUtil {
    static formatar(valor: number, comSimbolo: boolean = true): string {
        if (valor == null || isNaN(valor)) return '0,00';

        const options: Intl.NumberFormatOptions = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        };

        if (comSimbolo) {
            options.style = 'currency';
            options.currency = 'BRL';
        }

        return valor.toLocaleString('pt-BR', options);
    }
}
