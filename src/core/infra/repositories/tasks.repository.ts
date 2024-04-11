import { Prisma } from '../../..';
import { Task } from '../../domain/entities/task.entity';
import { NotFoundError } from '../../errors/not-found.error';
import { mapTaskEntityFromDbModel } from '../mappers/task-entity-from-db-model-mapper';

async function findTasksByProjectId (id_project: string) : Promise<Task[]> {
    let data = await Prisma.task.findMany({
        where: {
            id_project: id_project
        },
    });

    if (!data) {
        throw new NotFoundError('Task');
    }

    return data.map(mapTaskEntityFromDbModel);
}

export const TaskRepository = { findTasksByProjectId };