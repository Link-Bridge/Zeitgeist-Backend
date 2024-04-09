SELECT
    employee.first_name as employe,
    role.title as role
FROM employee, role
WHERE 
    employee.id_role = role.id
;