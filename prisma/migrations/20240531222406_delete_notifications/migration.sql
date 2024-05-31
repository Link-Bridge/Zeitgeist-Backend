/*
  Warnings:

  - You are about to drop the column `device_token` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `expense_report` table. All the data in the column will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `expense_report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_id_employee_fkey";

-- DropForeignKey
ALTER TABLE "employee_notification" DROP CONSTRAINT "employee_notification_id_employee_fkey";

-- DropForeignKey
ALTER TABLE "employee_notification" DROP CONSTRAINT "employee_notification_id_notification_fkey";

-- AlterTable
ALTER TABLE "employee" DROP COLUMN "device_token";

-- DropTable
DROP TABLE "comment";

-- DropTable
DROP TABLE "employee_notification";

-- DropTable
DROP TABLE "notification";
