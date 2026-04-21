import { CheckoutService } from "../services/checkout.services.js";

export const CheckoutController = {

    async checkout(req, res, next) {
        try {
            const userId = req.user.id;
            const { accountId, tarjetId } = req.body;
            const result = await CheckoutService.checkout( userId, accountId, tarjetId );

            res.json({success: true, data: result});

        } catch (error) {
            next(error);
        }
    }
};