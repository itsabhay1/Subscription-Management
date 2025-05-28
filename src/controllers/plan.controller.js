import { Plan } from '../models/plan.model.js';

const getPlans = async (req, res, next) => {
    try {
        const plans = await Plan.find();
        res.status(200).json({
            success: true,
            plans
        });
    } catch (error) {
        next(error);
    }
}

export { getPlans };