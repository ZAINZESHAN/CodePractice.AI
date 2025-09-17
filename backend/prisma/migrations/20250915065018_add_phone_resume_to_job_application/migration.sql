/*
  Warnings:

  - Made the column `phone` on table `JobApplication` required. This step will fail if there are existing NULL values in that column.
  - Made the column `resumeUrl` on table `JobApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."JobApplication" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "resumeUrl" SET NOT NULL;
