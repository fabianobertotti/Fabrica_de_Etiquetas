// 🖨️ Envia ZPL de uma etiqueta para impressora
import { enviarSocket, obterIpPadrao } from './utils.js';

export async function imprimir(dados) {
    const { ip, zpl } = typeof dados === 'object' ? dados : {};

    // 🔒 Validação
    if (!zpl || typeof zpl !== 'string' || zpl.trim() === '') {
        throw new Error("Nenhum ZPL recebido para impressão.");
    }

    const ipDestino = ip || await obterIpPadrao();

    // 🔌 Envia via socket
    await enviarSocket(ipDestino, 9100, zpl);

    return "Impressão enviada com sucesso.";
}