-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_id_company_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_id_project_fkey";

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_id_company_fkey" FOREIGN KEY ("id_company") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_id_project_fkey" FOREIGN KEY ("id_project") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
