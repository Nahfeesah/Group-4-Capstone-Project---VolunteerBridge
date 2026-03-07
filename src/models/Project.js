import pool from "../config/database.js";

const Project = {

    async findAllProjects() {
        const [rows] = await pool.query(
            "SELECT * FROM projects ORDER BY created_at DESC"
        );
        return rows;
    },

    async findProjectById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM projects WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    async createProject(data) {
        const { name, description, startDate, endDate, status, createdBy } = data;

        const [result] = await pool.query(
            `INSERT INTO projects (name, description, start_date, end_date, status, created_by)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, description, startDate, endDate, status, createdBy]
        );

        return {
            id: result.insertId,
            ...data
        };
    },

    async updateProjectStatus(id, status) {
        await pool.query(
            "UPDATE projects SET status = ? WHERE id = ?",
            [status, id]
        );

        return { id, status };
    }

};

export default Project;