import { AppError } from './app.error.js';

// Extrae los últimos 4 caracteres de una cadena.
export function extractLast4(value) {
  try {
    if (value === null || value === undefined) {
      throw new AppError("El valor proporcionado es nulo o indefinido", 400);
    }

    const str = String(value).trim();

    if (str.length === 0) {
      throw new AppError("La cadena está vacía", 400);
    }

    return str.length <= 4 ? str : str.slice(-4);

  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error al extraer los últimos 4 caracteres", 500, error);
  }
}

export function validateProduct(product, cuantity) {
  try {
    if (cuantity <= product.stock) {
      const totalAmount = cuantity * product.price;
      return totalAmount;
    }
    throw new AppError('La cantidad solicitada excede el stock disponible', 400);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Error al validar el producto y la cantidad', 500, error);
  }
}

/**
 * @param {object} resource - El objeto que quieres validar (ej: cuenta, tarjeta)
 * @param {string} ownerKey - La propiedad que indica el dueño en el objeto (ej: "userId", "accountId")
 * @param {number|string} ownerId - El ID con el que se valida la propiedad
 * @param {string} errorMessage - Mensaje de error opcional
 */
export function validateOwnership(resource, ownerKey, ownerId, errorMessage = null) {
  if (!resource[ownerKey] || resource[ownerKey] !== ownerId) {
    throw new AppError(
      errorMessage || `El recurso no pertenece al propietario especificado`,
      400
    );
  }
}