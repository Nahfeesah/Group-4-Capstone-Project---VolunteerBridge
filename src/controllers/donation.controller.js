import Donation from "../models/Donation.js";
import Report from "../models/report.js";

// Get all donations (with related report)
export const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.findAll({
            include: [{ model: Report, as: "report" }],
        });
        res.status(200).json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch donations" });
    }
};

// Get donation by ID
export const getDonationById = async (req, res) => {
    const { id } = req.params;
    try {
        const donation = await Donation.findByPk(id, {
            include: [{ model: Report, as: "report" }],
        });
        if (!donation) return res.status(404).json({ message: "Donation not found" });
        res.status(200).json(donation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch donation" });
    }
};

// Create a new donation

const { report_id, amount, status, paymentMethod } = req.body;

if (!["card", "bank_transfer", "cash"].includes(paymentMethod)) {
    return res.status(400).json({ message: "Invalid payment method" });
}

// Update a donation
export const updateDonation = async (req, res) => {
    const { id } = req.params;
    const { report_id, amount, paymentMethod, status } = req.body;
    try {
        const donation = await Donation.findByPk(id);
        if (!donation) return res.status(404).json({ message: "Donation not found" });

        donation.report_id = report_id ?? donation.report_id;
        donation.amount = amount ?? donation.amount;
        donation.paymentMethod = paymentMethod ?? donation.paymentMethod;
        donation.status = status ?? donation.status;

        await donation.save();
        res.status(200).json(donation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update donation" });
    }
};

// Delete a donation
export const deleteDonation = async (req, res) => {
    const { id } = req.params;
    try {
        const donation = await Donation.findByPk(id);
        if (!donation) return res.status(404).json({ message: "Donation not found" });

        await donation.destroy();
        res.status(200).json({ message: "Donation deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete donation" });
    }
};