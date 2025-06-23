// 🖨️ Imprime várias etiquetas em lote
import { enviarSocket } from './utils.js';
import { gerarZplEtiqueta } from './geradorZpl.js';

export async function imprimirLista({ lista, ip }) {
    if (!lista || !ip) {
        throw new Error("Dados incompletos para impressão.");
    }

    let zplCompleto = '';

    for (const item of lista) {
        const { ean, nome, codigoInterno, quantidade } = item;
        const texto = `${nome}\n${codigoInterno}`;

        // 🏗️ Gera o ZPL para cada item
        const zpl = await gerarZplEtiqueta({ ean13: ean, texto, quantidade });

        if (!zpl) {
            throw new Error(`Erro ao gerar ZPL para ${nome}`);
        }

        zplCompleto += zpl;
    }

    // 🔌 Envia o conjunto completo
    await enviarSocket(ip, 9100, zplCompleto);

    return "Impressão enviada com sucesso.";
}
