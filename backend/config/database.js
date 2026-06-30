// Database Configuration
// MySQL Connection Setup dengan Connection Pooling

const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool untuk better performance
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tourtravel_kalinajaya',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelayMs: 0,
    multipleStatements: true
});

// Test connection
pool.getConnection()
    .then(conn => {
        console.log('✅ MySQL Database connected successfully');
        conn.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    });

// =====================================================
// HELPER FUNCTIONS
// =====================================================

// Helper function untuk execute query
const executeQuery = async (sql, values = []) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute(sql, values);
        connection.release();
        return results;
    } catch (error) {
        console.error('Query execution error:', error);
        throw error;
    }
};

// Helper function untuk execute query dengan single row result
const getRow = async (sql, values = []) => {
    try {
        const results = await executeQuery(sql, values);
        return results[0] || null;
    } catch (error) {
        throw error;
    }
};

// Helper function untuk get multiple rows
const getRows = async (sql, values = []) => {
    try {
        return await executeQuery(sql, values);
    } catch (error) {
        throw error;
    }
};

// Helper function untuk insert data
const insert = async (table, data) => {
    try {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const placeholders = columns.map(() => '?').join(', ');
        
        const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
        
        const result = await executeQuery(sql, values);
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

// Helper function untuk update data
const update = async (table, data, whereClause, whereValues) => {
    try {
        const columns = Object.keys(data);
        const values = Object.values(data);
        const setClause = columns.map(col => `${col} = ?`).join(', ');
        
        const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        const allValues = [...values, ...whereValues];
        
        const result = await executeQuery(sql, allValues);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

// Helper function untuk delete data
const deleteRow = async (table, whereClause, whereValues) => {
    try {
        const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
        const result = await executeQuery(sql, whereValues);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    pool,
    executeQuery,
    getRow,
    getRows,
    insert,
    update,
    deleteRow
};
