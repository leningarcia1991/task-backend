import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/app-error";

/**
 * Validates and sanitizes the request body using a DTO.
 * - Transforms plain object to class instance
 * - Removes unknown properties
 * - Throws VALIDATION_ERROR on failure
 *
 * @param dtoClass DTO class to validate against
 */
export function validateBody<T extends object>(dtoClass: new () => T) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(dtoClass, req.body);

      await validateOrReject(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      req.body = dto;
      next();
    } catch (errors) {
      next(buildValidationError(errors));
    }
  };
}

/**
 * Middleware to validate request params against a DTO class.
 * On success, attaches the validated DTO to req.params.
 * Removes any unknown properties from req.params.
 * Throws VALIDATION_ERROR on failure.
 *
 * @param dtoClass
 * @return
 **/
export function validateParams<T extends object>(dtoClass: new () => T) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(dtoClass, req.params);
      console.log("Validating params:", dto);
      await validateOrReject(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      req.params = dto as Request["params"];
      next();
    } catch (errors) {
      next(buildValidationError(errors));
    }
  };
}
/**
 * Builds a standardized AppError for validation failures.
 * @param errors
 * @returns
 */
function buildValidationError(errors: unknown) {
  const messages = (errors as ValidationError[])
    .map((err) => Object.values(err.constraints ?? {}).join(", "))
    .join("; ");

  return new AppError(messages, 400, "VALIDATION_ERROR");
}
