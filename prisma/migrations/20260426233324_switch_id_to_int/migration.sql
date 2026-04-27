/*
  Warnings:

  - The primary key for the `AtividadeRealizada` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AtividadeRealizada` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Consulta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Consulta` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Paciente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Paciente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `consultaId` on the `AtividadeRealizada` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pacienteId` on the `Consulta` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AtividadeRealizada" DROP CONSTRAINT "AtividadeRealizada_consultaId_fkey";

-- DropForeignKey
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_pacienteId_fkey";

-- AlterTable
ALTER TABLE "AtividadeRealizada" DROP CONSTRAINT "AtividadeRealizada_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "consultaId",
ADD COLUMN     "consultaId" INTEGER NOT NULL,
ADD CONSTRAINT "AtividadeRealizada_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "pacienteId",
ADD COLUMN     "pacienteId" INTEGER NOT NULL,
ADD CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtividadeRealizada" ADD CONSTRAINT "AtividadeRealizada_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
