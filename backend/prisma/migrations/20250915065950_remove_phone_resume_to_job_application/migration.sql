/*
  Warnings:

  - You are about to drop the column `phone` on the `JobApplication` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `JobApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."JobApplication" DROP COLUMN "phone",
DROP COLUMN "resumeUrl";
