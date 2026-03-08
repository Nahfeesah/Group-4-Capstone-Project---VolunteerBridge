import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Volunteer = sequelize.define("Volunteer", {
    skills: DataTypes.STRING,
    availability: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
});
export default Volunteer;