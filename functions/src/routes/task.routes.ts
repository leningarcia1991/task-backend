import { Router } from "express";
import { TaskController } from "../infrastructure/controllers/task.controller";
import { UpdateTaskDto } from "../application/dtos/task/update-task.dto";
import { CreateTaskDto } from "../application/dtos/task/create-task.dto";
import { IdDto } from "../application/dtos/common/id.dto";
import { GetTasksDto } from "../application/dtos/task/get-tasks.dto";
import { validateBody, validateParams } from "../infrastructure/middlewares/validation.middleware";

const router = Router();

/**
 * @route POST /tasks
 * @summary Creates a new task.
 * @param {CreateTaskDto} request.body.required - Task creation data
 */
router.post("/",
  validateBody(CreateTaskDto),
  TaskController.create
);
/**
 * @route PUT /tasks/:id
 * @summary Updates an existing task by ID.
 * @param {IdDto} request.params.required - Task ID parameter
 * @param {UpdateTaskDto} request.body.required - Task update data
 */
router.put("/:id",
  validateParams(IdDto),
  validateBody(UpdateTaskDto),
  TaskController.update
);
/**
 * @route DELETE /tasks/:id
 * @summary Deletes a task by ID.
 * @param {IdDto} request.params.required - Task ID parameter
 */
router.delete("/:id",
  validateParams(IdDto),
  TaskController.delete
);
// GET /tasks/:email
/**
 * @route GET /tasks/:email
 * @summary Retrieves tasks for a user by email.
 * @param {GetTasksDto} request.params.required - User email parameter
 */
router.get("/:email",
  validateParams(GetTasksDto),
  TaskController.getTasks
);

export default router;
