import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { SupportedDepartments, SupportedRoles } from '../src/utils/enums';

const prisma = new PrismaClient();

async function seedRoles(): Promise<void> {
  console.log('Seeding roles...');
  for (const roleKey of Object.values(SupportedRoles)) {
    if (await prisma.role.findFirst({ where: { title: roleKey } })) {
      continue;
    } else {
      const id = randomUUID();
      await prisma.role.create({
        data: {
          id,
          title: roleKey,
        },
      });
    }
  }
  console.log('Roles seeded.');
}

async function seedDepartments(): Promise<void> {
  console.log('Seeding departments...');
  for (const departmentKey of Object.values(SupportedDepartments)) {
    if (await prisma.department.findFirst({ where: { title: departmentKey } })) {
      continue;
    } else {
      const id = randomUUID();
      await prisma.department.create({
        data: {
          id,
          title: departmentKey,
        },
      });
    }
  }
  console.log('Departments seeded successfully.');
}

async function runSeeder(): Promise<void> {
  try {
    await seedRoles();
    await seedDepartments();
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

void runSeeder();
