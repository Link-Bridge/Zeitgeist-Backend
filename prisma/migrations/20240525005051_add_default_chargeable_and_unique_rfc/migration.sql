/*
  Warnings:

  - A unique constraint covering the columns `[rfc]` on the table `company` will be added. If there are existing duplicate values, this will fail.
  - Made the column `is_chargeable` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
UPDATE "project" SET "is_chargeable" = false WHERE "is_chargeable" IS NULL;

-- AlterTable
ALTER TABLE "project" ALTER COLUMN "is_chargeable" SET NOT NULL,
ALTER COLUMN "is_chargeable" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "company_rfc_key" ON "company"("rfc");
