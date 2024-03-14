CREATE DATABASE LinkBridge;
USE LinkBridge;

CREATE TYPE rol AS ENUM('Administrador', 'Colaborador', 'Sin rol');
CREATE TYPE depto AS ENUM('Legal', 'Contable', 'Directivo');
CREATE TYPE project_stat AS ENUM('In quoation','Accepted', 'Not started', 'In process', 'Under revision', 'Delayed', 'Postponed', 'Done', 'Cancelled', '-');
CREATE TYPE task_stat AS ENUM('Not started', 'In process', 'Under revision', 'Delayed', 'Postponed', 'Done', 'Cancelled');
CREATE TYPE expense_stat AS ENUM('Pending', 'Payed', 'Rejected');
CREATE TYPE ctg AS ENUM('Client', 'Zeitgeist  internal', 'Academic connection', 'Government', 'Supplier', 'Event', 'Fairs/Conferences', '-');
CREATE TYPE prd AS ENUM('1 day', '1 week', '2 weeks', '1 month', '2 months', '4 months', '6 months', '12 months', 'When needed');
CREATE TYPE file_format AS ENUM('.zip');
CREATE TYPE company_type_enum AS ENUM('I NEED SUPPORT IN THIS OPTION', 'SOCIEDAD DE RESPONSABILIDAD LIMITADA DE CAPITAL VARIABLE (S. DE R.L. DE C.V.)', 'SOCIEDAD ANÓNIMA DE CAPITAL VARIABLE (S.A. DE C.V.)', 'SOCIEDAD POR ACCIONES SIMPLIFICADA DE CAPITAL VARIABLE (S.A.S. DE C.V.)');
CREATE TYPE management_form_enum AS ENUM('GENERAL MANAGER ', 'BOARD OF DIRECTORS');
CREATE TYPE power_attorney_enum AS ENUM('POWER OF ATTORNEY FOR LAWSUITS AND COLLECTIONS', 'POWER OF ATTORNEY FOR ACTS OF ADMINISTRATION TO BE EXERCISED WITH PUBLIC AUTHORITIES', 'POWER OF ATTORNEY FOR ACTS OF ADMINISTRATION TO BE EXERCISED WITH PARTICULARS', 'POWER TO SUBSCRIBE AND GRANT NEGOTIABLE INSTRUMENTS AND OPEN BANK ACCOUNTS', 'GENERAL POWER OF ATTORNEY FOR LAWSUITS AND COLLECTIONS AND ACTS OF ADMINISTRATION IN LABOR MATTERS IN THE NATURE OF EMPLOYERS REPRESENTATIVE', 'POWER OF ATTORNEY FOR ACTS OF OWNERSHIP', 'FACULTY TO GRANT ALL OF HIS POWERS OF ATTORNEY', 'Other');
CREATE TYPE grant_power_enum AS ENUM('YES', 'NO');

CREATE TABLE Employee (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    first_name VARCHAR(70) NOT NULL,
    last_name VARCHAR(70) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    phone_number VARCHAR(15) UNIQUE,
    image_url VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_deparment uuid,
    id_role uuid NOT NULL
);

CREATE TABLE Role (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    title rol NOT NULL DEFAULT 'Sin rol',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
);

CREATE TABLE Department (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    title depto NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
);

CREATE TABLE Company (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(180) UNIQUE,
    phone_number VARCHAR(15),
    landline_phone VARCHAR(15),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_company_direct_contact uuid,
    id_form uuid
);

CREATE TABLE Company_direct_contact (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    first_name VARCHAR(70) NOT NULL,
    last_name VARCHAR(70) NOT NULL,
    email VARCHAR(180) NOT NULL UNIQUE,
    phone_number VARCHAR(15),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
);

CREATE TABLE Project (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    name VARCHAR(70) NOT NULL,
    matter VARCHAR(70),
    description VARCHAR(255),
    status project_stat NOT NULL DEFAULT 'Not Started',
    category ctg NOT NULL DEFAULT '-',
    start_date DATE NOT NULL,
    end_date DATE,
    total_hours NUMERIC(8,2),
    periodicity prd DEFAULT NULL,
    is_chargeable BOOLEAN DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_company uuid NOT NULL
);

CREATE TABLE Task (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    title VARCHAR(70) NOT NULL,
    description VARCHAR(256) NOT NULL,
    status task_stat NOT NULL,
    waiting_for VARCHAR(70),
    start_date DATE NOT NULL,
    end_date DATE,
    worked_hours NUMERIC(8,2),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_project uuid NOT NULL
);

CREATE TABLE Employee_task (
    id uuid NOT NULL UNIQUE PRIMARY KEY,    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_employee uuid NOT NULL,
    id_task uuid NOT NULL
);

CREATE TABLE Comment (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
    id_employee uuid NOT NULL
);

