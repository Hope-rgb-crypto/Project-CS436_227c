let screen = document.getElementById('screen');

// ฟังก์ชันเพิ่มตัวเลขลงหน้าจอ
function appendValue(value) {
    // ป้องกันการใส่จุดทศนิยมซ้ำ หรือใส่เครื่องหมายซ้ำติดกัน
    const lastChar = screen.value.slice(-1);
    if (['+', '-', '*', '/', '.'].includes(lastChar) && ['+', '-', '*', '/', '.'].includes(value)) {
        return; 
    }
    screen.value += value;
}

// ฟังก์ชันล้างหน้าจอ (C)
function clearScreen() {
    screen.value = '';
}

// ฟังก์ชันลบตัวสุดท้าย (DEL)
function deleteLast() {
    screen.value = screen.value.toString().slice(0, -1);
}

// ฟังก์ชันคำนวณผลลัพธ์ (=)
function calculate() {
    try {
        if (screen.value === '') return;
        
        // ดักจับการหารด้วย 0
        if (screen.value.includes('/0')) {
            screen.value = 'Error';
            setTimeout(() => clearScreen(), 1500); // รอ 1.5 วิแล้วลบ
            return;
        }

        // คำนวณค่าจริง
        let result = new Function('return ' + screen.value)();
        
        // ถ้าทศนิยมยาวเกินไป ให้ปัดเศษเหลือ 2 ตำแหน่ง
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(2));
        }
        
        screen.value = result;
    } catch (error) {
        screen.value = 'Error';
        setTimeout(() => clearScreen(), 1500);
    }
}