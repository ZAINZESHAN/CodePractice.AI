-- CreateEnum
CREATE TYPE "public"."CompanyStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "status" "public"."CompanyStatus" NOT NULL DEFAULT 'PENDING';
