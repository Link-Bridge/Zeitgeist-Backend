-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_id_report_fkey";

-- DropForeignKey
ALTER TABLE "expense_report" DROP CONSTRAINT "expense_report_id_employee_fkey";

-- AlterTable
ALTER TABLE "expense_report" ALTER COLUMN "id_employee" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_id_report_fkey" FOREIGN KEY ("id_report") REFERENCES "expense_report"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expense_report" ADD CONSTRAINT "expense_report_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "employee"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
