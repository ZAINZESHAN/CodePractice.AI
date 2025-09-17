/*
  Warnings:

  - Added the required column `phoneNumber` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeUrl` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."JobApplication" ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD COLUMN     "resumeUrl" TEXT NOT NULL;
