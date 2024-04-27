import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { SupportedDepartments, SupportedRoles } from '../src/utils/enums';

const prisma = new PrismaClient();

async function seedRoles(): Promise<void> {
  console.log('Seeding roles...');
  for (const roleKey of Object.values(SupportedRoles)) {
    const id = randomUUID();
    await prisma.role.upsert({
      where: { title: roleKey },
      update: {},
      create: {
        id,
        title: roleKey,
      },
    });
  }
  console.log('Roles seeded.');
}

async function seedDepartments(): Promise<void> {
  console.log('Seeding departments...');
  for (const departmentKey of Object.values(SupportedDepartments)) {
    const id = randomUUID();
    await prisma.department.upsert({
      where: { title: departmentKey },
      update: {},
      create: {
        id,
        title: departmentKey,
      },
    });
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

runSeeder();
