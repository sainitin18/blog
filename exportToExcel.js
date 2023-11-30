import exceljs from 'exceljs';

const exportToExcel = async (data) => {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    worksheet.addRow(['Name', 'Email']);

    data.forEach((user) => {
        worksheet.addRow([user.name, user.email]);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};
export default exportToExcel;
