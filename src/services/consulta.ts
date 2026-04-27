import { prisma } from '../lib/prisma'



export const consultaService = {
    async excluirConsulta(id: number) {
        await prisma.consulta.delete({
            where: {
                id: id
            }
        });
    },

    async criarConsulta(data: Date, idPaciente: number) {
        await prisma.consulta.create({
            data: {
                data,
                pacienteId: idPaciente
            }
        });
    },

    async atualizarConsulta(id: number, data?: Date) {
        await prisma.consulta.update({
            where: {
                id
            },
            data: {
                ...(data !== undefined && { data: data ?? null })
            }
        })
    }
}