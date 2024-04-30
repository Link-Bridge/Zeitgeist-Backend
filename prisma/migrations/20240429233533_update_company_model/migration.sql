/*
  Warnings:

  - You are about to drop the column `address` on the `form` table. All the data in the column will be lost.
  - You are about to drop the column `mexican_address` on the `form` table. All the data in the column will be lost.
  - You are about to drop the column `waiting_for` on the `task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[device_token]` on the table `employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "form_address_key";

-- DropIndex
DROP INDEX "form_mexican_address_key";

-- AlterTable
ALTER TABLE "form" DROP COLUMN "address",
DROP COLUMN "mexican_address";

-- AlterTable
ALTER TABLE "task" DROP COLUMN "waiting_for";

-- CreateIndex
CREATE UNIQUE INDEX "employee_device_token_key" ON "employee"("device_token");
