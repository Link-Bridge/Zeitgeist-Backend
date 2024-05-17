-- DropForeignKey
ALTER TABLE "employee_task" DROP CONSTRAINT "employee_task_id_task_fkey";

-- AddForeignKey
ALTER TABLE "employee_task" ADD CONSTRAINT "employee_task_id_task_fkey" FOREIGN KEY ("id_task") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
