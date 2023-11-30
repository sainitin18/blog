import express from "express";
import userModel from '../models/userModel.js';
import exportToExcel from '../exportToExcel.js';

const router = express.Router();

router.get('/export-to-excel', async (req, res) => {
    try {
        const users = await userModel.find();
        console.log(users);
        const data = users.map((user) => ({
            name: user.username,
            email: user.email,
        }));

        const excelBuffer = await exportToExcel(data);
        console.log(excelBuffer);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
        res.setHeader('Content-Length', excelBuffer.length);

        res.send(excelBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;