import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Export.css';
import WC from "../images/wc.png"

function Export() {
    const [excelData, setExcelData] = useState(null);
    const [buttonVisible, setButtonVisible] = useState(true);

    const handleExportToExcel = async () => {
        try {
            const response = await axios.get('/api/v1/export-to-excel', {
                responseType: 'blob',
            });
            console.log(response);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            console.log(url)
            setExcelData(url);
            setButtonVisible(false);
        } catch (error) {
            console.log('Error exporting to Excel:', error);
        }
    };
    const imageStyle = {
        backgroundImage: `url(${WC})`,
    };
    return (
        <div className='export-container'>
            <div className='export-image' style={imageStyle}></div>
            <div className='export-content' >
                {buttonVisible && <button onClick={handleExportToExcel}>Export to Excel</button>}

                {excelData && (
                    <div className='onExport'>
                        <h2>Excel Data is ready to download!</h2>
                        <a href={excelData} download="data.xlsx" className='download-link'>
                            Download Excel File
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Export