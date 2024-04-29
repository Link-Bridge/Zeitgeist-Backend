/*
  Warnings:

  - You are about to drop the column `address` on the `form` table. All the data in the column will be lost.
  - You are about to drop the column `mexican_address` on the `form` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mexican_address]` on the table `company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "form_address_key";

-- DropIndex
DROP INDEX "form_mexican_address_key";

-- AlterTable
ALTER TABLE "company" ADD COLUMN     "constitution_date" TIMESTAMP(6),
ADD COLUMN     "mexican_address" VARCHAR(256),
ADD COLUMN     "rfc" VARCHAR(12);

-- AlterTable
ALTER TABLE "form" DROP COLUMN "address",
DROP COLUMN "mexican_address";

-- CreateIndex
CREATE UNIQUE INDEX "company_mexican_address_key" ON "company"("mexican_address");
