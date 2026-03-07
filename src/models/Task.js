import pool from "../config/database.js";

const Task = {

    async findTasksByProjectId(projectId) {
        const [rows] = await pool.query(
            "SELECT * FROM tasks WHERE project_id = ?",
            [projectId]
        );
        return rows;
    },

    async findTaskById(id) {
        const [rows] = await pool.query(
            "SELECT * FROM tasks WHERE id = ?",
            [id]
        );
        return rows[0];
    },

    async createTask(data) {

        const {
            projectId,
            title,
            description,
            dueDate,
            estimatedHours,
            status,
            createdBy
        } = data;

        const [result] = await pool.query(
            `INSERT INTO tasks 
            (project_id, title, description, due_date, estimated_hours, status, created_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                projectId,
                title,
                description,
                dueDate,
                estimatedHours,
                status,
                createdBy
            ]
        );

        return {
            id: result.insertId,
            ...data
        };
    },

    async assignTaskToVolunteer(taskId, volunteerId) {

        await pool.query(
            "UPDATE tasks SET assigned_to = ? WHERE id = ?",
            [volunteerId, taskId]
        );

        return {
            taskId,
            volunteerId
        };
    },

    async updateTaskStatus(taskId, status) {

        await pool.query(
            "UPDATE tasks SET status = ? WHERE id = ?",
            [status, taskId]
        );

        return {
            taskId,
            status
        };
    }

};

export default Task;