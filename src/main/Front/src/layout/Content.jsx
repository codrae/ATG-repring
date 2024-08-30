import React, { useState } from "react";
import '../styles/Content.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

const Content = ({ selectedProcess, setSelectedProcess, isLoggedIn }) => {
    const [selectedEquipment, setSelectedEquipment] = useState("전체 보기");
    const [contentVisible, setContentVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const processes = [
        { id: 'process1', name: '공정 1' },
        { id: 'process2', name: '공정 2' },
        { id: 'process3', name: '공정 3' }
    ];

    const equipments = {
        process1: [
            { id: 'eq1', name: '설비 1-1' },
            { id: 'eq2', name: '설비 1-2' },
            { id: 'eq3', name: '설비 1-3' }
        ],
        process2: [
            { id: 'eq4', name: '설비 2-1' },
            { id: 'eq5', name: '설비 2-2' }
        ],
        process3: [
            { id: 'eq6', name: '설비 3-1' }
        ]
    };

    const equipmentData = {
        eq1: { value: 120, max1Day: 150, max1Week: 200, max1Month: 300, status: 'Good' },
        eq2: { value: 100, max1Day: 120, max1Week: 180, max1Month: 250, status: 'Warning' },
        eq3: { value: 90, max1Day: 110, max1Week: 160, max1Month: 230, status: 'Critical' },
        eq4: { value: 110, max1Day: 140, max1Week: 190, max1Month: 260, status: 'Good' },
        eq5: { value: 105, max1Day: 130, max1Week: 170, max1Month: 240, status: 'Warning' },
        eq6: { value: 95, max1Day: 125, max1Week: 180, max1Month: 255, status: 'Good' }
    };

    const handleProcessChange = (e) => {
        setSelectedProcess(e.target.value);
        setSelectedEquipment("전체 보기");
        setContentVisible(false);
    };

    const handleEquipmentChange = (e) => {
        setSelectedEquipment(e.target.value);
        setContentVisible(false);
    };

    const handleConfirm = () => {
        if (!isLoggedIn) {
            setModalVisible(true);
        } else if (selectedProcess && selectedEquipment) {
            setContentVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const downloadCSV = () => {
        if (selectedEquipment === "전체 보기") {
            const data = equipments[selectedProcess].map(equipment => ({
                ...equipment,
                ...equipmentData[equipment.id]
            }));

            let csvContent = "설비 ID,이름,Value,1일 최댓값,1주일 최댓값,한달 최댓값,상태\n";

            data.forEach(equipment => {
                const row = `${equipment.id},${equipment.name},${equipment.value},${equipment.max1Day},${equipment.max1Week},${equipment.max1Month},${equipment.status}`;
                csvContent += row + "\n";
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "equipment_data.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const downloadPDF = () => {
        const doc = new window.jsPDF();
        doc.text(20, 20, `선택된 공정: ${processes.find(p => p.id === selectedProcess)?.name}`);
        doc.text(20, 30, `선택된 설비: ${selectedEquipment}`);

        if (selectedEquipment === "전체 보기") {
            doc.text(20, 40, '설비 목록:');
            const data = equipments[selectedProcess].map(equipment => ({
                ...equipment,
                ...equipmentData[equipment.id]
            }));

            data.forEach((equipment, index) => {
                doc.text(20, 50 + (index * 10), `${equipment.name} - Value: ${equipment.value}, 상태: ${equipment.status}`);
            });
        } else {
            doc.text(20, 40, '선택된 설비의 그래프 데이터를 참고하십시오.');
        }

        doc.save('content_data.pdf');
    };

    const renderTable = () => {
        if (!selectedProcess || !equipments[selectedProcess]) {
            return <p>공정이 선택되지 않았거나, 해당 공정에 대한 데이터가 없습니다.</p>;
        }

        const data = equipments[selectedProcess].map(equipment => ({
            ...equipment,
            ...equipmentData[equipment.id]
        }));

        return (
            <table className="equipment-table">
                <thead>
                <tr>
                    <th>설비 ID</th>
                    <th>이름</th>
                    <th>Value</th>
                    <th>1일 최댓값</th>
                    <th>1주일 최댓값</th>
                    <th>한달 최댓값</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody>
                {data.map((equipment, index) => (
                    <tr key={index}>
                        <td>{equipment.id}</td>
                        <td>{equipment.name}</td>
                        <td>{equipment.value}</td>
                        <td>{equipment.max1Day}</td>
                        <td>{equipment.max1Week}</td>
                        <td>{equipment.max1Month}</td>
                        <td>{equipment.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    };

    const renderChart = () => {
        const data = {
            labels: ['01:00', '05:00', '09:00', '13:00', '17:00', '21:00'],
            datasets: [
                {
                    label: '2024-08-30 설비 데이터',
                    data: [120, 180, 150, 160, 200, 175],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                },
            ],
        };

        const threshold = 180;
        const warningMessages = data.datasets[0].data.map((value, index) => {
            if (value >= threshold) {
                return `! ${data.labels[index]}시경 ${value}으로 기준치를 초과하였음 !`;
            }
            return null;
        }).filter(Boolean);

        return (
            <div className="chart-container">
                <Line data={data} />
                <div className="chart-comment">
                    {warningMessages.map((message, index) => (
                        <p key={index} style={{ color: 'red', fontWeight: 'bold' }}>
                            {message}
                        </p>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="content-div">
            <h2>Process and Equipment Selection</h2>
            <div className="dropdown-group">
                <select
                    value={selectedProcess}
                    onChange={handleProcessChange}
                    className="dropdown">
                    <option value="">공정을 선택하세요</option>
                    {processes.map((process) => (
                        <option key={process.id} value={process.id}>
                            {process.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedEquipment}
                    onChange={handleEquipmentChange}
                    className="dropdown"
                    disabled={!selectedProcess}>
                    <option value="전체 보기">전체 보기</option>
                    {selectedProcess && equipments[selectedProcess].map((equipment, index) => (
                        <option key={index} value={equipment.id}>
                            {equipment.name}
                        </option>
                    ))}
                </select>
                <button type="button" className="confirm-button" onClick={handleConfirm}>
                    확인
                </button>
            </div>

            {contentVisible && (
                <div className="content-display">
                    <h3>선택된 공정: {processes.find(p => p.id === selectedProcess)?.name}</h3>
                    <h3>선택된 설비: {selectedEquipment}</h3>
                    {selectedEquipment === "전체 보기" ? renderTable() : renderChart()}
                    <div className="download-buttons">
                        <button className="download-button" onClick={downloadCSV}>
                            CSV로 다운로드
                        </button>
                        <button className="download-button" onClick={downloadPDF}>
                            PDF로 다운로드
                        </button>
                    </div>
                </div>
            )}

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>로그인 되지 않았습니다</h2>
                        <p>이 기능을 사용하려면 로그인해야 합니다.</p>
                        <button className="close-modal-button" onClick={closeModal}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Content;
