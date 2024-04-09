-- INSERT INTO role (id, title)
-- VALUES ('575526fb-5df8-4e7c-b7a8-caac2e501feb', 'Client');

-- SELECT * from role;

-- INSERT INTO employee (id, first_name, last_name, email, id_role)
-- VALUES ('6715b352-287f-4368-904e-9c5fd96fc884', 'Rodrigo', 'Terán', 'rodrigo.teranhernandez@gmail.com', 'a795775e-232a-4de9-b2fb-e63ee2d4efde');

SELECT employee.first_name as employe, role.title as role
FROM employee, role
WHERE 
    employee.id_role = role.id
;