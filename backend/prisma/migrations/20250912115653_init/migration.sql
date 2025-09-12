/*
  Warnings:

  - You are about to drop the column `status` on the `Company` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "salary" INTEGER NOT NULL DEFAULT 0;

-- DropEnum
DROP TYPE "public"."CompanyStatus";
