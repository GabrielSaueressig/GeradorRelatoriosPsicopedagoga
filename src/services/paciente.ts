import { prisma } from '../lib/prisma'


export const pacienteService = {
    async excluirPaciente(id: number) {
        await prisma.paciente.delete({
            where: {
                id: id
            }
        });
    },

    async criarPaciente(nome: string, email?: string) {
        await prisma.paciente.create({
            data: {
                nome,
                email: email ?? null
            }
        });
    },

    async atualizarPaciente(id: number, nome?: string, email?: string) {
        await prisma.paciente.update({
            where: { id },
            data: {
                ...(nome && { nome }),
                ...(email !== undefined && { email: email ?? null })
            }
        })
    },
    async buscarPacienteCompleto(id: number) {
        return await prisma.paciente.findUnique({
            where: { id },
            include: {
                consultas: {
                    include: {
                        atividades: true
                    }
                }
            }
        })
    },

    async buscarAtividadesPorMes(idPaciente: number, mes: number, ano: number) {

        const inicioMes = new Date(ano, mes - 1, 1);
        const fimMes = new Date(ano, mes, 0, 23, 59, 59);

        return await prisma.atividadeRealizada.findMany({
            where: {
                
                consulta: {
                    pacienteId: idPaciente,
                    data: {
                        gte: inicioMes, // Maior ou igual ao dia 1
                        lte: fimMes    // Menor ou igual ao último dia
                    }
                }
            },
            include: {
                consulta: true 
            }
        });
    }
}