/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "employee_device_token_key";

-- AlterTable
ALTER TABLE "role" ALTER COLUMN "title" SET DEFAULT 'No Role';

-- CreateIndex
CREATE UNIQUE INDEX "department_title_key" ON "department"("title");

-- CreateIndex
CREATE UNIQUE INDEX "role_title_key" ON "role"("title");
