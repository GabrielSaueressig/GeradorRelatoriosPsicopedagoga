import { Status } from '@prisma/client'
import { prisma } from '../lib/prisma'


export const atividadeService = {
    async excluirAtividade(id: number) {
        await prisma.atividadeRealizada.delete({
            where: {
                id: id
            }
        });
    },

    async criarAtividade(nome: string, idConsulta: number, status: Status) {
        await prisma.atividadeRealizada.create({
            data: {
                nome, 
                consultaId: idConsulta,
                status
            }
        });
    },

    async atualizarAtividade(id: number, nome?: string, status?: Status) {
        await prisma.atividadeRealizada.update({
            where: {
                id
            },
            data: {
                ...(nome !== undefined && { nome: nome ?? null }),
                ...(status !== undefined && { status: status ?? null })
            }
        })
    }
}