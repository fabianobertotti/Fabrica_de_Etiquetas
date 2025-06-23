// 🔍 Função para buscar produto pelo código interno
export async function buscarPorCodigo(codigo) {
    // ✅ Remove espaços extras
    codigo = codigo.trim();

    // 🔒 Valida se é numérico
    if (!/^\d+$/.test(codigo)) {
        return "Código inválido!";
    }

    // 📂 Caminho do CSV
    const caminho = '../Base_de_Dados/Produtos.csv';

    // 📖 Lê o arquivo CSV
    const csv = await fetch(caminho).then(r => r.text());
    const linhas = csv.split('\n');

    for (const linha of linhas) {
        const colunas = linha.split(',');
        if (colunas.length < 3) continue;

        if (colunas[2].trim() === codigo) {
            const ean = colunas[0].trim();
            const nome = colunas[1].trim();
            const codigoInterno = colunas[2].trim();
            return `${nome}||${codigoInterno}||${ean}`;
        }
    }

    // ❌ Se não encontrar
    return "Não encontrado!";
}