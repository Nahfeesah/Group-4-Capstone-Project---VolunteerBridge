import { getSystemReport } from "../services/report.js";

export const systemReport = async (req, res) => {

    try {

        const report = await getSystemReport();

        res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};