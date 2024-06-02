/*
  Warnings:

  - You are about to drop the column `category` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `justification` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `expense` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `expense_report` table. All the data in the column will be lost.

*/

-- AlterTable
ALTER TABLE "expense" DROP COLUMN "category",
DROP COLUMN "justification",
DROP COLUMN "status";

-- AlterTable
ALTER TABLE "expense_report" DROP COLUMN "description";