CREATE TABLE Expense_report(
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    status expense_stat, 
    total_amount NUMERIC(8, 2),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_employee uuid NOT NULL
);

CREATE TABLE Expense (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    title VARCHAR(70) NOT NULL,
    justification VARCHAR(255) NOT NULL,
    total_amount NUMERIC(18,2) NOT NULL,
    status expense_stat,
    category VARCHAR(70),
    date DATE NOT NULL, 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_report uuid NOT NULL,
    id_file uuid
);

CREATE TABLE File (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    description VARCHAR(256),
    format file_format NOT NULL DEFAULT '.zip',
    url VARCHAR(256) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
);

CREATE TABLE Employee_notification (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_employee uuid NOT NULL,
    id_notification uuid NOT NULL
);

CREATE TABLE Employee_task (
    id NOT NULL UNIQUE PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    id_employee uuid NOT NULL,
    id_task uuid NOT NULL
);

CREATE TABLE Notification (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    title VARCHAR(70) NOT NULL,
    body VARCHAR(256) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
);

CREATE TABLE Form (
    id uuid NOT NULL UNIQUE PRIMARY KEY,
    title VARCHAR(70) NOT NULL,
    email VARCHAR(180) UNIQUE,
    client_name VARCHAR(70),
    applicant_name VARCHAR(70),
    phone_num VARCHAR(15) UNIQUE,
    landline_num VARCHAR(15) UNIQUE,
    address VARCHAR(256) UNIQUE,
    passport VARCHAR(70) UNIQUE,
    company_names VARCHAR(256),
    company_type company_type_enum,
    corporate_purpose VARCHAR(70),
    mexican_address VARCHAR(256) UNIQUE,
    fixed_capital_stock NUMERIC(18,2),
    variable_capital_stock NUMERIC(18,2),
    values_per_share NUMERIC(18,2),
    num_shares_per_shareholder VARCHAR(256),
    partner_capital_stock VARCHAR(256),
    management_form management_form_enum,
    general_manager_name VARCHAR(70),
    power_attorney_general_manager power_attorney_enum,
    special_clause_general_manager VARCHAR(256),
    chairman_name VARCHAR(70),
    power_attorney_chairman power_attorney_enum,
    special_clause_chairman VARCHAR(256),
    secretary_board_name VARCHAR(70),
    power_attorney_secretary_board power_attorney_enum,
    special_clause_secretary_board VARCHAR(256),
    names_board_members VARCHAR(256),
    supervisory_board_names VARCHAR(256),
    power_attorney_zeitgeist_team power_attorney_enum,
    special_clause_zeitgeist_team VARCHAR(256),
    grant_power_attorney_other grant_power_enum,
    name_attorney_one VARCHAR(70),
    power_attorney_one power_attorney_enum,
    special_clause_attorney_one VARCHAR(256),
    name_attorney_two VARCHAR(70),
    power_attorney_two power_attorney_enum,
    special_clause_attorney_two VARCHAR(256),
    name_attorney_three VARCHAR(70),
    power_attorney_three power_attorney_enum,
    special_clause_attorney_three VARCHAR(256),
    name_attorney_four VARCHAR(70),
    power_attorney_four power_attorney_enum,
    special_clause_attorney_four VARCHAR(256),
    name_attorney_five VARCHAR(70),
    power_attorney_five power_attorney_enum,
    special_clause_attorney_five VARCHAR(256),
    questionnaire_questions VARCHAR(256),
    additional_questions VARCHAR(256),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
);

ALTER TABLE Employee
ADD FOREIGN KEY(id_role) REFERENCES Role(id),
ADD FOREIGN KEY(id_department) REFERENCES Department(id);

ALTER TABLE Company
ADD FOREIGN KEY(id_company_direct_contact) REFERENCES Company_direct_contact(id),
ADD FOREIGN KEY(id_form) REFERENCES Form(id);

ALTER TABLE Project
ADD FOREIGN KEY(id_company) REFERENCES Company(id);

ALTER TABLE Task
ADD FOREIGN KEY(id_project) REFERENCES Project(id);

ALTER TABLE Comment
ADD FOREIGN KEY(id_employee) REFERENCES Employee(id);

ALTER TABLE Expense
ADD FOREIGN KEY(id_report) REFERENCES Report(id),
ADD FOREIGN KEY(id_file) REFERENCES File(id);

ALTER TABLE Expense_report
ADD FOREIGN KEY(id_employee) REFERENCES Employee(id);

ALTER TABLE Employee_notification
ADD FOREIGN KEY(id_employee) REFERENCES Employee(id),
ADD FOREIGN KEY(id_notification) REFERENCES Notification(id);

ALTER TABLE Employee_task
ADD FOREIGN KEY(id_employee) REFERENCES Employee(id),
ADD FOREIGN KEY(id_task) REFERENCES Task(id);
