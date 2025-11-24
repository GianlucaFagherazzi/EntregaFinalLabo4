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

export function validateBuyerSeller(movementUsers) {
  try {
    const buyer = movementUsers.find(mu => mu.rol === "buyer");
    const seller = movementUsers.find(mu => mu.rol === "seller");

    // Asegurar que buyer y seller no sean la misma entidad en la BD
    if (buyer.userId === seller.userId) {
      throw new AppError("Buyer y seller no pueden ser el mismo usuario", 400);
    }

    // Prevenir duplicados exactos por ID real (no solo payload)
    const uniqueKeys = new Set(movementUsers.map(mu => `${mu.userId}-${mu.accountId}-${mu.rol}`));
    if (uniqueKeys.size !== movementUsers.length) {
      throw new AppError("Hay registros movementUsers duplicados", 400);
    }

    return { buyer, seller };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('Error al validar el producto y la cantidad', 500, error);
  }
}
