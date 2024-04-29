-- AlterTable
ALTER TABLE "company" ADD COLUMN     "constitution_date" TIMESTAMP(6),
ADD COLUMN     "rfc" VARCHAR(13),
ADD COLUMN     "tax_residence" VARCHAR(255);
