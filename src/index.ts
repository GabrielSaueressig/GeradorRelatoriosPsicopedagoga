
import { pacienteService } from './services/paciente';

async function main() {

    try {

        const atividades = await pacienteService.buscarAtividadesPorMes(1, 4, 2026);

        if (atividades.length === 0) {
            console.log("Nenhuma atividade encontrada para este mês.");
        } else {
            console.table(atividades.map((atv:any) => ({
                Data: atv.consulta.data.toLocaleDateString(),
                Atividade: atv.nome,
                Status: atv.status
            })));
        }
    } catch (error) {
        console.error("❌ Erro ao rodar o sistema:", error);
    }
}

main();