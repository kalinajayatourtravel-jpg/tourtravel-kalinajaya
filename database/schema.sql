-- =====================================================
-- KALINAJAYA TOUR TRAVEL - DATABASE SCHEMA
-- =====================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS tourtravel_kalinajaya;
USE tourtravel_kalinajaya;

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  role ENUM('user', 'admin', 'guide') DEFAULT 'user',
  profile_image VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TOURS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS tours (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  destination VARCHAR(255) NOT NULL,
  duration_days INT NOT NULL,
  duration_nights INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  max_participants INT,
  current_participants INT DEFAULT 0,
  tour_image VARCHAR(255),
  start_date DATE,
  end_date DATE,
  tour_guide_id INT,
  status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
  itinerary TEXT,
  inclusions TEXT,
  exclusions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tour_guide_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_destination (destination)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- BOOKINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  tour_id INT NOT NULL,
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  number_of_participants INT NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (tour_id) REFERENCES tours(id),
  INDEX idx_user_id (user_id),
  INDEX idx_tour_id (tour_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PAYMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('credit_card', 'bank_transfer', 'e_wallet') NOT NULL,
  transaction_id VARCHAR(255) UNIQUE,
  payment_date DATETIME,
  status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id),
  INDEX idx_booking_id (booking_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  tour_id INT NOT NULL,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (tour_id) REFERENCES tours(id),
  INDEX idx_tour_id (tour_id),
  INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- SAMPLE DATA
-- =====================================================

-- Insert sample users
INSERT INTO users (name, email, password, phone, city, role) VALUES
('Admin User', 'admin@kalinajaya.com', 'hashed_password_here', '+62-123-456-789', 'Jakarta', 'admin'),
('John Doe', 'john@example.com', 'hashed_password_here', '+62-987-654-321', 'Surabaya', 'user'),
('Jane Smith', 'jane@example.com', 'hashed_password_here', '+62-555-444-333', 'Bandung', 'user');

-- Insert sample tours
INSERT INTO tours (title, description, destination, duration_days, duration_nights, price, max_participants, tour_image, status) VALUES
('Bali Beach Paradise', 'Explore the beautiful beaches of Bali', 'Bali', 5, 4, 450.00, 20, '/images/bali.jpg', 'scheduled'),
('Jakarta City Experience', 'Discover the bustling capital of Indonesia', 'Jakarta', 3, 2, 300.00, 15, '/images/jakarta.jpg', 'scheduled'),
('Yogyakarta Culture Tour', 'Experience the rich culture of Yogyakarta', 'Yogyakarta', 4, 3, 380.00, 18, '/images/yogyakarta.jpg', 'scheduled');
