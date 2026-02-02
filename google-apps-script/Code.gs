// ===================================
// GOOGLE APPS SCRIPT - ORDER MANAGEMENT
// Deploy this as a Web App to receive orders from landing page
// ===================================

/**
 * Handle POST requests from the landing page
 * @param {Object} e - Event object containing POST data
 * @returns {Object} - JSON response
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Validate the data
    if (!validateOrderData(data)) {
      return createResponse(false, 'Invalid data');
    }
    
    // Save to Google Sheet
    const result = saveOrderToSheet(data);
    
    if (result.success) {
      return createResponse(true, 'Order saved successfully');
    } else {
      return createResponse(false, result.error);
    }
    
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createResponse(false, 'Server error: ' + error.toString());
  }
}

/**
 * Handle GET requests (for testing)
 * @returns {Object} - HTML response
 */
function doGet() {
  return HtmlService.createHtmlOutput(
    '<h1>Wine Order API</h1>' +
    '<p>This endpoint accepts POST requests with order data.</p>' +
    '<p>Status: Active ✅</p>'
  );
}

/**
 * Test function - Run this in Apps Script editor to verify everything works
 * This simulates a POST request with test data
 */
function testDoPost() {
  // Create mock event object
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Test User',
        phone: '0123456789',
        address: '123 Test Street, Test City',
        quantity: 2,
        total: 1998000,
        status: 'Mới'
      })
    }
  };
  
  // Call doPost with mock data
  const result = doPost(mockEvent);
  
  // Log result
  Logger.log('Test Result:');
  Logger.log(result.getContent());
  
  return 'Test completed! Check Logs (View > Logs) and your Google Sheet';
}

/**
 * Validate order data
 * @param {Object} data - Order data
 * @returns {boolean} - True if valid
 */
function validateOrderData(data) {
  // Check required fields
  if (!data.name || !data.phone || !data.address || !data.quantity) {
    return false;
  }
  
  // Validate name
  if (data.name.length < 2 || data.name.length > 100) {
    return false;
  }
  
  // Validate phone (Vietnamese format)
  const phoneRegex = /^0\d{9,10}$/;
  if (!phoneRegex.test(data.phone)) {
    return false;
  }
  
  // Validate address
  if (data.address.length < 10 || data.address.length > 500) {
    return false;
  }
  
  // Validate quantity
  if (data.quantity < 1 || data.quantity > 100) {
    return false;
  }
  
  return true;
}

/**
 * Save order to Google Sheet
 * @param {Object} data - Order data
 * @returns {Object} - {success: boolean, error: string}
 */
function saveOrderToSheet(data) {
  try {
    Logger.log('=== Starting saveOrderToSheet ===');
    Logger.log('Data received: ' + JSON.stringify(data));
    
    // Get the active spreadsheet (the one this script is bound to)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    Logger.log('Spreadsheet name: ' + spreadsheet.getName());
    
    const sheet = spreadsheet.getActiveSheet();
    Logger.log('Active sheet name: ' + sheet.getName());
    Logger.log('Current row count: ' + sheet.getLastRow());
    
    // Check if headers exist, if not create them
    if (sheet.getLastRow() === 0) {
      Logger.log('Creating headers...');
      sheet.appendRow([
        'Thời Gian',
        'Họ Tên',
        'Số Điện Thoại',
        'Địa Chỉ',
        'Số Lượng',
        'Tổng Tiền',
        'Trạng Thái'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#C8102E');
      headerRange.setFontColor('#FFFFFF');
      Logger.log('Headers created and formatted');
    }
    
    // Format timestamp
    const timestamp = new Date(data.timestamp);
    const formattedTime = Utilities.formatDate(
      timestamp, 
      Session.getScriptTimeZone(), 
      'dd/MM/yyyy HH:mm:ss'
    );
    Logger.log('Formatted timestamp: ' + formattedTime);
    
    // Format currency
    const formattedTotal = formatCurrency(data.total);
    Logger.log('Formatted total: ' + formattedTotal);
    
    // Prepare row data
    const rowData = [
      formattedTime,
      data.name,
      data.phone,
      data.address,
      data.quantity,
      formattedTotal,
      data.status || 'Mới'
    ];
    Logger.log('Row data to append: ' + JSON.stringify(rowData));
    
    // Append the new order
    sheet.appendRow(rowData);
    Logger.log('Row appended successfully');
    
    // Get the last row that was just added
    const lastRow = sheet.getLastRow();
    Logger.log('Last row number: ' + lastRow);
    
    // Format the new row
    const rowRange = sheet.getRange(lastRow, 1, 1, 7);
    rowRange.setFontFamily('Times New Roman');
    
    // Set alternating row colors
    if (lastRow % 2 === 0) {
      rowRange.setBackground('#FFF8DC');
    }
    Logger.log('Row formatted');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 7);
    Logger.log('Columns auto-resized');
    
    Logger.log('=== Sheet save completed successfully ===');
    
    // Send notification email
    try {
      sendNotificationEmail(data);
      Logger.log('Email notification sent');
    } catch (emailError) {
      Logger.log('Email error (non-critical): ' + emailError.toString());
      // Continue even if email fails
    }
    
    return { success: true };
    
  } catch (error) {
    Logger.log('!!! ERROR in saveOrderToSheet: ' + error.toString());
    Logger.log('Error stack: ' + error.stack);
    return { success: false, error: error.toString() };
  }
}

/**
 * Format number to Vietnamese currency
 * @param {number} amount - Amount in VND
 * @returns {string} - Formatted currency
 */
function formatCurrency(amount) {
  return amount.toLocaleString('vi-VN') + 'đ';
}

/**
 * Create JSON response
 * @param {boolean} success - Success status
 * @param {string} message - Response message
 * @returns {Object} - JSON response
 */
function createResponse(success, message) {
  const response = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Send email notification when new order is received
 * @param {Object} data - Order data
 */
function sendNotificationEmail(data) {
  const recipient = 'n21091999@gmail.com';
  const subject = '🏮 Đơn Hàng Mới - Rượu Truyền Thống';
  
  const body = `
    Có đơn hàng mới!
    
    📋 Thông Tin Khách Hàng:
    - Họ tên: ${data.name}
    - SĐT: ${data.phone}
    - Địa chỉ: ${data.address}
    
    📦 Thông Tin Đơn Hàng:
    - Số lượng: ${data.quantity} chai
    - Tổng tiền: ${formatCurrency(data.total)}
    
    ⏰ Thời gian đặt: ${new Date(data.timestamp).toLocaleString('vi-VN')}
    
    ---
    Vui lòng liên hệ khách hàng để xác nhận đơn hàng.
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}

