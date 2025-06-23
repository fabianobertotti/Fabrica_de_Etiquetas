// 🖨️ Função para obter impressoras
export async function getImpressoras() {
    const caminho = '../Base_de_Dados/Impressoras.csv';

    try {
        const csv = await fetch(caminho).then(r => r.text());
        const linhas = csv.split('\n').slice(1); // 🧾 Ignora cabeçalho

        return linhas.map(l => {
            const [nome, ip] = l.split(',');
            return { nome, ip };
        }).filter(p => p.nome && p.ip);
    } catch {
        throw new Error("Arquivo de impressoras não encontrado.");
    }
}