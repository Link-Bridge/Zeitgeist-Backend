-- DropForeignKey
ALTER TABLE "employee_task" DROP CONSTRAINT "employee_task_id_employee_fkey";

-- AddForeignKey
ALTER TABLE "employee_task" ADD CONSTRAINT "employee_task_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
